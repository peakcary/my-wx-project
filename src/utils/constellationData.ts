import { 
  ConstellationType, 
  ConstellationInfo, 
  ConstellationBasic, 
  PersonalityTraits, 
  FortuneInfo, 
  FortuneType, 
  ConstellationMatch,
  DateRange
} from '../types/constellation';

/**
 * 星座日期区间配置
 */
export const CONSTELLATION_DATE_RANGES: Record<ConstellationType, DateRange> = {
  [ConstellationType.ARIES]: { startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  [ConstellationType.TAURUS]: { startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  [ConstellationType.GEMINI]: { startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  [ConstellationType.CANCER]: { startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  [ConstellationType.LEO]: { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  [ConstellationType.VIRGO]: { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  [ConstellationType.LIBRA]: { startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
  [ConstellationType.SCORPIO]: { startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
  [ConstellationType.SAGITTARIUS]: { startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
  [ConstellationType.CAPRICORN]: { startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  [ConstellationType.AQUARIUS]: { startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  [ConstellationType.PISCES]: { startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 }
};

/**
 * 完整的星座数据
 */
export const CONSTELLATION_DATA: Record<ConstellationType, ConstellationInfo> = {
  [ConstellationType.ARIES]: {
    basic: {
      id: ConstellationType.ARIES,
      name: '白羊座',
      englishName: 'Aries',
      symbol: '♈',
      element: '火象星座',
      dateRange: '3月21日 - 4月19日',
      rulingPlanet: '火星',
      icon: '🐏'
    },
    personality: {
      positive: ['勇敢', '积极', '热情', '直率', '自信', '有活力'],
      negative: ['冲动', '急躁', '缺乏耐心', '自私', '好争斗'],
      keyWords: ['勇气', '冲劲', '领导力', '开拓'],
      description: '白羊座是黄道十二宫的第一个星座，象征着新的开始。白羊座的人天生具有领导能力，充满热情和活力，敢于冒险，喜欢挑战。他们直率坦诚，但有时会显得冲动和缺乏耐心。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 4,
        description: '今天整体运势良好，适合开展新项目',
        advice: '保持积极态度，抓住机遇',
        luckyColor: '红色',
        luckyNumber: 7
      },
      {
        type: FortuneType.LOVE,
        score: 3,
        description: '感情运势平稳，单身者有机会遇到心仪对象',
        advice: '主动出击，展现真实的自己'
      },
      {
        type: FortuneType.CAREER,
        score: 5,
        description: '事业运势极佳，领导能力得到认可',
        advice: '大胆提出自己的想法和计划'
      },
      {
        type: FortuneType.WEALTH,
        score: 3,
        description: '财运一般，避免冲动消费',
        advice: '理性投资，做好财务规划'
      },
      {
        type: FortuneType.HEALTH,
        score: 4,
        description: '健康状况良好，精力充沛',
        advice: '适度运动，注意休息'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.LEO,
        matchScore: 95,
        relationship: 'perfect',
        description: '火象星座的完美搭配，充满激情和活力'
      },
      {
        constellation: ConstellationType.SAGITTARIUS,
        matchScore: 90,
        relationship: 'perfect',
        description: '同样热爱自由和冒险，互相理解和支持'
      },
      {
        constellation: ConstellationType.GEMINI,
        matchScore: 85,
        relationship: 'good',
        description: '思维活跃，充满新鲜感的组合'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.CANCER,
        matchScore: 45,
        relationship: 'challenging',
        description: '性格差异较大，需要更多理解和包容'
      },
      {
        constellation: ConstellationType.CAPRICORN,
        matchScore: 40,
        relationship: 'challenging',
        description: '一个急躁一个稳重，节奏不易同步'
      }
    ],
    famousPeople: ['梵高', '卓别林', '杰基·陈', '罗伯特·唐尼'],
    strengths: ['天生的领导者', '勇于开拓', '充满活力', '目标明确'],
    weaknesses: ['过于冲动', '缺乏耐心', '有时自我中心', '容易急躁'],
    lifeAdvice: '学会控制冲动，培养耐心。你的热情和勇气是宝贵的财富，但需要与智慧相结合才能获得更大的成功。'
  },

  [ConstellationType.TAURUS]: {
    basic: {
      id: ConstellationType.TAURUS,
      name: '金牛座',
      englishName: 'Taurus',
      symbol: '♉',
      element: '土象星座',
      dateRange: '4月20日 - 5月20日',
      rulingPlanet: '金星',
      icon: '🐂'
    },
    personality: {
      positive: ['稳重', '可靠', '有耐心', '务实', '忠诚', '享受生活'],
      negative: ['固执', '保守', '懒惰', '占有欲强', '难以改变'],
      keyWords: ['稳定', '坚持', '享受', '可靠'],
      description: '金牛座的人稳重可靠，喜欢安定的生活。他们有很强的审美能力，懂得享受生活中的美好事物。虽然有时显得固执，但他们的坚持往往能带来成功。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 3,
        description: '今天运势平稳，适合处理日常事务',
        advice: '按部就班，稳扎稳打',
        luckyColor: '绿色',
        luckyNumber: 6
      },
      {
        type: FortuneType.LOVE,
        score: 4,
        description: '感情运势不错，关系更加稳定',
        advice: '用心经营感情，表达真挚情感'
      },
      {
        type: FortuneType.CAREER,
        score: 3,
        description: '工作稳定，但需要更多创新思维',
        advice: '保持现有成果，适当寻求突破'
      },
      {
        type: FortuneType.WEALTH,
        score: 4,
        description: '财运稳定，适合长期投资',
        advice: '理财保守为主，避免高风险投资'
      },
      {
        type: FortuneType.HEALTH,
        score: 3,
        description: '注意饮食健康，避免暴饮暴食',
        advice: '保持规律作息，适量运动'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.VIRGO,
        matchScore: 92,
        relationship: 'perfect',
        description: '同为土象星座，价值观相近，相处和谐'
      },
      {
        constellation: ConstellationType.CAPRICORN,
        matchScore: 88,
        relationship: 'good',
        description: '都追求稳定和安全感，互相支持'
      },
      {
        constellation: ConstellationType.CANCER,
        matchScore: 85,
        relationship: 'good',
        description: '都重视家庭和情感，能建立温馨的关系'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.AQUARIUS,
        matchScore: 35,
        relationship: 'challenging',
        description: '一个保守一个前卫，思维方式差异很大'
      },
      {
        constellation: ConstellationType.ARIES,
        matchScore: 40,
        relationship: 'challenging',
        description: '节奏不同，一个急躁一个慢热'
      }
    ],
    famousPeople: ['奥黛丽·赫本', '乔治·克鲁尼', '大卫·贝克汉姆', '莎士比亚'],
    strengths: ['极其可靠', '有恒心毅力', '审美能力强', '忠诚专一'],
    weaknesses: ['过分固执', '不喜欢变化', '有时过于物质', '行动缓慢'],
    lifeAdvice: '学会适应变化，不要过分固执己见。你的稳重和可靠是珍贵的品质，但也要保持开放的心态迎接新的机会。'
  },

  [ConstellationType.GEMINI]: {
    basic: {
      id: ConstellationType.GEMINI,
      name: '双子座',
      englishName: 'Gemini',
      symbol: '♊',
      element: '风象星座',
      dateRange: '5月21日 - 6月21日',
      rulingPlanet: '水星',
      icon: '👯'
    },
    personality: {
      positive: ['聪明', '机智', '适应力强', '好奇心强', '沟通能力强', '幽默'],
      negative: ['三心二意', '缺乏专注', '表面化', '不够深入', '善变'],
      keyWords: ['机智', '多变', '沟通', '好奇'],
      description: '双子座的人聪明机智，好奇心强，善于沟通。他们思维敏捷，适应能力强，但有时会显得三心二意，难以专注于一件事情。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 4,
        description: '今天思维活跃，适合学习和交流',
        advice: '多与人沟通交流，拓展人脉',
        luckyColor: '黄色',
        luckyNumber: 3
      },
      {
        type: FortuneType.LOVE,
        score: 3,
        description: '感情变化较多，需要更多耐心',
        advice: '真诚表达内心想法，避免朝三暮四'
      },
      {
        type: FortuneType.CAREER,
        score: 4,
        description: '工作中创意十足，得到认可',
        advice: '发挥沟通优势，建立良好合作关系'
      },
      {
        type: FortuneType.WEALTH,
        score: 3,
        description: '财运一般，避免冲动购物',
        advice: '多方了解投资信息，谨慎决策'
      },
      {
        type: FortuneType.HEALTH,
        score: 4,
        description: '精神状态良好，但注意用脑过度',
        advice: '适当休息，避免过度疲劳'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.LIBRA,
        matchScore: 93,
        relationship: 'perfect',
        description: '同为风象星座，思维契合，交流顺畅'
      },
      {
        constellation: ConstellationType.AQUARIUS,
        matchScore: 90,
        relationship: 'perfect',
        description: '都崇尚自由，思想开放，互相理解'
      },
      {
        constellation: ConstellationType.ARIES,
        matchScore: 85,
        relationship: 'good',
        description: '充满活力的组合，永远不会无聊'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.VIRGO,
        matchScore: 42,
        relationship: 'challenging',
        description: '一个随性一个严谨，很难找到平衡点'
      },
      {
        constellation: ConstellationType.PISCES,
        matchScore: 45,
        relationship: 'challenging',
        description: '理性与感性的冲突，需要更多理解'
      }
    ],
    famousPeople: ['玛丽莲·梦露', '约翰尼·德普', '安吉丽娜·朱莉', '特朗普'],
    strengths: ['思维敏捷', '沟通能力强', '适应性强', '知识面广'],
    weaknesses: ['缺乏专注力', '三心二意', '有时肤浅', '缺乏耐心'],
    lifeAdvice: '学会专注和深入，不要总是浅尝辄止。你的聪明才智是优势，但需要配合持之以恒的努力才能取得更大成就。'
  },

  [ConstellationType.CANCER]: {
    basic: {
      id: ConstellationType.CANCER,
      name: '巨蟹座',
      englishName: 'Cancer',
      symbol: '♋',
      element: '水象星座',
      dateRange: '6月22日 - 7月22日',
      rulingPlanet: '月亮',
      icon: '🦀'
    },
    personality: {
      positive: ['温柔', '体贴', '有同情心', '忠诚', '直觉强', '保护欲强'],
      negative: ['情绪化', '敏感', '依赖性强', '记仇', '容易受伤'],
      keyWords: ['温柔', '保护', '情感', '家庭'],
      description: '巨蟹座的人温柔体贴，有很强的同情心和保护欲。他们重视家庭和情感，直觉敏锐，但有时会过于敏感和情绪化。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 3,
        description: '今天情绪起伏较大，需要调节心态',
        advice: '保持平和心境，多与亲人交流',
        luckyColor: '银色',
        luckyNumber: 4
      },
      {
        type: FortuneType.LOVE,
        score: 4,
        description: '感情运势良好，关系更加亲密',
        advice: '表达内心情感，增进彼此了解'
      },
      {
        type: FortuneType.CAREER,
        score: 3,
        description: '工作中需要更多主动性',
        advice: '发挥同理心优势，建立团队合作'
      },
      {
        type: FortuneType.WEALTH,
        score: 3,
        description: '财运平稳，适合保守理财',
        advice: '避免情绪化消费，做好预算规划'
      },
      {
        type: FortuneType.HEALTH,
        score: 2,
        description: '注意情绪对健康的影响',
        advice: '学会释放压力，保持心情愉快'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.SCORPIO,
        matchScore: 95,
        relationship: 'perfect',
        description: '同为水象星座，情感深度契合'
      },
      {
        constellation: ConstellationType.PISCES,
        matchScore: 92,
        relationship: 'perfect',
        description: '互相理解，情感共鸣强烈'
      },
      {
        constellation: ConstellationType.TAURUS,
        matchScore: 85,
        relationship: 'good',
        description: '都重视安全感，能建立稳定关系'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.ARIES,
        matchScore: 45,
        relationship: 'challenging',
        description: '一个敏感一个直率，容易产生误解'
      },
      {
        constellation: ConstellationType.LIBRA,
        matchScore: 40,
        relationship: 'challenging',
        description: '处理情感的方式差异很大'
      }
    ],
    famousPeople: ['戴安娜王妃', '汤姆·汉克斯', '塞琳娜·戈麦斯', '海明威'],
    strengths: ['极富同情心', '直觉敏锐', '忠诚可靠', '保护意识强'],
    weaknesses: ['过分敏感', '情绪波动大', '容易受伤', '有时过分依赖'],
    lifeAdvice: '学会控制情绪，不要过分敏感。你的温柔和同情心是珍贵的品质，但也要学会保护自己，建立健康的情感边界。'
  },

  [ConstellationType.LEO]: {
    basic: {
      id: ConstellationType.LEO,
      name: '狮子座',
      englishName: 'Leo',
      symbol: '♌',
      element: '火象星座',
      dateRange: '7月23日 - 8月22日',
      rulingPlanet: '太阳',
      icon: '🦁'
    },
    personality: {
      positive: ['自信', '慷慨', '热情', '有魅力', '领导力强', '忠诚'],
      negative: ['自大', '虚荣', '专横', '爱面子', '固执'],
      keyWords: ['自信', '领导', '魅力', '荣耀'],
      description: '狮子座的人自信大方，有天生的领导能力和魅力。他们热情慷慨，忠诚可靠，但有时会显得自大和爱面子。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 5,
        description: '今天运势极佳，是展现才华的好时机',
        advice: '自信展现自己，抓住表现机会',
        luckyColor: '金色',
        luckyNumber: 8
      },
      {
        type: FortuneType.LOVE,
        score: 4,
        description: '魅力四射，容易获得异性关注',
        advice: '真诚对待感情，避免过分炫耀'
      },
      {
        type: FortuneType.CAREER,
        score: 5,
        description: '领导能力得到充分发挥',
        advice: '承担更多责任，展现领导风范'
      },
      {
        type: FortuneType.WEALTH,
        score: 4,
        description: '财运旺盛，但要控制消费欲望',
        advice: '理性消费，避免为了面子过度花费'
      },
      {
        type: FortuneType.HEALTH,
        score: 4,
        description: '精力充沛，状态良好',
        advice: '保持运动习惯，注意心脏健康'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.ARIES,
        matchScore: 95,
        relationship: 'perfect',
        description: '火象星座的激情碰撞，充满活力'
      },
      {
        constellation: ConstellationType.SAGITTARIUS,
        matchScore: 90,
        relationship: 'perfect',
        description: '都热爱生活，积极向上的组合'
      },
      {
        constellation: ConstellationType.GEMINI,
        matchScore: 82,
        relationship: 'good',
        description: '互相吸引，充满新鲜感'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.TAURUS,
        matchScore: 38,
        relationship: 'challenging',
        description: '一个高调一个低调，很难协调'
      },
      {
        constellation: ConstellationType.SCORPIO,
        matchScore: 35,
        relationship: 'challenging',
        description: '都很强势，容易产生权力斗争'
      }
    ],
    famousPeople: ['拿破仑', '麦当娜', '奥巴马', '安迪·沃霍尔'],
    strengths: ['天生领导者', '充满魅力', '慷慨大方', '忠诚可靠'],
    weaknesses: ['过分自信', '爱面子', '有时专横', '不喜欢被忽视'],
    lifeAdvice: '学会谦逊，不要过分在意别人的看法。你的自信和魅力是天赋，但真正的领导者需要懂得倾听和包容。'
  },

  [ConstellationType.VIRGO]: {
    basic: {
      id: ConstellationType.VIRGO,
      name: '处女座',
      englishName: 'Virgo',
      symbol: '♍',
      element: '土象星座',
      dateRange: '8月23日 - 9月22日',
      rulingPlanet: '水星',
      icon: '👩‍⚕️'
    },
    personality: {
      positive: ['细心', '完美主义', '勤奋', '实用', '可靠', '有条理'],
      negative: ['挑剔', '焦虑', '过分严格', '缺乏自信', '过度分析'],
      keyWords: ['完美', '细致', '服务', '分析'],
      description: '处女座的人追求完美，注重细节，勤奋可靠。他们有很强的分析能力和服务精神，但有时会过分挑剔和焦虑。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 4,
        description: '今天适合处理细节工作，效率很高',
        advice: '发挥细心优势，完成重要任务',
        luckyColor: '灰色',
        luckyNumber: 6
      },
      {
        type: FortuneType.LOVE,
        score: 3,
        description: '感情中不要过分挑剔对方',
        advice: '学会包容和理解，降低期望值'
      },
      {
        type: FortuneType.CAREER,
        score: 5,
        description: '工作表现优异，得到上司认可',
        advice: '继续保持严谨态度，追求卓越'
      },
      {
        type: FortuneType.WEALTH,
        score: 4,
        description: '理财谨慎，收益稳定',
        advice: '继续保守理财策略，逐步积累'
      },
      {
        type: FortuneType.HEALTH,
        score: 3,
        description: '注意心理压力，避免过度紧张',
        advice: '学会放松，不要给自己太大压力'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.TAURUS,
        matchScore: 92,
        relationship: 'perfect',
        description: '同为土象星座，价值观相近'
      },
      {
        constellation: ConstellationType.CAPRICORN,
        matchScore: 88,
        relationship: 'good',
        description: '都很实际和负责任，相处融洽'
      },
      {
        constellation: ConstellationType.CANCER,
        matchScore: 83,
        relationship: 'good',
        description: '互补性强，能互相照顾'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.GEMINI,
        matchScore: 42,
        relationship: 'challenging',
        description: '一个严谨一个随性，很难适应'
      },
      {
        constellation: ConstellationType.SAGITTARIUS,
        matchScore: 38,
        relationship: 'challenging',
        description: '生活态度差异很大，容易产生摩擦'
      }
    ],
    famousPeople: ['迈克尔·杰克逊', '碧昂丝', '华伦·巴菲特', '母特蕾莎'],
    strengths: ['极其细心', '追求完美', '工作能力强', '值得信赖'],
    weaknesses: ['过分挑剔', '容易焦虑', '自我要求过高', '缺乏灵活性'],
    lifeAdvice: '学会接受不完美，放松对自己和他人的要求。你的细心和勤奋是宝贵的品质，但也要学会享受生活的不完美之美。'
  },

  [ConstellationType.LIBRA]: {
    basic: {
      id: ConstellationType.LIBRA,
      name: '天秤座',
      englishName: 'Libra',
      symbol: '♎',
      element: '风象星座',
      dateRange: '9月23日 - 10月23日',
      rulingPlanet: '金星',
      icon: '⚖️'
    },
    personality: {
      positive: ['优雅', '公正', '和谐', '社交能力强', '审美能力强', '外交手腕'],
      negative: ['犹豫不决', '依赖性强', '避免冲突', '虚荣', '缺乏主见'],
      keyWords: ['平衡', '和谐', '美感', '公正'],
      description: '天秤座的人追求和谐与平衡，有很强的审美能力和社交技巧。他们公正优雅，但有时会犹豫不决，难以做出选择。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 4,
        description: '今天适合社交和合作，人际关系顺利',
        advice: '发挥协调能力，建立和谐关系',
        luckyColor: '粉色',
        luckyNumber: 2
      },
      {
        type: FortuneType.LOVE,
        score: 5,
        description: '爱情运势极佳，魅力十足',
        advice: '主动表达感情，享受浪漫时光'
      },
      {
        type: FortuneType.CAREER,
        score: 3,
        description: '工作中需要更多决断力',
        advice: '相信自己的判断，勇于做决定'
      },
      {
        type: FortuneType.WEALTH,
        score: 3,
        description: '财运一般，避免奢侈消费',
        advice: '理性购物，控制美容和服饰支出'
      },
      {
        type: FortuneType.HEALTH,
        score: 4,
        description: '身心状态良好，注意肾脏健康',
        advice: '保持运动习惯，多喝水'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.GEMINI,
        matchScore: 93,
        relationship: 'perfect',
        description: '同为风象星座，沟通无障碍'
      },
      {
        constellation: ConstellationType.AQUARIUS,
        matchScore: 88,
        relationship: 'good',
        description: '都崇尚和谐，思想契合'
      },
      {
        constellation: ConstellationType.LEO,
        matchScore: 82,
        relationship: 'good',
        description: '互相欣赏，充满浪漫色彩'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.CANCER,
        matchScore: 40,
        relationship: 'challenging',
        description: '情感表达方式差异很大'
      },
      {
        constellation: ConstellationType.CAPRICORN,
        matchScore: 35,
        relationship: 'challenging',
        description: '一个理想化一个现实化，难以协调'
      }
    ],
    famousPeople: ['甘地', '约翰·列侬', '威尔·史密斯', '金·卡戴珊'],
    strengths: ['社交能力强', '审美品味高', '公正客观', '善于协调'],
    weaknesses: ['优柔寡断', '过分依赖他人', '避免冲突', '有时肤浅'],
    lifeAdvice: '学会独立思考和决策，不要过分依赖他人的意见。你的和谐天性是优势，但也要有自己的立场和原则。'
  },

  [ConstellationType.SCORPIO]: {
    basic: {
      id: ConstellationType.SCORPIO,
      name: '天蝎座',
      englishName: 'Scorpio',
      symbol: '♏',
      element: '水象星座',
      dateRange: '10月24日 - 11月22日',
      rulingPlanet: '冥王星',
      icon: '🦂'
    },
    personality: {
      positive: ['深刻', '直觉强', '意志坚强', '神秘', '专注', '忠诚'],
      negative: ['嫉妒', '报复心强', '多疑', '极端', '控制欲强'],
      keyWords: ['深度', '神秘', '转化', '力量'],
      description: '天蝎座的人深刻神秘，有很强的直觉和洞察力。他们意志坚强，专注执着，但有时会显得多疑和极端。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 4,
        description: '今天直觉敏锐，适合深入思考',
        advice: '相信内心直觉，深入分析问题',
        luckyColor: '深红色',
        luckyNumber: 9
      },
      {
        type: FortuneType.LOVE,
        score: 3,
        description: '感情深度发展，但要控制占有欲',
        advice: '真诚沟通，给对方适当空间'
      },
      {
        type: FortuneType.CAREER,
        score: 5,
        description: '工作中表现出色，洞察力强',
        advice: '发挥分析优势，解决复杂问题'
      },
      {
        type: FortuneType.WEALTH,
        score: 4,
        description: '投资眼光独到，可能有意外收获',
        advice: '深入研究后再投资，相信直觉'
      },
      {
        type: FortuneType.HEALTH,
        score: 3,
        description: '注意情绪管理，避免压力过大',
        advice: '学会释放负面情绪，保持心理健康'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.CANCER,
        matchScore: 95,
        relationship: 'perfect',
        description: '同为水象星座，情感深度契合'
      },
      {
        constellation: ConstellationType.PISCES,
        matchScore: 90,
        relationship: 'perfect',
        description: '精神层面高度共鸣，互相理解'
      },
      {
        constellation: ConstellationType.VIRGO,
        matchScore: 80,
        relationship: 'good',
        description: '互补性强，能深入了解对方'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.LEO,
        matchScore: 35,
        relationship: 'challenging',
        description: '都很强势，容易产生权力斗争'
      },
      {
        constellation: ConstellationType.AQUARIUS,
        matchScore: 30,
        relationship: 'challenging',
        description: '性格差异巨大，很难理解对方'
      }
    ],
    famousPeople: ['毕加索', '希拉里·克林顿', '莱昂纳多·迪卡普里奥', '比尔·盖茨'],
    strengths: ['洞察力极强', '意志坚定', '专注执着', '忠诚可靠'],
    weaknesses: ['过分多疑', '报复心强', '控制欲强', '有时极端'],
    lifeAdvice: '学会控制嫉妒和猜疑，以更开放的心态面对世界。你的深度和洞察力是天赋，但也要学会信任和宽容。'
  },

  [ConstellationType.SAGITTARIUS]: {
    basic: {
      id: ConstellationType.SAGITTARIUS,
      name: '射手座',
      englishName: 'Sagittarius',
      symbol: '♐',
      element: '火象星座',
      dateRange: '11月23日 - 12月21日',
      rulingPlanet: '木星',
      icon: '🏹'
    },
    personality: {
      positive: ['乐观', '自由', '冒险精神', '哲学思维', '诚实', '幽默'],
      negative: ['鲁莽', '不负责任', '缺乏耐心', '说话直率', '难以承诺'],
      keyWords: ['自由', '探索', '乐观', '哲学'],
      description: '射手座的人乐观开朗，热爱自由和冒险。他们有哲学思维，诚实直率，但有时会显得鲁莽和不负责任。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 5,
        description: '今天运势极佳，适合探索新事物',
        advice: '保持乐观态度，勇于尝试新挑战',
        luckyColor: '紫色',
        luckyNumber: 9
      },
      {
        type: FortuneType.LOVE,
        score: 3,
        description: '感情中需要更多承诺和稳定',
        advice: '认真对待感情，避免三心二意'
      },
      {
        type: FortuneType.CAREER,
        score: 4,
        description: '工作中创新思维得到认可',
        advice: '发挥探索精神，寻找新的机会'
      },
      {
        type: FortuneType.WEALTH,
        score: 3,
        description: '财运波动较大，谨慎投资',
        advice: '避免冲动消费，做好风险评估'
      },
      {
        type: FortuneType.HEALTH,
        score: 4,
        description: '活力充沛，但要注意运动安全',
        advice: '保持运动习惯，注意保护关节'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.ARIES,
        matchScore: 90,
        relationship: 'perfect',
        description: '同为火象星座，充满冒险精神'
      },
      {
        constellation: ConstellationType.LEO,
        matchScore: 90,
        relationship: 'perfect',
        description: '都热爱生活，积极向上'
      },
      {
        constellation: ConstellationType.AQUARIUS,
        matchScore: 85,
        relationship: 'good',
        description: '都崇尚自由，思想开放'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.VIRGO,
        matchScore: 38,
        relationship: 'challenging',
        description: '一个随性一个严谨，很难协调'
      },
      {
        constellation: ConstellationType.CANCER,
        matchScore: 35,
        relationship: 'challenging',
        description: '对安全感的需求差异很大'
      }
    ],
    famousPeople: ['沃尔特·迪士尼', '布拉德·皮特', '泰勒·斯威夫特', '丘吉尔'],
    strengths: ['极其乐观', '热爱自由', '见识广博', '诚实直率'],
    weaknesses: ['缺乏耐心', '难以承诺', '有时鲁莽', '不够细心'],
    lifeAdvice: '学会承担责任，不要总是逃避承诺。你的乐观和冒险精神很宝贵，但成功需要持之以恒的努力。'
  },

  [ConstellationType.CAPRICORN]: {
    basic: {
      id: ConstellationType.CAPRICORN,
      name: '摩羯座',
      englishName: 'Capricorn',
      symbol: '♑',
      element: '土象星座',
      dateRange: '12月22日 - 1月19日',
      rulingPlanet: '土星',
      icon: '🐐'
    },
    personality: {
      positive: ['有野心', '负责任', '实际', '有耐心', '可靠', '有组织能力'],
      negative: ['顽固', '悲观', '严肃', '过于现实', '缺乏幽默感'],
      keyWords: ['野心', '责任', '成就', '稳定'],
      description: '摩羯座的人有很强的野心和责任感，实际可靠。他们有耐心，善于组织，但有时会显得过于严肃和现实。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 4,
        description: '今天适合制定长远计划，稳步前进',
        advice: '保持耐心，按计划执行目标',
        luckyColor: '黑色',
        luckyNumber: 10
      },
      {
        type: FortuneType.LOVE,
        score: 3,
        description: '感情需要更多浪漫和情趣',
        advice: '放松心情，增加生活乐趣'
      },
      {
        type: FortuneType.CAREER,
        score: 5,
        description: '事业运势极佳，目标明确',
        advice: '继续努力，成功在望'
      },
      {
        type: FortuneType.WEALTH,
        score: 4,
        description: '理财稳健，积累明显',
        advice: '继续保守投资策略，稳步增长'
      },
      {
        type: FortuneType.HEALTH,
        score: 3,
        description: '注意工作压力，避免过度疲劳',
        advice: '合理安排作息，注意休息'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.TAURUS,
        matchScore: 88,
        relationship: 'good',
        description: '同为土象星座，价值观相近'
      },
      {
        constellation: ConstellationType.VIRGO,
        matchScore: 88,
        relationship: 'good',
        description: '都很实际负责，相处融洽'
      },
      {
        constellation: ConstellationType.SCORPIO,
        matchScore: 83,
        relationship: 'good',
        description: '都有强烈的目标导向，互相支持'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.ARIES,
        matchScore: 40,
        relationship: 'challenging',
        description: '节奏差异很大，一个急躁一个慢热'
      },
      {
        constellation: ConstellationType.LIBRA,
        matchScore: 35,
        relationship: 'challenging',
        description: '一个现实一个理想，很难协调'
      }
    ],
    famousPeople: ['马丁·路德·金', '史蒂芬·霍金', '猫王', '邓小平'],
    strengths: ['极其可靠', '有强烈野心', '组织能力强', '坚持不懈'],
    weaknesses: ['过分严肃', '有时悲观', '缺乏灵活性', '工作狂倾向'],
    lifeAdvice: '学会享受生活，不要只专注于工作和成就。你的坚持和可靠是优势，但也要保持生活的平衡和乐趣。'
  },

  [ConstellationType.AQUARIUS]: {
    basic: {
      id: ConstellationType.AQUARIUS,
      name: '水瓶座',
      englishName: 'Aquarius',
      symbol: '♒',
      element: '风象星座',
      dateRange: '1月20日 - 2月18日',
      rulingPlanet: '天王星',
      icon: '🏺'
    },
    personality: {
      positive: ['独立', '创新', '人道主义', '理智', '友善', '思想前卫'],
      negative: ['固执', '冷漠', '反叛', '不切实际', '情感疏离'],
      keyWords: ['独立', '创新', '友谊', '未来'],
      description: '水瓶座的人独立创新，有人道主义精神。他们思想前卫，友善理智，但有时会显得冷漠和不切实际。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 4,
        description: '今天思维活跃，适合创新和发明',
        advice: '发挥创造力，尝试新的想法',
        luckyColor: '蓝色',
        luckyNumber: 11
      },
      {
        type: FortuneType.LOVE,
        score: 2,
        description: '感情中需要更多温暖和亲密',
        advice: '主动表达情感，增进亲密关系'
      },
      {
        type: FortuneType.CAREER,
        score: 5,
        description: '工作中创新思维备受赞赏',
        advice: '坚持独特观点，引领变革'
      },
      {
        type: FortuneType.WEALTH,
        score: 3,
        description: '财运一般，避免过于理想化的投资',
        advice: '理性分析投资风险，避免跟风'
      },
      {
        type: FortuneType.HEALTH,
        score: 4,
        description: '精神状态良好，注意循环系统',
        advice: '保持运动习惯，促进血液循环'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.GEMINI,
        matchScore: 90,
        relationship: 'perfect',
        description: '同为风象星座，思想契合'
      },
      {
        constellation: ConstellationType.LIBRA,
        matchScore: 88,
        relationship: 'good',
        description: '都崇尚和谐与公正，理念相近'
      },
      {
        constellation: ConstellationType.SAGITTARIUS,
        matchScore: 85,
        relationship: 'good',
        description: '都热爱自由，思想开放'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.TAURUS,
        matchScore: 35,
        relationship: 'challenging',
        description: '一个前卫一个保守，很难理解'
      },
      {
        constellation: ConstellationType.SCORPIO,
        matchScore: 30,
        relationship: 'challenging',
        description: '性格差异巨大，情感表达方式不同'
      }
    ],
    famousPeople: ['富兰克林·罗斯福', '奥普拉', '爱迪生', '林肯'],
    strengths: ['思想独立', '创新能力强', '有人道精神', '客观理性'],
    weaknesses: ['情感冷漠', '过分固执', '不切实际', '难以亲近'],
    lifeAdvice: '学会表达情感，不要过分疏离他人。你的创新思维是宝贵的财富，但也要学会与人建立深度的感情连接。'
  },

  [ConstellationType.PISCES]: {
    basic: {
      id: ConstellationType.PISCES,
      name: '双鱼座',
      englishName: 'Pisces',
      symbol: '♓',
      element: '水象星座',
      dateRange: '2月19日 - 3月20日',
      rulingPlanet: '海王星',
      icon: '🐟'
    },
    personality: {
      positive: ['富有同情心', '直觉强', '艺术天赋', '浪漫', '温柔', '灵性'],
      negative: ['逃避现实', '优柔寡断', '过分敏感', '缺乏自信', '容易受影响'],
      keyWords: ['直觉', '梦想', '同情', '艺术'],
      description: '双鱼座的人富有同情心，直觉敏锐，有艺术天赋。他们浪漫温柔，充满灵性，但有时会逃避现实，优柔寡断。'
    },
    todayFortune: [
      {
        type: FortuneType.OVERALL,
        score: 3,
        description: '今天情感丰富，直觉敏锐',
        advice: '相信直觉，关注内心声音',
        luckyColor: '海蓝色',
        luckyNumber: 12
      },
      {
        type: FortuneType.LOVE,
        score: 5,
        description: '爱情运势极佳，浪漫指数爆表',
        advice: '享受浪漫时光，表达真挚感情'
      },
      {
        type: FortuneType.CAREER,
        score: 2,
        description: '工作中需要更多现实感和决断力',
        advice: '面对现实，做出明确决策'
      },
      {
        type: FortuneType.WEALTH,
        score: 2,
        description: '财运不佳，避免感性消费',
        advice: '理性管理财务，避免冲动购买'
      },
      {
        type: FortuneType.HEALTH,
        score: 3,
        description: '注意情绪对健康的影响',
        advice: '保持心情愉快，适当运动'
      }
    ],
    bestMatches: [
      {
        constellation: ConstellationType.CANCER,
        matchScore: 92,
        relationship: 'perfect',
        description: '同为水象星座，情感高度契合'
      },
      {
        constellation: ConstellationType.SCORPIO,
        matchScore: 90,
        relationship: 'perfect',
        description: '都很感性，精神层面深度共鸣'
      },
      {
        constellation: ConstellationType.TAURUS,
        matchScore: 82,
        relationship: 'good',
        description: '互补性强，能给彼此安全感'
      }
    ],
    worstMatches: [
      {
        constellation: ConstellationType.GEMINI,
        matchScore: 45,
        relationship: 'challenging',
        description: '一个感性一个理性，很难理解'
      },
      {
        constellation: ConstellationType.SAGITTARIUS,
        matchScore: 38,
        relationship: 'challenging',
        description: '生活态度差异很大，难以协调'
      }
    ],
    famousPeople: ['爱因斯坦', '史蒂夫·乔布斯', '蕾哈娜', '米开朗基罗'],
    strengths: ['富有同情心', '艺术天赋高', '直觉敏锐', '温柔体贴'],
    weaknesses: ['过分敏感', '逃避现实', '优柔寡断', '容易受伤'],
    lifeAdvice: '学会面对现实，不要总是逃避困难。你的同情心和直觉是天赋，但也要培养理性思考和决断能力。'
  }
};

