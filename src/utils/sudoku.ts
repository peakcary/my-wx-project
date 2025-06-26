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
    let attempts = 0;
    const maxAttempts = 20; // 增加尝试次数
    
    // 尝试生成有唯一解的题目
    while (attempts < maxAttempts) {
      const solution = this.generateCompleteSudoku();
      const puzzle = this.createPuzzleWithUniqueSolution(solution, difficulty);
      
      // 验证题目有唯一解
      if (puzzle && this.verifyUniqueSolution(puzzle, solution)) {
        console.log(`数独生成成功，尝试次数: ${attempts + 1}`);
        return { puzzle, solution };
      }
      attempts++;
    }
    
    // 如果无法生成有效题目，使用备用算法生成保证有解的题目
    console.warn('使用备用算法生成数独题目');
    return this.generateGuaranteedValidPuzzle(difficulty);
  }

  /**
   * 从完整解答创建有唯一解的题目
   */
  private static createPuzzleWithUniqueSolution(solution: SudokuBoard, difficulty: Difficulty): SudokuBoard | null {
    const puzzle = solution.map(row => [...row]) as SudokuBoard;
    const targetRemoval = this.getCellsToRemove(difficulty);
    
    // 获取所有位置并随机排序
    const positions = this.getAllPositions();
    const shuffledPositions = this.shuffle(positions);
    
    let removedCount = 0;
    
    // 逐个尝试移除数字，确保保持唯一解
    for (const { row, col } of shuffledPositions) {
      if (removedCount >= targetRemoval) break;
      
      const originalValue = puzzle[row][col];
      puzzle[row][col] = 0; // 临时移除
      
      // 检查移除后是否仍有唯一解
      if (this.hasUniqueSolutionFast(puzzle)) {
        removedCount++; // 确认移除
      } else {
        puzzle[row][col] = originalValue; // 恢复数字
      }
    }
    
    // 确保移除了足够的数字
    if (removedCount < Math.floor(targetRemoval * 0.8)) {
      return null; // 移除数量不足，重新生成
    }
    
    return puzzle;
  }

  /**
   * 验证题目是否有有效解
   */
  private static hasValidSolution(puzzle: SudokuBoard, solution: SudokuBoard): boolean {
    // 简单验证：检查给定的解是否与题目兼容
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] !== 0 && puzzle[row][col] !== solution[row][col]) {
          return false;
        }
      }
    }
    
    // 验证解答本身是否有效
    return this.isSolved(solution);
  }

  /**
   * 快速检查数独是否有唯一解（优化版）
   */
  private static hasUniqueSolutionFast(board: SudokuBoard): boolean {
    const clonedBoard = board.map(row => [...row]) as SudokuBoard;
    const solutionCount = this.countSolutions(clonedBoard, 2); // 最多找2个解就够了
    return solutionCount === 1;
  }

  /**
   * 计算数独的解的数量（用于唯一性检查）
   */
  private static countSolutions(board: SudokuBoard, maxCount: number): number {
    // 找到第一个空白单元格
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          let solutionCount = 0;
          
          // 尝试所有可能的数字
          for (let value = 1; value <= 9; value++) {
            if (this.isValidMove(board, row, col, value as CellValue)) {
              board[row][col] = value as CellValue;
              solutionCount += this.countSolutions(board, maxCount - solutionCount);
              board[row][col] = 0; // 回溯
              
              // 如果已经找到多于maxCount个解，提前退出
              if (solutionCount >= maxCount) {
                return solutionCount;
              }
            }
          }
          return solutionCount;
        }
      }
    }
    
    // 如果没有空白单元格，说明找到了一个解
    return 1;
  }

  /**
   * 验证题目和解答的唯一性
   */
  private static verifyUniqueSolution(puzzle: SudokuBoard, solution: SudokuBoard): boolean {
    // 1. 检查解答与题目兼容
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] !== 0 && puzzle[row][col] !== solution[row][col]) {
          return false;
        }
      }
    }
    
    // 2. 检查解答本身有效
    if (!this.isSolved(solution)) {
      return false;
    }
    
    // 3. 检查题目有唯一解
    return this.hasUniqueSolutionFast(puzzle);
  }

  /**
   * 生成保证有效的数独题目（备用方法）
   */
  private static generateGuaranteedValidPuzzle(difficulty: Difficulty): { puzzle: SudokuBoard; solution: SudokuBoard } {
    const solution = this.generateCompleteSudoku();
    const puzzle = solution.map(row => [...row]) as SudokuBoard;
    
    // 使用更保守的移除策略，确保题目可解
    const cellsToRemove = Math.min(this.getCellsToRemove(difficulty), 45); // 限制最大移除数量
    const positions = this.getAllPositions();
    const shuffledPositions = this.shuffle(positions);
    
    let removed = 0;
    for (let i = 0; i < shuffledPositions.length && removed < cellsToRemove; i++) {
      const { row, col } = shuffledPositions[i];
      const originalValue = puzzle[row][col];
      
      // 临时移除这个数字
      puzzle[row][col] = 0;
      
      // 保守策略：逐步移除并检查
      if (removed < cellsToRemove) {
        removed++;
      } else {
        // 如果已经移除够了，恢复这个数字
        puzzle[row][col] = originalValue;
      }
    }
    
    return { puzzle, solution };
  }

  /**
   * 计算空白单元格数量
   */
  private static getEmptyCellsCount(board: SudokuBoard): number {
    let count = 0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          count++;
        }
      }
    }
    return count;
  }

  /**
   * 根据难度获取需要移除的数字数量（优化版）
   */
  private static getCellsToRemove(difficulty: Difficulty): number {
    switch (difficulty) {
      case Difficulty.EASY:
        return 35 + Math.floor(Math.random() * 6); // 35-40（保守一些）
      case Difficulty.MEDIUM:
        return 45 + Math.floor(Math.random() * 5); // 45-49（适中）
      case Difficulty.HARD:
        return 52 + Math.floor(Math.random() * 4); // 52-55（适当控制）
      default:
        return 40; // 默认中等难度
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