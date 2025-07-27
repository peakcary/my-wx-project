// 星座相关类型定义

/**
 * 星座枚举
 */
export enum ConstellationType {
  ARIES = 'aries',          // 白羊座
  TAURUS = 'taurus',        // 金牛座
  GEMINI = 'gemini',        // 双子座
  CANCER = 'cancer',        // 巨蟹座
  LEO = 'leo',              // 狮子座
  VIRGO = 'virgo',          // 处女座
  LIBRA = 'libra',          // 天秤座
  SCORPIO = 'scorpio',      // 天蝎座
  SAGITTARIUS = 'sagittarius', // 射手座
  CAPRICORN = 'capricorn',  // 摩羯座
  AQUARIUS = 'aquarius',    // 水瓶座
  PISCES = 'pisces'         // 双鱼座
}

/**
 * 星座基本信息
 */
export interface ConstellationBasic {
  id: ConstellationType;
  name: string;           // 中文名称
  englishName: string;    // 英文名称
  symbol: string;         // 星座符号
  element: string;        // 元素（火、土、风、水）
  dateRange: string;      // 日期范围
  rulingPlanet: string;   // 守护星
  icon: string;           // 图标emoji或图片路径
}

/**
 * 性格特征
 */
export interface PersonalityTraits {
  positive: string[];     // 积极特质
  negative: string[];     // 消极特质
  keyWords: string[];     // 关键词
  description: string;    // 详细描述
}

/**
 * 运势类型
 */
export enum FortuneType {
  OVERALL = 'overall',    // 综合运势
  LOVE = 'love',          // 爱情运势
  CAREER = 'career',      // 事业运势
  WEALTH = 'wealth',      // 财富运势
  HEALTH = 'health'       // 健康运势
}

/**
 * 运势信息
 */
export interface FortuneInfo {
  type: FortuneType;
  score: number;          // 运势评分 (1-5)
  description: string;    // 运势描述
  advice: string;         // 建议
  luckyColor?: string;    // 幸运颜色
  luckyNumber?: number;   // 幸运数字
}

/**
 * 星座配对信息
 */
export interface ConstellationMatch {
  constellation: ConstellationType;
  matchScore: number;     // 配对指数 (1-100)
  relationship: 'perfect' | 'good' | 'fair' | 'challenging'; // 关系类型
  description: string;    // 配对描述
}

/**
 * 完整的星座信息
 */
export interface ConstellationInfo {
  basic: ConstellationBasic;
  personality: PersonalityTraits;
  todayFortune: FortuneInfo[];    // 今日运势
  bestMatches: ConstellationMatch[];  // 最佳配对
  worstMatches: ConstellationMatch[]; // 最差配对
  famousPeople: string[];         // 知名人物
  strengths: string[];            // 优势
  weaknesses: string[];           // 劣势
  lifeAdvice: string;            // 人生建议
}

/**
 * 用户星座分析结果
 */
export interface ConstellationAnalysis {
  selectedConstellation: ConstellationType;
  analysisDate: string;           // 分析日期
  constellationInfo: ConstellationInfo;
  personalizedAdvice: string;     // 个性化建议
  compatibilityAnalysis: {        // 兼容性分析
    bestMatch: ConstellationMatch;
    challengingMatch: ConstellationMatch;
  };
}

/**
 * 星座选择状态
 */
export interface ConstellationSelectionState {
  selectedConstellation?: ConstellationType;
  isAnalyzing: boolean;
  analysisResult?: ConstellationAnalysis;
  showResult: boolean;
}

/**
 * 日期区间
 */
export interface DateRange {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

/**
 * 星座查询结果
 */
export interface ConstellationQueryResult {
  constellation: ConstellationType;
  confidence: number;      // 匹配置信度
  isExactMatch: boolean;   // 是否精确匹配
}