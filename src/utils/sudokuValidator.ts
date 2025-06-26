import { SudokuBoard, CellValue, ValidationResult } from '../types/sudoku';

/**
 * 数独验证工具类
 */
export class SudokuValidator {
  
  /**
   * 完整验证数独棋盘
   * @param board 当前棋盘状态
   * @returns 验证结果，包含是否有效和所有冲突位置
   */
  static validateBoard(board: SudokuBoard): ValidationResult {
    const conflicts: Array<{ row: number; col: number; type: 'row' | 'column' | 'box' }> = [];
    
    // 检查每个单元格
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = board[row][col];
        if (value !== 0) {
          const cellConflicts = this.validateCell(board, row, col, value);
          conflicts.push(...cellConflicts);
        }
      }
    }
    
    // 去重冲突
    const uniqueConflicts = this.removeDuplicateConflicts(conflicts);
    
    return {
      isValid: uniqueConflicts.length === 0,
      conflicts: uniqueConflicts
    };
  }

  /**
   * 验证单个单元格的有效性
   * @param board 棋盘状态
   * @param row 行索引
   * @param col 列索引
   * @param value 要验证的值
   * @returns 该单元格的所有冲突
   */
  static validateCell(
    board: SudokuBoard, 
    row: number, 
    col: number, 
    value: CellValue
  ): Array<{ row: number; col: number; type: 'row' | 'column' | 'box' }> {
    const conflicts: Array<{ row: number; col: number; type: 'row' | 'column' | 'box' }> = [];
    
    if (value === 0) return conflicts; // 空白单元格不需要验证
    
    // 检查行冲突
    const rowConflicts = this.checkRowConflicts(board, row, col, value);
    conflicts.push(...rowConflicts);
    
    // 检查列冲突
    const colConflicts = this.checkColumnConflicts(board, row, col, value);
    conflicts.push(...colConflicts);
    
    // 检查宫格冲突
    const boxConflicts = this.checkBoxConflicts(board, row, col, value);
    conflicts.push(...boxConflicts);
    
    return conflicts;
  }

  /**
   * 检查行冲突
   */
  private static checkRowConflicts(
    board: SudokuBoard, 
    row: number, 
    col: number, 
    value: CellValue
  ): Array<{ row: number; col: number; type: 'row' }> {
    const conflicts: Array<{ row: number; col: number; type: 'row' }> = [];
    
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) {
        conflicts.push({ row, col, type: 'row' });
        conflicts.push({ row, col: c, type: 'row' });
      }
    }
    
    return conflicts;
  }

  /**
   * 检查列冲突
   */
  private static checkColumnConflicts(
    board: SudokuBoard, 
    row: number, 
    col: number, 
    value: CellValue
  ): Array<{ row: number; col: number; type: 'column' }> {
    const conflicts: Array<{ row: number; col: number; type: 'column' }> = [];
    
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) {
        conflicts.push({ row, col, type: 'column' });
        conflicts.push({ row: r, col, type: 'column' });
      }
    }
    
    return conflicts;
  }

  /**
   * 检查3x3宫格冲突
   */
  private static checkBoxConflicts(
    board: SudokuBoard, 
    row: number, 
    col: number, 
    value: CellValue
  ): Array<{ row: number; col: number; type: 'box' }> {
    const conflicts: Array<{ row: number; col: number; type: 'box' }> = [];
    
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === value) {
          conflicts.push({ row, col, type: 'box' });
          conflicts.push({ row: r, col: c, type: 'box' });
        }
      }
    }
    
    return conflicts;
  }

  /**
   * 去除重复的冲突
   */
  private static removeDuplicateConflicts(
    conflicts: Array<{ row: number; col: number; type: 'row' | 'column' | 'box' }>
  ): Array<{ row: number; col: number; type: 'row' | 'column' | 'box' }> {
    const seen = new Set<string>();
    return conflicts.filter(conflict => {
      const key = `${conflict.row}-${conflict.col}-${conflict.type}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * 检查数独是否完全解决（无冲突且无空白）
   * @param board 棋盘状态
   * @returns 是否完全解决
   */
  static isSolved(board: SudokuBoard): boolean {
    // 检查是否有空白单元格
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return false;
        }
      }
    }
    
    // 检查是否有冲突
    const validation = this.validateBoard(board);
    return validation.isValid;
  }

  /**
   * 检查是否可以在指定位置放置数字
   * @param board 棋盘状态
   * @param row 行索引
   * @param col 列索引
   * @param value 要放置的值
   * @returns 是否可以放置
   */
  static canPlaceValue(board: SudokuBoard, row: number, col: number, value: CellValue): boolean {
    if (value === 0) return true; // 可以清空任何单元格
    
    // 修复副作用问题：创建副本而不是直接修改原棋盘
    const tempBoard = board.map(boardRow => [...boardRow]) as SudokuBoard;
    tempBoard[row][col] = value;
    
    // 检验是否有冲突
    const conflicts = this.validateCell(tempBoard, row, col, value);
    
    return conflicts.length === 0;
  }

  /**
   * 获取棋盘完成度百分比
   * @param board 棋盘状态
   * @returns 完成度百分比 (0-100)
   */
  static getCompletionPercentage(board: SudokuBoard): number {
    let filledCells = 0;
    const totalCells = 81;
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== 0) {
          filledCells++;
        }
      }
    }
    
    return Math.round((filledCells / totalCells) * 100);
  }

  /**
   * 统计每个数字在棋盘上的出现次数
   * @param board 棋盘状态
   * @returns 每个数字的计数
   */
  static getNumberCounts(board: SudokuBoard): { [key: number]: number } {
    const counts: { [key: number]: number } = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    };
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = board[row][col];
        if (value >= 1 && value <= 9) {
          counts[value]++;
        }
      }
    }
    
    return counts;
  }

  /**
   * 检查数独是否有唯一解
   * @param board 数独题目
   * @returns 是否有唯一解
   */
  static hasUniqueSolution(board: SudokuBoard): boolean {
    const clonedBoard = board.map(row => [...row]) as SudokuBoard;
    const solutions: SudokuBoard[] = [];
    
    this.solveSudoku(clonedBoard, solutions, 2); // 最多找2个解
    
    return solutions.length === 1;
  }

  /**
   * 递归求解数独（用于检查解的唯一性）
   */
  private static solveSudoku(
    board: SudokuBoard, 
    solutions: SudokuBoard[], 
    maxSolutions: number
  ): void {
    if (solutions.length >= maxSolutions) return;
    
    // 找到第一个空白单元格
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // 尝试所有可能的数字
          for (let value = 1; value <= 9; value++) {
            if (this.canPlaceValue(board, row, col, value as CellValue)) {
              board[row][col] = value as CellValue;
              this.solveSudoku(board, solutions, maxSolutions);
              board[row][col] = 0; // 回溯
            }
          }
          return; // 找到空白单元格后就返回
        }
      }
    }
    
    // 如果没有空白单元格，说明找到了一个解
    solutions.push(board.map(row => [...row]) as SudokuBoard);
  }

  /**
   * 获取所有空白单元格的位置
   * @param board 棋盘状态
   * @returns 空白单元格位置数组
   */
  static getEmptyCells(board: SudokuBoard): Array<{ row: number; col: number }> {
    const emptyCells: Array<{ row: number; col: number }> = [];
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }
    
    return emptyCells;
  }
} 