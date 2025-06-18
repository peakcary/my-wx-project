// 数独游戏相关类型定义

// 数独单元格的值类型 (1-9 或 0表示空白)
export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// 数独棋盘类型 (9x9的二维数组)
export type SudokuBoard = CellValue[][];

// 游戏难度等级
export enum Difficulty {
  EASY = 'easy',      // 简单 (移除30-35个数字)
  MEDIUM = 'medium',  // 中等 (移除40-45个数字)
  HARD = 'hard'       // 困难 (移除50-55个数字)
}

// 单元格状态
export interface CellState {
  value: CellValue;           // 当前值
  isOriginal: boolean;        // 是否为原始题目数字（不可修改）
  isSelected: boolean;        // 是否被选中
  isHighlighted: boolean;     // 是否高亮显示（同行列宫相关数字）
  hasError: boolean;          // 是否有错误
  candidates: number[];       // 候选数字（草稿功能）
}

// 游戏状态
export interface GameState {
  board: CellState[][];       // 棋盘状态
  solution: SudokuBoard;      // 完整解答
  originalBoard: SudokuBoard; // 原始题目
  selectedCell: {             // 当前选中的单元格
    row: number;
    col: number;
  } | null;
  difficulty: Difficulty;     // 当前难度
  startTime: number;          // 开始时间戳
  elapsedTime: number;        // 已用时间（秒）
  isCompleted: boolean;       // 是否完成
  isPaused: boolean;          // 是否暂停
  mistakes: number;           // 错误次数
  hintsUsed: number;          // 使用提示次数
}

// 游戏操作类型
export enum GameAction {
  SET_CELL_VALUE = 'SET_CELL_VALUE',
  SELECT_CELL = 'SELECT_CELL',
  CLEAR_CELL = 'CLEAR_CELL',
  SET_CANDIDATE = 'SET_CANDIDATE',
  NEW_GAME = 'NEW_GAME',
  PAUSE_GAME = 'PAUSE_GAME',
  RESUME_GAME = 'RESUME_GAME',
  USE_HINT = 'USE_HINT',
  CHECK_SOLUTION = 'CHECK_SOLUTION',
  UPDATE_TIME = 'UPDATE_TIME'
}

// 游戏操作载荷
export interface GameActionPayload {
  [GameAction.SET_CELL_VALUE]: {
    row: number;
    col: number;
    value: CellValue;
  };
  [GameAction.SELECT_CELL]: {
    row: number;
    col: number;
  };
  [GameAction.CLEAR_CELL]: {
    row: number;
    col: number;
  };
  [GameAction.SET_CANDIDATE]: {
    row: number;
    col: number;
    candidate: number;
  };
  [GameAction.NEW_GAME]: {
    difficulty: Difficulty;
  };
  [GameAction.PAUSE_GAME]: {};
  [GameAction.RESUME_GAME]: {};
  [GameAction.USE_HINT]: {};
  [GameAction.CHECK_SOLUTION]: {};
  [GameAction.UPDATE_TIME]: {
    elapsedTime: number;
  };
}

// 数独验证结果
export interface ValidationResult {
  isValid: boolean;
  conflicts: Array<{
    row: number;
    col: number;
    type: 'row' | 'column' | 'box';
  }>;
}

// 游戏统计数据
export interface GameStats {
  gamesCompleted: number;
  totalPlayTime: number;     // 总游戏时间（秒）
  bestTimes: {
    [Difficulty.EASY]: number | null;
    [Difficulty.MEDIUM]: number | null;
    [Difficulty.HARD]: number | null;
  };
  averageTimes: {
    [Difficulty.EASY]: number | null;
    [Difficulty.MEDIUM]: number | null;
    [Difficulty.HARD]: number | null;
  };
  winStreak: number;         // 连胜次数
  totalHintsUsed: number;    // 总使用提示次数
}

// 本地存储数据结构
export interface StorageData {
  currentGame: GameState | null;
  gameStats: GameStats;
  settings: {
    soundEnabled: boolean;
    highlightEnabled: boolean;
    autoCheckEnabled: boolean;
  };
} 