// 塔罗牌测算相关类型定义

/**
 * 塔罗牌花色
 */
export enum TarotSuit {
  MAJOR = 'major',      // 大阿卡纳
  WANDS = 'wands',      // 权杖
  CUPS = 'cups',        // 圣杯
  SWORDS = 'swords',    // 宝剑
  PENTACLES = 'pentacles' // 钱币
}

/**
 * 塔罗牌位置（正位/逆位）
 */
export enum TarotPosition {
  UPRIGHT = 'upright',  // 正位
  REVERSED = 'reversed' // 逆位
}

/**
 * 占卜类型
 */
export enum DivinationType {
  LOVE = 'love',           // 恋爱运势
  CAREER = 'career',       // 事业运势
  WEALTH = 'wealth',       // 财运
  HEALTH = 'health',       // 健康
  GENERAL = 'general',     // 综合运势
  DECISION = 'decision'    // 决策指导
}

/**
 * 塔罗牌基本信息
 */
export interface TarotCard {
  id: string;
  name: string;           // 牌名
  englishName: string;    // 英文名
  suit: TarotSuit;        // 花色
  number?: number;        // 牌号（大阿卡纳0-21，小阿卡纳1-14）
  image: string;          // 牌面图片
  keywords: string[];     // 关键词
  element?: string;       // 元素（火土风水）
  planet?: string;        // 对应星体
  zodiac?: string;        // 对应星座
}

/**
 * 塔罗牌含义解释
 */
export interface TarotMeaning {
  upright: {
    general: string;        // 正位-总体含义
    love: string;          // 正位-爱情
    career: string;        // 正位-事业
    wealth: string;        // 正位-财运
    health: string;        // 正位-健康
    advice: string;        // 正位-建议
  };
  reversed: {
    general: string;        // 逆位-总体含义
    love: string;          // 逆位-爱情
    career: string;        // 逆位-事业
    wealth: string;        // 逆位-财运
    health: string;        // 逆位-健康
    advice: string;        // 逆位-建议
  };
}

/**
 * 完整的塔罗牌信息
 */
export interface TarotCardInfo {
  card: TarotCard;
  meaning: TarotMeaning;
  symbolism: string;      // 象征意义
  numerology?: string;    // 数字含义
  story: string;         // 牌面故事
}

/**
 * 抽到的塔罗牌（包含位置）
 */
export interface DrawnTarotCard {
  cardInfo: TarotCardInfo;
  position: TarotPosition;
  positionInSpread: number; // 在牌阵中的位置
}

/**
 * 塔罗牌阵类型
 */
export enum SpreadType {
  SINGLE = 'single',           // 单张牌
  THREE_CARD = 'three_card',   // 三张牌（过去-现在-未来）
  CROSS = 'cross',             // 十字牌阵
  CELTIC = 'celtic'            // 凯尔特十字牌阵
}

/**
 * 塔罗牌阵信息
 */
export interface TarotSpread {
  type: SpreadType;
  name: string;
  description: string;
  positions: {
    index: number;
    name: string;
    meaning: string;
  }[];
}

/**
 * 塔罗占卜结果
 */
export interface TarotReading {
  id: string;
  timestamp: string;
  question?: string;        // 占卜问题
  divinationType: DivinationType;
  spread: TarotSpread;
  drawnCards: DrawnTarotCard[];
  interpretation: {
    overall: string;        // 整体解读
    detailed: string[];     // 详细解读（每张牌）
    advice: string;         // 建议
    timeframe: string;      // 时间框架
    energy: string;         // 能量状态
  };
  luckyNumbers: number[];   // 幸运数字
  luckyColors: string[];    // 幸运颜色
  warnings?: string[];      // 注意事项
}

/**
 * 塔罗占卜状态
 */
export interface TarotState {
  selectedDivination?: DivinationType;
  selectedSpread?: SpreadType;
  question?: string;
  isDrawing: boolean;
  isReading: boolean;
  currentReading?: TarotReading;
  showResult: boolean;
}

/**
 * 塔罗牌牌库统计
 */
export interface TarotDeckStats {
  totalCards: number;
  majorArcana: number;
  minorArcana: number;
  suits: Record<TarotSuit, number>;
}

/**
 * 用户塔罗历史记录
 */
export interface TarotHistory {
  readings: TarotReading[];
  favoriteCards: string[];
  totalReadings: number;
  mostAskedType: DivinationType;
}