// 血型分析相关类型定义

/**
 * 血型枚举
 */
export enum BloodType {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O'
}

/**
 * 血型基本信息
 */
export interface BloodTypeBasic {
  id: BloodType;
  name: string;           // 血型名称
  symbol: string;         // 血型符号
  frequency: string;      // 人口占比
  origin: string;         // 起源特点
  icon: string;           // 图标emoji
}

/**
 * 性格特征
 */
export interface BloodTypePersonality {
  positive: string[];     // 积极特质
  negative: string[];     // 消极特质
  keyWords: string[];     // 关键词
  description: string;    // 详细描述
  workStyle: string;      // 工作风格
  loveStyle: string;      // 恋爱风格
}

/**
 * 健康特征
 */
export interface BloodTypeHealth {
  advantages: string[];   // 健康优势
  risks: string[];        // 健康风险
  diet: string[];         // 饮食建议
  exercise: string[];     // 运动建议
  lifestyle: string;      // 生活方式建议
}

/**
 * 血型配对信息
 */
export interface BloodTypeMatch {
  bloodType: BloodType;
  matchScore: number;     // 配对指数 (1-100)
  relationship: 'perfect' | 'good' | 'fair' | 'challenging'; // 关系类型
  description: string;    // 配对描述
}

/**
 * 职业倾向
 */
export interface BloodTypeCareer {
  suitableJobs: string[];     // 适合职业
  workEnvironment: string;    // 工作环境偏好
  leadershipStyle: string;    // 领导风格
  teamRole: string;          // 团队角色
}

/**
 * 学习特征
 */
export interface BloodTypeLearning {
  learningStyle: string;          // 学习风格
  memoryType: string;             // 记忆类型
  concentrationTips: string[];    // 专注力提升建议
  studyEnvironment: string;       // 适合的学习环境
  motivationFactors: string[];    // 学习动机因素
}

/**
 * 社交特征
 */
export interface BloodTypeSocial {
  communicationStyle: string;     // 沟通风格
  friendshipPattern: string;      // 友谊模式
  conflictResolution: string;     // 冲突解决方式
  socialEnergy: string;           // 社交能量来源
  networkingAbility: string;      // 社交网络能力
}

/**
 * 财富观念
 */
export interface BloodTypeMoney {
  spendingPattern: string;        // 消费模式
  investmentStyle: string;        // 投资风格
  moneyValues: string[];          // 金钱价值观
  budgetingTips: string[];        // 理财建议
  riskTolerance: string;          // 风险承受能力
}

/**
 * 情感特征
 */
export interface BloodTypeEmotion {
  emotionalExpression: string;    // 情感表达方式
  stressResponse: string;         // 压力反应
  emotionalNeeds: string[];       // 情感需求
  copingStrategies: string[];     // 应对策略
  emotionalIntelligence: string;  // 情商特点
}

/**
 * 生活方式
 */
export interface BloodTypeLifestyle {
  timeManagement: string;         // 时间管理风格
  hobbyPreferences: string[];     // 兴趣爱好偏好
  travelStyle: string;            // 旅行风格
  homeEnvironment: string;        // 居家环境偏好
  leisureActivities: string[];    // 休闲活动
}

/**
 * 完整的血型信息
 */
export interface BloodTypeInfo {
  basic: BloodTypeBasic;
  personality: BloodTypePersonality;
  health: BloodTypeHealth;
  career: BloodTypeCareer;
  learning: BloodTypeLearning;     // 学习特征
  social: BloodTypeSocial;         // 社交特征
  money: BloodTypeMoney;           // 财富观念
  emotion: BloodTypeEmotion;       // 情感特征
  lifestyle: BloodTypeLifestyle;   // 生活方式
  bestMatches: BloodTypeMatch[];   // 最佳配对
  worstMatches: BloodTypeMatch[];  // 最差配对
  famousPeople: string[];          // 知名人物
  strengths: string[];             // 优势
  weaknesses: string[];            // 劣势
  lifeAdvice: string;             // 人生建议
  monthlyFortune: {               // 本月运势
    overall: string;
    career: string;
    love: string;
    health: string;
    wealth: string;
  };
}

/**
 * 用户血型分析结果
 */
export interface BloodTypeAnalysis {
  selectedBloodType: BloodType;
  analysisDate: string;           // 分析日期
  bloodTypeInfo: BloodTypeInfo;
  personalizedAdvice: string;     // 个性化建议
  compatibilityAnalysis: {        // 兼容性分析
    bestMatch: BloodTypeMatch;
    challengingMatch: BloodTypeMatch;
  };
  todayTips: {                   // 今日小贴士
    health: string;
    work: string;
    love: string;
    mood: string;
  };
}

/**
 * 血型选择状态
 */
export interface BloodTypeSelectionState {
  selectedBloodType?: BloodType;
  isAnalyzing: boolean;
  analysisResult?: BloodTypeAnalysis;
  showResult: boolean;
}

/**
 * 血型特征维度评分
 */
export interface BloodTypeScores {
  leadership: number;      // 领导力 (1-5)
  creativity: number;      // 创造力 (1-5)
  patience: number;        // 耐心 (1-5)
  social: number;          // 社交能力 (1-5)
  logical: number;         // 逻辑思维 (1-5)
  emotional: number;       // 情感表达 (1-5)
}