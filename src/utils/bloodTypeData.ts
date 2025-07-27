import { 
  BloodType, 
  BloodTypeInfo, 
  BloodTypeBasic, 
  BloodTypePersonality, 
  BloodTypeHealth,
  BloodTypeCareer,
  BloodTypeMatch,
  BloodTypeScores,
  BloodTypeLearning,
  BloodTypeSocial,
  BloodTypeMoney,
  BloodTypeEmotion,
  BloodTypeLifestyle
} from '../types/bloodType';

/**
 * 完整的血型数据
 */
export const BLOOD_TYPE_DATA: Record<BloodType, BloodTypeInfo> = {
  [BloodType.A]: {
    basic: {
      id: BloodType.A,
      name: 'A型血',
      symbol: 'A',
      frequency: '约占人口28%',
      origin: '农业社会发展时期形成',
      icon: '🅰️'
    },
    personality: {
      positive: ['细心', '有责任感', '团队协作', '守规矩', '完美主义', '体贴他人'],
      negative: ['过于敏感', '压力大', '犹豫不决', '过分谦让', '容易焦虑'],
      keyWords: ['细致', '责任', '合作', '完美'],
      description: 'A型血的人通常性格温和，注重细节，有很强的责任感。他们善于团队合作，但有时会过于在意他人的看法，给自己造成压力。',
      workStyle: '注重细节，按部就班，喜欢有条理的工作环境',
      loveStyle: '专一深情，但表达含蓄，需要时间建立信任'
    },
    health: {
      advantages: ['消化系统较好', '适应植物性饮食', '免疫系统相对稳定'],
      risks: ['容易患心血管疾病', '压力性疾病', '消化性溃疡'],
      diet: ['多吃蔬菜水果', '适量鱼类', '少吃红肉', '避免辛辣食物'],
      exercise: ['瑜伽', '太极', '游泳', '散步等温和运动'],
      lifestyle: '保持规律作息，学会释放压力，创造和谐的生活环境'
    },
    career: {
      suitableJobs: ['会计师', '教师', '护士', '图书管理员', '研究员', '编辑'],
      workEnvironment: '安静、有序、稳定的环境',
      leadershipStyle: '民主型领导，重视团队和谐',
      teamRole: '协调者、执行者、质量把控者'
    },
    learning: {
      learningStyle: '系统性学习，喜欢按部就班，注重细节和准确性',
      memoryType: '细节记忆型，善于记住具体的事实和数据',
      concentrationTips: ['创造安静的学习环境', '制定详细的学习计划', '定期复习巩固', '避免多任务干扰'],
      studyEnvironment: '安静、整洁、有序的独立空间',
      motivationFactors: ['明确的目标', '他人的认可', '完美的成果', '稳定的进步']
    },
    social: {
      communicationStyle: '谨慎温和，倾向于倾听，表达含蓄但真诚',
      friendshipPattern: '重质不重量，偏好深度的长期友谊',
      conflictResolution: '避免正面冲突，倾向于妥协和调解',
      socialEnergy: '小群体聚会和一对一深度交流',
      networkingAbility: '通过真诚和可靠性建立稳固的人际关系'
    },
    money: {
      spendingPattern: '谨慎理财，重视储蓄，消费前会反复考虑',
      investmentStyle: '保守稳健，偏好低风险的长期投资',
      moneyValues: ['安全感', '稳定性', '为未来储备', '避免负债'],
      budgetingTips: ['制定详细预算表', '建立应急基金', '定期储蓄', '避免冲动消费'],
      riskTolerance: '低风险承受能力，优先考虑资金安全'
    },
    emotion: {
      emotionalExpression: '内敛含蓄，情感表达较为间接和温和',
      stressResponse: '容易内化压力，可能出现焦虑和过度担心',
      emotionalNeeds: ['安全感', '被理解', '和谐的环境', '稳定的关系'],
      copingStrategies: ['寻求朋友支持', '通过规律作息调节', '艺术创作释放', '冥想放松'],
      emotionalIntelligence: '高度敏感，能敏锐感知他人情绪变化'
    },
    lifestyle: {
      timeManagement: '精确规划型，喜欢按时间表执行，重视守时',
      hobbyPreferences: ['阅读', '音乐', '绘画', '园艺', '手工艺', '瑜伽'],
      travelStyle: '精心规划的安全旅行，偏好文化和自然景观',
      homeEnvironment: '温馨整洁，注重细节装饰，营造和谐氛围',
      leisureActivities: ['看电影', '听音乐', '散步', '与朋友聊天', '参观博物馆']
    },
    bestMatches: [
      {
        bloodType: BloodType.A,
        matchScore: 95,
        relationship: 'perfect',
        description: '同为A型血，价值观相近，互相理解支持'
      },
      {
        bloodType: BloodType.AB,
        matchScore: 85,
        relationship: 'good',
        description: 'AB型的理性与A型的感性形成互补'
      },
      {
        bloodType: BloodType.O,
        matchScore: 75,
        relationship: 'good',
        description: 'O型的果断能帮助A型做决定'
      }
    ],
    worstMatches: [
      {
        bloodType: BloodType.B,
        matchScore: 45,
        relationship: 'challenging',
        description: 'B型的自由与A型的规则容易产生冲突'
      }
    ],
    famousPeople: ['比尔·盖茨', '村上春树', '奥黛丽·赫本', '姚明', '张艺谋', '刘德华', '李连杰'],
    strengths: ['极其细心', '责任感强', '团队意识好', '善于倾听', '执行力强', '质量意识高'],
    weaknesses: ['过分担心', '缺乏决断力', '容易受影响', '压力承受力差', '过于追求完美', '缺乏冒险精神'],
    lifeAdvice: '学会放松自己，不要过分追求完美。你的细心和责任感是优势，但也要相信自己的判断力，适当表达自己的想法。试着接受"完成比完美更重要"的理念。',
    monthlyFortune: {
      overall: '本月整体运势平稳上升，细心谨慎的特质将为你带来好运，适合处理重要事务',
      career: '工作中的细致表现会得到上级认可，可能有升职或加薪的机会，但要避免过度纠结细节',
      love: '感情生活温馨稳定，单身者可能遇到志同道合的伴侣，恋爱中的要多主动表达关爱',
      health: '注意情绪管理，避免过度焦虑。适合进行舒缓的运动，如瑜伽或散步',
      wealth: '财运稳定，适合制定长期理财计划。避免高风险投资，稳健储蓄是王道'
    }
  },

  [BloodType.B]: {
    basic: {
      id: BloodType.B,
      name: 'B型血',
      symbol: 'B',
      frequency: '约占人口22%',
      origin: '游牧民族时期形成',
      icon: '🅱️'
    },
    personality: {
      positive: ['创造力强', '适应性强', '乐观开朗', '独立自主', '思维灵活', '表达能力强'],
      negative: ['缺乏耐性', '善变', '不拘小节', '有时自我中心', '难以专注'],
      keyWords: ['创新', '自由', '灵活', '乐观'],
      description: 'B型血的人天性乐观，创造力强，适应能力出色。他们追求自由，不喜欢被束缚，但有时会显得缺乏耐心和持续性。',
      workStyle: '喜欢创新挑战，不拘泥于规则，工作效率波动较大',
      loveStyle: '热情主动，但可能缺乏持久性，需要新鲜感'
    },
    health: {
      advantages: ['免疫系统强', '适应性好', '消化能力强'],
      risks: ['容易疲劳', '神经系统敏感', '易患自身免疫疾病'],
      diet: ['均衡饮食', '多样化食物', '适量乳制品', '减少咖啡因'],
      exercise: ['有氧运动', '团体运动', '舞蹈', '登山等变化性运动'],
      lifestyle: '保持生活多样性，定期改变环境，注意劳逸结合'
    },
    career: {
      suitableJobs: ['艺术家', '销售', '记者', '企划', '设计师', '演员'],
      workEnvironment: '自由度高、变化性强的环境',
      leadershipStyle: '魅力型领导，激发团队创新',
      teamRole: '创意产生者、气氛活跃者、变革推动者'
    },
    learning: {
      learningStyle: '多元化学习，喜欢新颖有趣的学习方式，善于举一反三',
      memoryType: '联想记忆型，通过创意连接和故事化记忆',
      concentrationTips: ['变换学习环境', '使用多媒体工具', '设置短期目标', '结合兴趣学习'],
      studyEnvironment: '开放自由的空间，可以自由移动和变换姿势',
      motivationFactors: ['新鲜感', '挑战性', '自主权', '创意表达机会']
    },
    social: {
      communicationStyle: '热情外向，善于表达，喜欢分享和交流新想法',
      friendshipPattern: '广泛社交，喜欢结识不同类型的朋友',
      conflictResolution: '直接沟通，倾向于开放式讨论解决问题',
      socialEnergy: '大型聚会和多人活动中充满活力',
      networkingAbility: '天生的社交达人，善于建立多元化人脉'
    },
    money: {
      spendingPattern: '冲动消费倾向，容易为兴趣和体验花钱',
      investmentStyle: '偏好多元化投资，愿意尝试新的投资方式',
      moneyValues: ['自由', '体验', '享受当下', '投资未来机会'],
      budgetingTips: ['使用简单的预算工具', '设置自动储蓄', '控制冲动消费', '投资兴趣相关领域'],
      riskTolerance: '中高风险承受能力，愿意为机会承担适度风险'
    },
    emotion: {
      emotionalExpression: '直接热情，情感表达丰富而真诚',
      stressResponse: '通过活动和社交来缓解压力，较少内化负面情绪',
      emotionalNeeds: ['自由空间', '新鲜刺激', '理解支持', '表达机会'],
      copingStrategies: ['运动发泄', '社交倾诉', '旅行散心', '创意活动'],
      emotionalIntelligence: '情感表达自然，能感染和激励他人'
    },
    lifestyle: {
      timeManagement: '灵活弹性型，不喜欢过于严格的时间安排',
      hobbyPreferences: ['运动', '旅行', '音乐', '舞蹈', '摄影', '社交活动'],
      travelStyle: '自由行和冒险旅行，喜欢探索未知目的地',
      homeEnvironment: '开放式布局，色彩丰富，充满个性化装饰',
      leisureActivities: ['户外运动', '聚会社交', '尝试新餐厅', '学习新技能', '参加活动']
    },
    bestMatches: [
      {
        bloodType: BloodType.AB,
        matchScore: 90,
        relationship: 'perfect',
        description: 'AB型能理解B型的多变，互相启发创意'
      },
      {
        bloodType: BloodType.B,
        matchScore: 85,
        relationship: 'good',
        description: '同为B型血，都追求自由，充满活力'
      },
      {
        bloodType: BloodType.O,
        matchScore: 70,
        relationship: 'fair',
        description: 'O型的稳定性能平衡B型的多变'
      }
    ],
    worstMatches: [
      {
        bloodType: BloodType.A,
        matchScore: 45,
        relationship: 'challenging',
        description: 'A型的规矩与B型的自由很难协调'
      }
    ],
    famousPeople: ['爱因斯坦', '莫扎特', '玛丽莲·梦露', '成龙', '周杰伦', '范冰冰', '黄渤'],
    strengths: ['创造力超强', '适应能力强', '乐观积极', '表达能力好', '社交能力强', '思维敏捷'],
    weaknesses: ['缺乏持续性', '不够细心', '有时自我', '难以专注', '容易冲动', '计划性不足'],
    lifeAdvice: '发挥你的创造天赋，但也要学会坚持。你的灵活性是优势，但成功需要一定的专注力和耐心。学会平衡自由与责任，享受过程的同时也要关注结果。',
    monthlyFortune: {
      overall: '本月运势活跃向上，创意和社交能力将为你开启新机遇，但要注意保持专注',
      career: '工作中创新想法会受到重视，可能有新项目或合作机会，但要避免三心二意',
      love: '桃花运旺盛，社交场合容易遇到心动对象，但要真诚对待感情，避免朝三暮四',
      health: '精力充沛，适合尝试新的运动方式。注意不要过度兴奋，保持作息规律',
      wealth: '偏财运不错，可能有意外收入。但要控制冲动消费，理性投资'
    }
  },

  [BloodType.AB]: {
    basic: {
      id: BloodType.AB,
      name: 'AB型血',
      symbol: 'AB',
      frequency: '约占人口5%',
      origin: 'A型和B型血混合进化',
      icon: '🆎'
    },
    personality: {
      positive: ['理性客观', '兼容并蓄', '直觉敏锐', '善于分析', '包容性强', '思维独特'],
      negative: ['情绪多变', '难以预测', '有时冷漠', '内心复杂', '纠结矛盾'],
      keyWords: ['理性', '矛盾', '独特', '包容'],
      description: 'AB型血的人集合了A型和B型的特点，性格复杂多面。他们理性客观，但内心情感丰富，有时会显得矛盾和难以捉摸。',
      workStyle: '理性分析，追求效率，但情绪波动会影响表现',
      loveStyle: '理智与感性并存，需要精神层面的共鸣'
    },
    health: {
      advantages: ['免疫系统适应性强', '抗病能力较好', '身体平衡性好'],
      risks: ['心理压力大', '消化系统敏感', '容易疲劳'],
      diet: ['清淡饮食', '少量多餐', '多吃鱼类', '避免过量咖啡'],
      exercise: ['综合性运动', '瑜伽冥想', '游泳', '定期放松训练'],
      lifestyle: '保持心理平衡，定期调节情绪，创造安静的个人空间'
    },
    career: {
      suitableJobs: ['心理医生', '分析师', '外交官', '翻译', '咨询师', '哲学家'],
      workEnvironment: '需要思考分析的安静环境',
      leadershipStyle: '理性型领导，善于协调不同观点',
      teamRole: '分析师、调解者、战略规划者'
    },
    learning: {
      learningStyle: '理论与实践结合，善于深度思考和综合分析',
      memoryType: '逻辑结构化记忆，通过理解和分析来记忆',
      concentrationTips: ['创造独立思考空间', '结合理论与实例', '定期总结归纳', '避免情绪干扰'],
      studyEnvironment: '安静独立的空间，可以自由思考不被打扰',
      motivationFactors: ['深度理解', '智力挑战', '独特见解', '完整性']
    },
    social: {
      communicationStyle: '理性客观，善于分析，表达精准但可能显得冷静',
      friendshipPattern: '精选式社交，偏好与有深度的人建立友谊',
      conflictResolution: '理性分析问题，寻求平衡和双赢的解决方案',
      socialEnergy: '一对一深度交流和小群体讨论',
      networkingAbility: '通过专业能力和独特见解建立影响力'
    },
    money: {
      spendingPattern: '理性消费，会仔细分析性价比和长远价值',
      investmentStyle: '多元化配置，偏好理性分析后的投资决策',
      moneyValues: ['效率', '价值', '平衡', '长远规划'],
      budgetingTips: ['制定灵活预算', '分散投资风险', '关注市场趋势', '定期调整策略'],
      riskTolerance: '中等风险承受能力，会根据分析结果调整风险偏好'
    },
    emotion: {
      emotionalExpression: '复杂多层次，有时理性有时感性，难以预测',
      stressResponse: '内化分析压力源，可能出现情绪波动和纠结',
      emotionalNeeds: ['理解复杂性', '心理空间', '情感共鸣', '被接纳'],
      copingStrategies: ['独处思考', '理性分析', '寻求专业建议', '艺术表达'],
      emotionalIntelligence: '能理解复杂情感，但表达可能显得矛盾'
    },
    lifestyle: {
      timeManagement: '弹性计划型，会根据情况和心情调整安排',
      hobbyPreferences: ['阅读', '思考', '艺术', '心理学', '哲学', '音乐欣赏'],
      travelStyle: '文化探索之旅，喜欢有深度和意义的旅行体验',
      homeEnvironment: '简约而有品味，注重功能性和美感的平衡',
      leisureActivities: ['独处思考', '深度阅读', '观看纪录片', '参观展览', '哲学讨论']
    },
    bestMatches: [
      {
        bloodType: BloodType.AB,
        matchScore: 92,
        relationship: 'perfect',
        description: '同为AB型，都能理解复杂的内心世界'
      },
      {
        bloodType: BloodType.B,
        matchScore: 88,
        relationship: 'good',
        description: 'B型的活力能激发AB型的创造力'
      },
      {
        bloodType: BloodType.A,
        matchScore: 80,
        relationship: 'good',
        description: 'A型的稳定能平衡AB型的多变'
      }
    ],
    worstMatches: [
      {
        bloodType: BloodType.O,
        matchScore: 50,
        relationship: 'challenging',
        description: 'O型的直接与AB型的复杂性格不易协调'
      }
    ],
    famousPeople: ['肯尼迪', '玛丽·居里', '达·芬奇', '周恩来', '林志玲', '古天乐', '陈道明'],
    strengths: ['思维独特', '分析能力强', '包容性好', '直觉敏锐', '理性客观', '适应性强'],
    weaknesses: ['情绪多变', '过于复杂', '有时冷漠', '难以坚持', '内心矛盾', '不易理解'],
    lifeAdvice: '学会简化复杂的想法，相信自己的直觉。你的独特视角是珍贵的财富，但也要学会与他人建立更深的情感连接。接受自己的复杂性，这正是你的魅力所在。',
    monthlyFortune: {
      overall: '本月运势变化多端，理性分析能力将帮你抓住机遇，但要学会平衡理性与感性',
      career: '工作中独特的见解会得到认可，适合承担需要综合分析的项目，但要避免过度纠结',
      love: '感情方面可能有些复杂，单身者要相信直觉，恋爱中的需要更多沟通和理解',
      health: '注意情绪平衡，避免过度思考。适合进行冥想或瑜伽来调节身心',
      wealth: '理财能力突出，适合进行投资组合调整。但要避免过于频繁的操作'
    }
  },

  [BloodType.O]: {
    basic: {
      id: BloodType.O,
      name: 'O型血',
      symbol: 'O',
      frequency: '约占人口45%',
      origin: '人类最古老的血型',
      icon: '⭕'
    },
    personality: {
      positive: ['领导能力强', '自信果断', '目标明确', '责任心强', '忠诚可靠', '执行力强'],
      negative: ['过于强势', '固执己见', '缺乏耐心', '有时粗心', '不够细腻'],
      keyWords: ['领导', '果断', '忠诚', '目标'],
      description: 'O型血的人天生具有领导气质，自信果断，目标导向性强。他们忠诚可靠，但有时会显得过于强势和固执。',
      workStyle: '目标导向，执行力强，喜欢掌控全局',
      loveStyle: '专一忠诚，但可能过于保护对方'
    },
    health: {
      advantages: ['体力好', '免疫力强', '适应高蛋白饮食'],
      risks: ['容易发胖', '血液循环问题', '压力性疾病'],
      diet: ['高蛋白饮食', '适量红肉', '多吃蔬菜', '少吃谷物'],
      exercise: ['高强度运动', '力量训练', '跑步', '竞技性运动'],
      lifestyle: '保持积极的生活态度，定期进行高强度运动，学会放松减压'
    },
    career: {
      suitableJobs: ['CEO', '军官', '警察', '企业家', '外科医生', '运动员'],
      workEnvironment: '有挑战性、能发挥领导力的环境',
      leadershipStyle: '权威型领导，目标导向明确',
      teamRole: '领导者、决策者、执行推动者'
    },
    learning: {
      learningStyle: '实践导向学习，喜欢通过行动和实例来掌握知识',
      memoryType: '体验式记忆，通过实际操作和重复练习来记忆',
      concentrationTips: ['设定明确目标', '制定行动计划', '定期检查进度', '结合实际应用'],
      studyEnvironment: '目标明确的环境，能够看到学习成果的应用',
      motivationFactors: ['实用性', '成就感', '竞争性', '领导机会']
    },
    social: {
      communicationStyle: '直接坦率，言简意赅，重视实际行动胜过言语',
      friendshipPattern: '忠诚的核心朋友圈，重视长期稳定的友谊',
      conflictResolution: '直面问题，倾向于快速有效的解决方案',
      socialEnergy: '在领导和组织活动中展现活力',
      networkingAbility: '通过实力和可靠性建立强大的人脉网络'
    },
    money: {
      spendingPattern: '实用主义消费，注重物品的实际价值和耐用性',
      investmentStyle: '偏好稳健增长的投资，喜欢能掌控的投资项目',
      moneyValues: ['安全', '实用', '增值', '控制权'],
      budgetingTips: ['制定明确财务目标', '定期审查投资', '控制大额支出', '建立应急储备'],
      riskTolerance: '中低风险承受能力，优先考虑本金安全'
    },
    emotion: {
      emotionalExpression: '直接真诚，不善于掩饰情感，表达简单明了',
      stressResponse: '通过行动和运动来释放压力，倾向于解决问题而非情感宣泄',
      emotionalNeeds: ['被信任', '控制感', '成就认可', '稳定关系'],
      copingStrategies: ['运动锻炼', '实际行动', '寻求解决方案', '与信任的人交流'],
      emotionalIntelligence: '情感表达直接，能激励和保护他人'
    },
    lifestyle: {
      timeManagement: '效率优先型，喜欢按计划执行，重视时间利用率',
      hobbyPreferences: ['运动健身', '户外活动', '竞技游戏', '实用技能', '团队活动'],
      travelStyle: '目的性强的旅行，偏好活动丰富和有挑战性的行程',
      homeEnvironment: '实用舒适，注重功能性，喜欢宽敞明亮的空间',
      leisureActivities: ['健身运动', '户外探险', '聚会组织', '学习实用技能', '竞技比赛']
    },
    bestMatches: [
      {
        bloodType: BloodType.O,
        matchScore: 90,
        relationship: 'perfect',
        description: '同为O型血，目标一致，互相支持'
      },
      {
        bloodType: BloodType.A,
        matchScore: 82,
        relationship: 'good',
        description: 'A型的细心能补充O型的粗心'
      },
      {
        bloodType: BloodType.B,
        matchScore: 70,
        relationship: 'fair',
        description: 'O型的稳定性与B型的灵活性可以互补'
      }
    ],
    worstMatches: [
      {
        bloodType: BloodType.AB,
        matchScore: 50,
        relationship: 'challenging',
        description: 'O型的直接与AB型的复杂很难理解'
      }
    ],
    famousPeople: ['乔布斯', '拿破仑', '女王伊丽莎白二世', '毛泽东', '马云', '王菲', '邓超'],
    strengths: ['领导力超强', '执行力高', '目标明确', '忠诚可靠', '意志坚定', '责任心强'],
    weaknesses: ['过于强势', '不够灵活', '有时粗心', '固执己见', '缺乏耐心', '控制欲强'],
    lifeAdvice: '学会倾听他人意见，不要过分固执。你的领导力是天赋，但真正的领袖需要懂得包容和灵活应变。记住，有时候示弱也是一种力量。',
    monthlyFortune: {
      overall: '本月运势强劲有力，领导能力和执行力将带来突破性进展，但要注意团队协作',
      career: '工作中表现出色，可能有晋升或重要项目负责的机会，但要学会授权和协作',
      love: '感情中要表现得更温柔体贴，避免过于强势。单身者魅力四射，容易吸引仰慕者',
      health: '体力充沛，适合挑战性运动。但要注意不要透支身体，适当休息很重要',
      wealth: '正财运旺盛，投资眼光独到。可以考虑长期投资项目，但要控制风险'
    }
  }
};