/**
 * 根据出生日期获取星座
 */
export function getConstellationByDate(month: number, day: number): ConstellationType | null {
  for (const [constellation, dateRange] of Object.entries(CONSTELLATION_DATE_RANGES)) {
    const { startMonth, startDay, endMonth, endDay } = dateRange;
    
    // 处理跨年的星座（摩羯座）
    if (startMonth > endMonth) {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return constellation as ConstellationType;
      }
    } else {
      if ((month === startMonth && day >= startDay) || 
          (month === endMonth && day <= endDay) || 
          (month > startMonth && month < endMonth)) {
        return constellation as ConstellationType;
      }
    }
  }
  
  return null;
}

/**
 * 获取所有星座的基本信息列表
 */
export function getAllConstellations(): ConstellationBasic[] {
  return Object.values(CONSTELLATION_DATA).map(data => data.basic);
}

/**
 * 根据星座类型获取完整信息
 */
export function getConstellationInfo(type: ConstellationType): ConstellationInfo | null {
  return CONSTELLATION_DATA[type] || null;
}

/**
 * 生成今日个性化运势（基于当前日期）
 */
export function generateTodayFortune(type: ConstellationType): FortuneInfo[] {
  const baseData = CONSTELLATION_DATA[type];
  if (!baseData) return [];
  
  // 基于当前日期生成一些随机性（模拟真实运势变化）
  const today = new Date();
  const seed = today.getDate() + today.getMonth() * 31;
  
  return baseData.todayFortune.map(fortune => ({
    ...fortune,
    score: Math.max(1, Math.min(5, fortune.score + (seed % 3 - 1))), // 微调分数
  }));
}

/**
 * 获取星座中文名称
 */
export function getConstellationChineseName(type: ConstellationType): string {
  const constellationInfo = CONSTELLATION_DATA[type];
  return constellationInfo ? constellationInfo.basic.name : '未知星座';
}