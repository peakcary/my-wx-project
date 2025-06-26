import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  GameState, 
  CellState, 
  Difficulty, 
  CellValue,
  SudokuBoard 
} from '../types/sudoku';
import { SudokuGenerator } from '../utils/sudoku';
import { SudokuValidator } from '../utils/sudokuValidator';

/**
 * 数独游戏状态管理Hook
 */
export function useSudokuGame() {
  // 游戏状态
  const [gameState, setGameState] = useState<GameState | null>(null);
  
  // 计时器引用
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // 初始化游戏状态
  const initializeGameState = useCallback((difficulty: Difficulty): GameState => {
    const { puzzle, solution } = SudokuGenerator.generatePuzzle(difficulty);
    
    // 创建单元格状态
    const board: CellState[][] = puzzle.map((row, rowIndex) =>
      row.map((value, colIndex) => ({
        value,
        isOriginal: value !== 0,
        isSelected: false,
        isHighlighted: false,
        hasError: false,
        candidates: []
      }))
    );
    
    return {
      board,
      solution,
      originalBoard: puzzle,
      selectedCell: null,
      difficulty,
      startTime: Date.now(),
      elapsedTime: 0,
      isCompleted: false,
      isPaused: false,
      mistakes: 0,
      hintsUsed: 0
    };
  }, []);

  // 开始新游戏
  const startNewGame = useCallback((difficulty: Difficulty) => {
    const newGameState = initializeGameState(difficulty);
    setGameState(newGameState);
    
    // 清除之前的计时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // 开始新的计时器
    timerRef.current = setInterval(() => {
      setGameState(prevState => {
        if (!prevState || prevState.isPaused || prevState.isCompleted) {
          return prevState;
        }
        
        return {
          ...prevState,
          elapsedTime: Math.floor((Date.now() - prevState.startTime) / 1000)
        };
      });
    }, 1000);
  }, [initializeGameState]);

  // 选择单元格
  const selectCell = useCallback((row: number, col: number) => {
    setGameState(prevState => {
      if (!prevState || prevState.isCompleted) return prevState;
      
      const newBoard = prevState.board.map((boardRow, r) =>
        boardRow.map((cell, c) => ({
          ...cell,
          isSelected: r === row && c === col,
          isHighlighted: r === row || c === col || 
            (Math.floor(r / 3) === Math.floor(row / 3) && Math.floor(c / 3) === Math.floor(col / 3))
        }))
      );
      
      return {
        ...prevState,
        board: newBoard,
        selectedCell: { row, col }
      };
    });
  }, []);

  // 设置单元格值
  const setCellValue = useCallback((row: number, col: number, value: CellValue) => {
    setGameState(prevState => {
      if (!prevState || prevState.isCompleted) return prevState;
      
      const cell = prevState.board[row][col];
      if (cell.isOriginal) return prevState; // 不能修改原始数字
      
      const newBoard = prevState.board.map((boardRow, r) =>
        boardRow.map((cell, c) => {
          if (r === row && c === col) {
            const newCell = { ...cell, value };
            
            // 检查是否有错误：只检查数独规则冲突
            if (value !== 0) {
              // 创建临时棋盘用于验证当前位置
              const tempBoard: SudokuBoard = prevState.board.map(boardRow => boardRow.map(cell => cell.value));
              tempBoard[r][c] = value;
              const hasRuleError = !SudokuGenerator.isValidMove(tempBoard, r, c, value);
              newCell.hasError = hasRuleError;
            } else {
              newCell.hasError = false;
            }
            
            return newCell;
          }
          
          // 检查其他单元格是否因为新放置的数字而产生冲突
          if (value !== 0 && cell.value !== 0) {
            const isRelated = r === row || c === col || 
              (Math.floor(r / 3) === Math.floor(row / 3) && Math.floor(c / 3) === Math.floor(col / 3));
            
            if (isRelated && cell.value === value) {
              return { ...cell, hasError: true };
            }
          }
          
          // 清除之前的错误高亮（如果这次放置没有冲突）
          if (cell.hasError && cell.value !== 0) {
            const cellCheckBoard: SudokuBoard = prevState.board.map(boardRow => boardRow.map(cellItem => cellItem.value));
            cellCheckBoard[r][c] = cell.value;
            const stillHasError = !SudokuGenerator.isValidMove(cellCheckBoard, r, c, cell.value);
            return { ...cell, hasError: stillHasError };
          }
          
          return cell;
        })
      );
      
      // 检查是否完成游戏
      const currentBoard: SudokuBoard = newBoard.map(row => row.map(cell => cell.value));
      const isCompleted = SudokuValidator.isSolved(currentBoard);
      
      // 修复错误检测逻辑：先检查数独规则，再检查是否为最终答案
      let newMistakes = prevState.mistakes;
      if (value !== 0) {
        // 创建新的临时棋盘来检查错误
        const checkBoard: SudokuBoard = newBoard.map(boardRow => boardRow.map(cell => cell.value));
        const hasRuleError = !SudokuGenerator.isValidMove(checkBoard, row, col, value);
        
        // 只有违反数独规则才算真正的错误，不是最终答案但符合规则不算错误
        if (hasRuleError) {
          newMistakes += 1;
        }
      }
      
      const newState = {
        ...prevState,
        board: newBoard,
        isCompleted,
        mistakes: newMistakes
      };
      
      // 如果游戏完成，停止计时器
      if (isCompleted && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      return newState;
    });
  }, []);

  // 清除单元格
  const clearCell = useCallback((row: number, col: number) => {
    setCellValue(row, col, 0);
  }, [setCellValue]);

  // 清空整个棋盘（保留题目原始数字）
  const clearBoard = useCallback(() => {
    setGameState(prevState => {
      if (!prevState || prevState.isCompleted) return prevState;
      
      const newBoard = prevState.board.map(boardRow =>
        boardRow.map(cell => {
          if (cell.isOriginal) {
            // 保留原始数字，但清除错误状态
            return { ...cell, hasError: false };
          } else {
            // 清空用户填入的数字
            return { 
              ...cell, 
              value: 0 as CellValue, 
              hasError: false,
              candidates: []
            };
          }
        })
      );
      
      return {
        ...prevState,
        board: newBoard,
        selectedCell: null, // 清除选中状态
        mistakes: 0 // 重置错误次数
      };
    });
  }, []);

  // 获取提示
  const useHint = useCallback(() => {
    setGameState(prevState => {
      if (!prevState || prevState.isCompleted) return prevState;
      
      const currentBoard: SudokuBoard = prevState.board.map(row => row.map(cell => cell.value));
      const hint = SudokuGenerator.getHint(currentBoard, prevState.solution);
      
      if (!hint) return prevState;
      
      const newBoard = prevState.board.map((boardRow, r) =>
        boardRow.map((cell, c) => {
          if (r === hint.row && c === hint.col) {
            return {
              ...cell,
              value: hint.value,
              hasError: false
            };
          }
          return cell;
        })
      );
      
      return {
        ...prevState,
        board: newBoard,
        hintsUsed: prevState.hintsUsed + 1
      };
    });
  }, []);

  // 暂停游戏
  const pauseGame = useCallback(() => {
    setGameState(prevState => {
      if (!prevState || prevState.isCompleted) return prevState;
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      return {
        ...prevState,
        isPaused: true
      };
    });
  }, []);

  // 恢复游戏
  const resumeGame = useCallback(() => {
    setGameState(prevState => {
      if (!prevState || prevState.isCompleted) return prevState;
      
      // 重新开始计时
      const newStartTime = Date.now() - (prevState.elapsedTime * 1000);
      
      timerRef.current = setInterval(() => {
        setGameState(currentState => {
          if (!currentState || currentState.isPaused || currentState.isCompleted) {
            return currentState;
          }
          
          return {
            ...currentState,
            elapsedTime: Math.floor((Date.now() - newStartTime) / 1000)
          };
        });
      }, 1000);
      
      return {
        ...prevState,
        isPaused: false,
        startTime: newStartTime
      };
    });
  }, []);

  // 检查解答
  const checkSolution = useCallback(() => {
    if (!gameState) return false;
    
    const currentBoard: SudokuBoard = gameState.board.map(row => row.map(cell => cell.value));
    return SudokuValidator.isSolved(currentBoard);
  }, [gameState]);

  // 获取完成度
  const getCompletionPercentage = useCallback(() => {
    if (!gameState) return 0;
    
    const currentBoard: SudokuBoard = gameState.board.map(row => row.map(cell => cell.value));
    return SudokuValidator.getCompletionPercentage(currentBoard);
  }, [gameState]);

  // 设置候选数字
  const setCandidates = useCallback((row: number, col: number, candidates: number[]) => {
    setGameState(prevState => {
      if (!prevState || prevState.isCompleted) return prevState;
      
      const newBoard = prevState.board.map((boardRow, r) =>
        boardRow.map((cell, c) => {
          if (r === row && c === col && !cell.isOriginal) {
            return { ...cell, candidates };
          }
          return cell;
        })
      );
      
      return {
        ...prevState,
        board: newBoard
      };
    });
  }, []);

  // 获取可能的值
  const getPossibleValues = useCallback((row: number, col: number): CellValue[] => {
    if (!gameState) return [];
    
    const currentBoard: SudokuBoard = gameState.board.map(boardRow => boardRow.map(cell => cell.value));
    return SudokuGenerator.getPossibleValues(currentBoard, row, col);
  }, [gameState]);

  // 检查游戏是否陷入死局（增强版）
  const checkIfStuck = useCallback((): boolean => {
    if (!gameState) return false;
    
    const currentBoard: SudokuBoard = gameState.board.map(row => row.map(cell => cell.value));
    
    // 1. 基础检查：是否有空白单元格没有可能值
    let hasEmptyWithNoPossible = false;
    let totalEmptyCells = 0;
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === 0) {
          totalEmptyCells++;
          const possibleValues = SudokuGenerator.getPossibleValues(currentBoard, row, col);
          if (possibleValues.length === 0) {
            hasEmptyWithNoPossible = true;
          } else if (possibleValues.length > 0) {
            // 还有可能的步骤，进行更深入的检查
            return false;
          }
        }
      }
    }
    
    // 2. 如果有空白格但都没有可能值，明确死局
    if (totalEmptyCells > 0 && hasEmptyWithNoPossible) {
      return true;
    }
    
    // 3. 如果没有空白格，检查是否有冲突
    if (totalEmptyCells === 0) {
      const validation = SudokuValidator.validateBoard(currentBoard);
      return !validation.isValid; // 如果有冲突且没有空白格，说明陷入死局
    }
    
    return false; // 没有发现死局迹象
  }, [gameState]);

  // 获取最容易填入的单元格（新增功能）
  const getEasiestCell = useCallback((): { row: number; col: number; possibleValues: CellValue[] } | null => {
    if (!gameState) return null;
    
    const currentBoard: SudokuBoard = gameState.board.map(row => row.map(cell => cell.value));
    let easiestCell: { row: number; col: number; possibleValues: CellValue[] } | null = null;
    let minPossibleValues = 10;
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === 0) {
          const possibleValues = SudokuGenerator.getPossibleValues(currentBoard, row, col);
          if (possibleValues.length > 0 && possibleValues.length < minPossibleValues) {
            easiestCell = { row, col, possibleValues };
            minPossibleValues = possibleValues.length;
          }
        }
      }
    }
    
    return easiestCell;
  }, [gameState]);

  // 清理计时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 格式化时间显示
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    // 状态
    gameState,
    
    // 操作
    startNewGame,
    selectCell,
    setCellValue,
    clearCell,
    clearBoard, // 新增：清空整个棋盘
    useHint,
    pauseGame,
    resumeGame,
    setCandidates,
    
    // 工具函数
    checkSolution,
    getCompletionPercentage,
    getPossibleValues,
    formatTime,
    
    // 新增的调试和帮助功能
    checkIfStuck,
    getEasiestCell
  };
}