/**
 * 血型维度评分
 */
export const BLOOD_TYPE_SCORES: Record<BloodType, BloodTypeScores> = {
  [BloodType.A]: {
    leadership: 3,
    creativity: 3,
    patience: 5,
    social: 4,
    logical: 4,
    emotional: 5
  },
  [BloodType.B]: {
    leadership: 4,
    creativity: 5,
    patience: 2,
    social: 5,
    logical: 3,
    emotional: 4
  },
  [BloodType.AB]: {
    leadership: 4,
    creativity: 4,
    patience: 3,
    social: 3,
    logical: 5,
    emotional: 3
  },
  [BloodType.O]: {
    leadership: 5,
    creativity: 3,
    patience: 3,
    social: 4,
    logical: 4,
    emotional: 3
  }
};

/**
 * 获取所有血型的基本信息列表
 */
export function getAllBloodTypes(): BloodTypeBasic[] {
  return Object.values(BLOOD_TYPE_DATA).map(data => data.basic);
}

/**
 * 根据血型获取完整信息
 */
export function getBloodTypeInfo(type: BloodType): BloodTypeInfo | null {
  return BLOOD_TYPE_DATA[type] || null;
}

/**
 * 获取血型中文名称
 */
export function getBloodTypeChineseName(type: BloodType): string {
  const bloodTypeInfo = BLOOD_TYPE_DATA[type];
  return bloodTypeInfo ? bloodTypeInfo.basic.name : '未知血型';
}

