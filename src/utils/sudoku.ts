import { SudokuBoard, CellValue, Difficulty } from '../types/sudoku';

/**
 * 数独生成和验证工具类
 */
export class SudokuGenerator {
  
  /**
   * 生成一个完整的数独解答
   */
  static generateCompleteSudoku(): SudokuBoard {
    const board: SudokuBoard = Array(9).fill(null).map(() => Array(9).fill(0));
    
    // 使用回溯算法填充数独
    this.fillSudoku(board);
    return board;
  }

  /**
   * 使用回溯算法填充数独
   */
  private static fillSudoku(board: SudokuBoard): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // 随机排列数字1-9，增加随机性
          const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          
          for (const num of numbers) {
            if (this.isValidMove(board, row, col, num as CellValue)) {
              board[row][col] = num as CellValue;
              
              if (this.fillSudoku(board)) {
                return true;
              }
              
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * 根据难度生成数独题目（移除部分数字）
   */
  static generatePuzzle(difficulty: Difficulty): { puzzle: SudokuBoard; solution: SudokuBoard } {
    const solution = this.generateCompleteSudoku();
    const puzzle = solution.map(row => [...row]) as SudokuBoard;
    
    // 根据难度确定移除的数字数量
    const cellsToRemove = this.getCellsToRemove(difficulty);
    
    // 随机移除数字
    const positions = this.getAllPositions();
    const shuffledPositions = this.shuffle(positions);
    
    for (let i = 0; i < cellsToRemove && i < shuffledPositions.length; i++) {
      const { row, col } = shuffledPositions[i];
      puzzle[row][col] = 0;
    }
    
    return { puzzle, solution };
  }

  /**
   * 根据难度获取需要移除的数字数量
   */
  private static getCellsToRemove(difficulty: Difficulty): number {
    switch (difficulty) {
      case Difficulty.EASY:
        return 30 + Math.floor(Math.random() * 6); // 30-35
      case Difficulty.MEDIUM:
        return 40 + Math.floor(Math.random() * 6); // 40-45
      case Difficulty.HARD:
        return 50 + Math.floor(Math.random() * 6); // 50-55
      default:
        return 35;
    }
  }

  /**
   * 获取所有棋盘位置
   */
  private static getAllPositions(): Array<{ row: number; col: number }> {
    const positions: Array<{ row: number; col: number }> = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        positions.push({ row, col });
      }
    }
    return positions;
  }

  /**
   * 验证在指定位置放置数字是否有效
   */
  static isValidMove(board: SudokuBoard, row: number, col: number, value: CellValue): boolean {
    if (value === 0) return true; // 空白总是有效的
    
    // 检查行
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) {
        return false;
      }
    }
    
    // 检查列
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) {
        return false;
      }
    }
    
    // 检查3x3宫格
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === value) {
          return false;
        }
      }
    }
    
    return true;
  }

  /**
   * 检查数独是否完全解决
   */
  static isSolved(board: SudokuBoard): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return false;
        }
        if (!this.isValidMove(board, row, col, board[row][col])) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * 获取指定位置的所有可能值
   */
  static getPossibleValues(board: SudokuBoard, row: number, col: number): CellValue[] {
    if (board[row][col] !== 0) return [];
    
    const possible: CellValue[] = [];
    for (let value = 1; value <= 9; value++) {
      if (this.isValidMove(board, row, col, value as CellValue)) {
        possible.push(value as CellValue);
      }
    }
    return possible;
  }

  /**
   * 获取提示（找到一个可以填入的正确答案）
   */
  static getHint(board: SudokuBoard, solution: SudokuBoard): { row: number; col: number; value: CellValue } | null {
    const emptyCells: Array<{ row: number; col: number }> = [];
    
    // 找到所有空白单元格
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }
    
    if (emptyCells.length === 0) return null;
    
    // 随机选择一个空白单元格
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
      row: randomCell.row,
      col: randomCell.col,
      value: solution[randomCell.row][randomCell.col]
    };
  }

  /**
   * 洗牌算法（Fisher-Yates）
   */
  private static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * 深拷贝数独棋盘
   */
  static cloneBoard(board: SudokuBoard): SudokuBoard {
    return board.map(row => [...row]) as SudokuBoard;
  }

  /**
   * 获取与指定单元格相关的所有位置（同行、同列、同宫）
   */
  static getRelatedPositions(row: number, col: number): Array<{ row: number; col: number }> {
    const positions: Array<{ row: number; col: number }> = [];
    
    // 同行
    for (let c = 0; c < 9; c++) {
      if (c !== col) {
        positions.push({ row, col: c });
      }
    }
    
    // 同列
    for (let r = 0; r < 9; r++) {
      if (r !== row) {
        positions.push({ row: r, col });
      }
    }
    
    // 同宫
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (r !== row && c !== col) {
          positions.push({ row: r, col: c });
        }
      }
    }
    
    return positions;
  }

  /**
   * 验证整个数独棋盘的正确性
   */
  static validateBoard(board: SudokuBoard): Array<{ row: number; col: number; type: 'row' | 'column' | 'box' }> {
    const conflicts: Array<{ row: number; col: number; type: 'row' | 'column' | 'box' }> = [];
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = board[row][col];
        if (value !== 0 && !this.isValidMove(board, row, col, value)) {
          // 确定冲突类型
          conflicts.push({ row, col, type: 'row' }); // 简化处理，实际可以更精确
        }
      }
    }
    
    return conflicts;
  }
} 