/**
 * 获取血型维度评分
 */
export function getBloodTypeScores(type: BloodType): BloodTypeScores | null {
  return BLOOD_TYPE_SCORES[type] || null;
}

/**
 * 生成今日小贴士
 */
export function generateTodayTips(type: BloodType): {
  health: string;
  work: string;
  love: string;
  mood: string;
} {
  const tips = {
    [BloodType.A]: {
      health: '今天注意放松心情，避免过度紧张，适合做一些舒缓的运动。',
      work: '细心的优势今天会得到体现，适合处理需要精确度的工作。',
      love: '在感情中多表达自己的想法，不要过分压抑内心的感受。',
      mood: '保持内心平静，多与信任的人交流，释放心理压力。'
    },
    [BloodType.B]: {
      health: '今天精力充沛，适合尝试新的运动方式或户外活动。',
      work: '创意思维活跃，适合头脑风暴和创新性工作。',
      love: '主动表达关爱，用行动证明你的真心，但要注意持续性。',
      mood: '乐观的天性让你今天充满正能量，可以感染身边的人。'
    },
    [BloodType.AB]: {
      health: '注意调节情绪，避免过度思考，适合冥想或瑜伽。',
      work: '理性分析能力强，适合制定策略和解决复杂问题。',
      love: '理智与感性并重，倾听内心真实的声音。',
      mood: '内心可能有些矛盾，给自己一些独处的时间思考。'
    },
    [BloodType.O]: {
      health: '体力充沛，适合高强度运动，但要注意不要过度消耗。',
      work: '领导力突出，适合承担重要项目和团队管理工作。',
      love: '表达爱意时要考虑对方的感受，不要过于强势。',
      mood: '自信满满的一天，但要学会倾听他人的不同意见。'
    }
  };

  return tips[type];
}