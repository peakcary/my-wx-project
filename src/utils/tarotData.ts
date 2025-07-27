import {
  TarotCard,
  TarotCardInfo,
  TarotSuit,
  TarotMeaning,
  TarotSpread,
  SpreadType,
  DivinationType
} from '../types/tarot';

/**
 * 大阿卡纳塔罗牌数据（22张）
 */
export const MAJOR_ARCANA: Record<string, TarotCardInfo> = {
  'the-fool': {
    card: {
      id: 'the-fool',
      name: '愚者',
      englishName: 'The Fool',
      suit: TarotSuit.MAJOR,
      number: 0,
      image: '🃏',
      keywords: ['新开始', '冒险', '纯真', '自由', '潜力'],
      element: '风',
      planet: '天王星',
      zodiac: '水瓶座'
    },
    meaning: {
      upright: {
        general: '新的开始，充满无限可能。勇敢踏出第一步，相信直觉和内心的声音。',
        love: '新恋情的开始，或是感情中的新阶段。保持开放的心态去爱。',
        career: '新的工作机会或创业想法。是时候勇敢追求梦想了。',
        wealth: '新的投资机会，但要谨慎理财，避免盲目冒险。',
        health: '身心状态良好，适合尝试新的健康方式。',
        advice: '勇敢踏出舒适圈，相信自己的能力，但也要保持谨慎。'
      },
      reversed: {
        general: '鲁莽行事，缺乏计划。需要更多思考再行动。',
        love: '感情中过于冲动，可能因草率决定而后悔。',
        career: '工作中缺乏方向，需要重新规划职业道路。',
        wealth: '财务管理混乱，避免不必要的支出。',
        health: '注意因疏忽导致的健康问题。',
        advice: '三思而后行，制定详细计划再开始新的尝试。'
      }
    },
    symbolism: '愚者代表新的开始和无限的可能性，是人生旅程的起点。',
    numerology: '数字0代表无限的潜能和全新的开始。',
    story: '年轻人背着行囊，即将踏上人生的冒险旅程，身边有忠实的小狗陪伴。'
  },

  'the-magician': {
    card: {
      id: 'the-magician',
      name: '魔术师',
      englishName: 'The Magician',
      suit: TarotSuit.MAJOR,
      number: 1,
      image: '🎩',
      keywords: ['意志力', '创造', '技能', '专注', '行动'],
      element: '风',
      planet: '水星',
      zodiac: '双子座'
    },
    meaning: {
      upright: {
        general: '拥有实现目标的能力和资源。意志力强，能够化想法为现实。',
        love: '感情中的主导地位，有能力创造浪漫和惊喜。',
        career: '工作能力出众，是展现才华的好时机。',
        wealth: '理财能力强，能够创造财富机会。',
        health: '身体状况良好，有能力改善健康问题。',
        advice: '善用你的能力和资源，专注于目标的实现。'
      },
      reversed: {
        general: '能力被误用，缺乏专注力。可能有欺骗或操控行为。',
        love: '感情中不够真诚，可能有隐瞒或欺骗。',
        career: '工作中缺乏专注，才华没有得到发挥。',
        wealth: '财务管理不善，可能有投机行为。',
        health: '忽视健康问题，需要更加关注身体状况。',
        advice: '重新审视自己的动机，诚实面对内心和外界。'
      }
    },
    symbolism: '魔术师象征将潜能转化为现实的力量，代表意志力和创造力。',
    numerology: '数字1代表开始、领导力和独立性。',
    story: '魔术师高举魔杖，桌上放着四大元素的象征，展现掌控一切的能力。'
  },

  'the-high-priestess': {
    card: {
      id: 'the-high-priestess',
      name: '女祭司',
      englishName: 'The High Priestess',
      suit: TarotSuit.MAJOR,
      number: 2,
      image: '👸',
      keywords: ['直觉', '神秘', '智慧', '内省', '潜意识'],
      element: '水',
      planet: '月亮',
      zodiac: '巨蟹座'
    },
    meaning: {
      upright: {
        general: '相信直觉，倾听内心的声音。神秘知识和智慧的获得。',
        love: '感情深处的秘密，需要更多的理解和沟通。',
        career: '工作中需要依靠直觉做决定，可能涉及咨询或教育领域。',
        wealth: '理财需要更多的研究和直觉判断。',
        health: '关注身心的平衡，重视心理健康。',
        advice: '静下心来，倾听内心的智慧，相信你的第六感。'
      },
      reversed: {
        general: '忽视直觉，过度理性分析。可能有秘密被揭露。',
        love: '感情中缺乏深度沟通，存在隐瞒或误解。',
        career: '工作中过度依赖逻辑，忽视了直觉的重要性。',
        wealth: '投资决策过于保守或过于冲动。',
        health: '忽视身体发出的警告信号。',
        advice: '平衡理性和感性，不要完全忽视直觉的指引。'
      }
    },
    symbolism: '女祭司代表内在智慧和直觉力量，是潜意识的守护者。',
    numerology: '数字2代表平衡、合作和直觉。',
    story: '女祭司坐在智慧之门前，守护着神秘知识和内在真理。'
  },

  'the-empress': {
    card: {
      id: 'the-empress',
      name: '皇后',
      englishName: 'The Empress',
      suit: TarotSuit.MAJOR,
      number: 3,
      image: '👑',
      keywords: ['丰收', '创造', '母性', '美丽', '自然'],
      element: '土',
      planet: '金星',
      zodiac: '金牛座'
    },
    meaning: {
      upright: {
        general: '创造力丰富，生活富足。母性能量强，善于照顾他人。',
        love: '感情丰富美满，可能有结婚或怀孕的好消息。',
        career: '工作成果丰硕，特别适合创意相关工作。',
        wealth: '财运良好，投资有收益。',
        health: '身体健康，特别是女性健康方面。',
        advice: '享受生活的美好，发挥你的创造才能。'
      },
      reversed: {
        general: '创造力受阻，可能过度依赖他人。',
        love: '感情中过于依赖或控制欲强。',
        career: '工作创意不足，可能有职场人际问题。',
        wealth: '过度消费，财务管理需要更多规划。',
        health: '注意女性健康问题，避免过度劳累。',
        advice: '重新找回创造力，学会独立和自爱。'
      }
    },
    symbolism: '皇后象征丰饶的大地母亲，代表创造力和生命力。',
    numerology: '数字3代表创造、表达和成长。',
    story: '皇后坐在丰收的田野中，周围充满生机和美丽的自然景象。'
  },

  'the-emperor': {
    card: {
      id: 'the-emperor',
      name: '皇帝',
      englishName: 'The Emperor',
      suit: TarotSuit.MAJOR,
      number: 4,
      image: '👨‍⚖️',
      keywords: ['权威', '稳定', '领导', '结构', '父性'],
      element: '火',
      planet: '火星',
      zodiac: '白羊座'
    },
    meaning: {
      upright: {
        general: '拥有权威和领导力，生活稳定有序。父性能量强。',
        love: '感情稳定，对方可靠有责任感。',
        career: '工作中的领导地位，管理能力出众。',
        wealth: '财务稳定，善于理财规划。',
        health: '身体强健，注意保持规律生活。',
        advice: '发挥领导才能，建立稳固的基础。'
      },
      reversed: {
        general: '过度控制，缺乏灵活性。可能有权威冲突。',
        love: '感情中过于强势或遇到强势的对象。',
        career: '工作中权力斗争，管理方式需要调整。',
        wealth: '财务管理过于保守或冒险。',
        health: '因压力导致的健康问题。',
        advice: '学会适度放松控制，倾听他人意见。'
      }
    },
    symbolism: '皇帝代表世俗权力和稳定的结构，是秩序的建立者。',
    numerology: '数字4代表稳定、秩序和实用性。',
    story: '皇帝坐在王座上，手持权杖，展现出威严和领导力。'
  },

  'the-hierophant': {
    card: {
      id: 'the-hierophant',
      name: '教皇',
      englishName: 'The Hierophant',
      suit: TarotSuit.MAJOR,
      number: 5,
      image: '⛪',
      keywords: ['传统', '教育', '精神', '道德', '信仰'],
      element: '土',
      planet: '金牛座',
      zodiac: '金牛座'
    },
    meaning: {
      upright: {
        general: '寻求精神指导，学习传统智慧。可能遇到导师或获得教育机会。',
        love: '传统的恋爱关系，可能通过正式渠道认识对象。',
        career: '工作中需要学习新技能，可能涉及教育或咨询行业。',
        wealth: '理财需要寻求专业建议，遵循传统投资方式。',
        health: '寻求专业医疗建议，重视身心健康。',
        advice: '保持开放的学习心态，尊重传统和权威。'
      },
      reversed: {
        general: '反叛传统，寻求个人真理。可能与权威发生冲突。',
        love: '不按常理的恋爱关系，可能面临外界压力。',
        career: '工作中挑战传统做法，需要创新思维。',
        wealth: '投资策略独特，但需要承担更多风险。',
        health: '尝试另类疗法，但要注意安全性。',
        advice: '在创新和传统之间找到平衡点。'
      }
    },
    symbolism: '教皇代表精神权威和传统智慧的传承。',
    numerology: '数字5代表自由、变化和个人经验。',
    story: '教皇作为精神导师，向信徒传授宗教知识和道德准则。'
  }
};

/**
 * 简化的小阿卡纳数据（每个花色取几张代表性的牌）
 */
export const MINOR_ARCANA: Record<string, TarotCardInfo> = {
  // 权杖组（火元素 - 激情、创造、行动）
  'ace-of-wands': {
    card: {
      id: 'ace-of-wands',
      name: '权杖王牌',
      englishName: 'Ace of Wands',
      suit: TarotSuit.WANDS,
      number: 1,
      image: '🪄',
      keywords: ['新开始', '创造力', '灵感', '潜力', '机会'],
      element: '火'
    },
    meaning: {
      upright: {
        general: '新的开始充满创造力和热情。一个充满潜力的机会出现。',
        love: '新恋情的火花，充满激情和可能性。',
        career: '新的工作机会或创意项目，充满发展潜力。',
        wealth: '新的收入来源或投资机会。',
        health: '精力充沛，适合开始新的健身计划。',
        advice: '抓住机会，发挥你的创造潜力。'
      },
      reversed: {
        general: '缺乏方向，创意受阻。可能错失良机。',
        love: '感情缺乏激情，关系停滞不前。',
        career: '工作缺乏动力，创意想法无法实现。',
        wealth: '投资机会不明朗，需要更多研究。',
        health: '精力不足，需要休息调整。',
        advice: '重新激发内在动力，寻找新的灵感源泉。'
      }
    },
    symbolism: '权杖王牌象征纯粹的创造能量和新的开始。',
    numerology: '数字1代表开始、领导和独立。',
    story: '一只手从云中伸出，握住一根绿叶茂盛的权杖，象征无限的创造潜力。'
  },

  'three-of-wands': {
    card: {
      id: 'three-of-wands',
      name: '权杖三',
      englishName: 'Three of Wands',
      suit: TarotSuit.WANDS,
      number: 3,
      image: '🔱',
      keywords: ['远见', '扩展', '预测', '贸易', '领导'],
      element: '火'
    },
    meaning: {
      upright: {
        general: '计划开始展现成果，具有远见和领导能力。',
        love: '感情关系有长远发展的可能，需要耐心等待。',
        career: '事业拓展机会，可能涉及海外合作。',
        wealth: '投资开始见效，财务状况逐步改善。',
        health: '健康状况稳定向好，坚持治疗方案。',
        advice: '保持远见，相信你的计划会成功。'
      },
      reversed: {
        general: '计划延迟，缺乏远见，可能有意外阻碍。',
        love: '感情发展不如预期，需要重新评估关系。',
        career: '事业发展受阻，合作可能出现问题。',
        wealth: '投资回报延迟，需要调整理财策略。',
        health: '健康问题反复，需要更耐心的治疗。',
        advice: '重新审视计划，调整策略和期望。'
      }
    },
    symbolism: '权杖三代表通过努力和远见获得的成功基础。',
    numerology: '数字3代表创造、表达和成长。',
    story: '一个人站在高处眺望远方，手持权杖，规划着未来的道路。'
  },

  // 圣杯组（水元素 - 情感、直觉、关系）
  'ace-of-cups': {
    card: {
      id: 'ace-of-cups',
      name: '圣杯王牌',
      englishName: 'Ace of Cups',
      suit: TarotSuit.CUPS,
      number: 1,
      image: '🏆',
      keywords: ['新感情', '爱', '直觉', '精神', '情感'],
      element: '水'
    },
    meaning: {
      upright: {
        general: '新的情感开始，心灵充满爱和同情。直觉力增强。',
        love: '新恋情的开始，或现有关系的情感深化。',
        career: '工作中的新合作关系，团队和谐。',
        wealth: '财运通过人际关系得到提升。',
        health: '心理健康状况良好，情绪稳定。',
        advice: '开放心扉，接受爱与被爱。'
      },
      reversed: {
        general: '情感封闭，缺乏爱的表达。直觉被忽视。',
        love: '感情关系冷淡，缺乏真诚的沟通。',
        career: '工作中人际关系紧张，合作困难。',
        wealth: '因情感问题影响财务决策。',
        health: '情绪低落，需要关注心理健康。',
        advice: '学会表达情感，重新连接内心。'
      }
    },
    symbolism: '圣杯王牌象征纯粹的爱和情感的新开始。',
    numerology: '数字1代表新的开始和纯粹的能量。',
    story: '神圣的手捧着溢满甘露的圣杯，象征无条件的爱和精神滋养。'
  },

  // 宝剑组（风元素 - 思想、沟通、冲突）
  'ace-of-swords': {
    card: {
      id: 'ace-of-swords',
      name: '宝剑王牌',
      englishName: 'Ace of Swords',
      suit: TarotSuit.SWORDS,
      number: 1,
      image: '⚔️',
      keywords: ['真理', '清晰', '突破', '沟通', '决断'],
      element: '风'
    },
    meaning: {
      upright: {
        general: '思维清晰，真理显现。突破性的想法或洞察力。',
        love: '感情中的真话时刻，需要诚实沟通。',
        career: '工作中的新想法或突破，决策力强。',
        wealth: '理财思路清晰，投资决策明智。',
        health: '诊断明确，治疗方向清楚。',
        advice: '相信你的判断，勇于说出真相。'
      },
      reversed: {
        general: '思维混乱，真相被掩盖。沟通出现问题。',
        love: '感情中缺乏真诚，可能有欺骗或误解。',
        career: '工作中决策困难，想法不够清晰。',
        wealth: '投资判断失误，需要更多分析。',
        health: '症状不明确，需要进一步检查。',
        advice: '慢下来思考，寻求更多信息再做决定。'
      }
    },
    symbolism: '宝剑王牌代表纯粹的思想力量和真理的显现。',
    numerology: '数字1代表开始、独立和决断力。',
    story: '一只手高举着双刃剑，剑尖指向真理，象征智慧和正义。'
  },

  // 钱币组（土元素 - 物质、实用、金钱）
  'ace-of-pentacles': {
    card: {
      id: 'ace-of-pentacles',
      name: '钱币王牌',
      englishName: 'Ace of Pentacles',
      suit: TarotSuit.PENTACLES,
      number: 1,
      image: '🪙',
      keywords: ['新机会', '物质', '财富', '实用', '开始'],
      element: '土'
    },
    meaning: {
      upright: {
        general: '新的物质机会，财富的种子。实用的新开始。',
        love: '感情关系有物质基础，可能涉及共同财务规划。',
        career: '新的工作机会，可能带来经济收益。',
        wealth: '新的投资机会，财务状况改善的开始。',
        health: '身体状况稳定，适合开始健康计划。',
        advice: '把握实际机会，脚踏实地地行动。'
      },
      reversed: {
        general: '机会流失，物质基础不稳。缺乏实际行动。',
        love: '感情缺乏现实基础，可能有经济压力。',
        career: '工作机会不实际，收入不稳定。',
        wealth: '投资风险高，财务规划不当。',
        health: '忽视身体健康，生活习惯需要改善。',
        advice: '重新评估实际情况，制定可行计划。'
      }
    },
    symbolism: '钱币王牌象征物质世界的新机会和财富的潜力。',
    numerology: '数字1代表新的开始和独立的力量。',
    story: '一只手托着闪闪发光的金币，象征着物质世界的丰富可能性。'
  }
};

/**
 * 塔罗牌阵配置
 */
export const TAROT_SPREADS: Record<SpreadType, TarotSpread> = {
  [SpreadType.SINGLE]: {
    type: SpreadType.SINGLE,
    name: '单张牌占卜',
    description: '最简单的占卜方式，适合日常指导和快速问答',
    positions: [
      { index: 0, name: '指导牌', meaning: '对当前问题的指导和建议' }
    ]
  },
  
  [SpreadType.THREE_CARD]: {
    type: SpreadType.THREE_CARD,
    name: '三张牌时间流',
    description: '最经典的塔罗牌阵，揭示过去、现在、未来的能量流动',
    positions: [
      { index: 0, name: '过去', meaning: '影响当前状况的过去因素' },
      { index: 1, name: '现在', meaning: '当前的状况和面临的挑战' },
      { index: 2, name: '未来', meaning: '可能的发展趋势和结果' }
    ]
  },

  [SpreadType.CROSS]: {
    type: SpreadType.CROSS,
    name: '十字牌阵',
    description: '深入分析问题的各个层面，提供全方位的指导',
    positions: [
      { index: 0, name: '现状', meaning: '当前的核心问题或状况' },
      { index: 1, name: '挑战', meaning: '需要面对的困难或阻碍' },
      { index: 2, name: '过去影响', meaning: '过去对现在的影响' },
      { index: 3, name: '未来可能', meaning: '可能的发展方向' },
      { index: 4, name: '建议', meaning: '宇宙给出的指导和建议' }
    ]
  },

  [SpreadType.CELTIC]: {
    type: SpreadType.CELTIC,
    name: '凯尔特十字',
    description: '最复杂全面的塔罗牌阵，提供深度分析和洞察',
    positions: [
      { index: 0, name: '现状', meaning: '当前的核心问题' },
      { index: 1, name: '挑战', meaning: '横跨在前的障碍' },
      { index: 2, name: '远因', meaning: '问题的根源' },
      { index: 3, name: '近因', meaning: '最近的影响因素' },
      { index: 4, name: '可能', meaning: '可能的结果' },
      { index: 5, name: '近未来', meaning: '即将发生的事情' },
      { index: 6, name: '态度', meaning: '你的内在态度' },
      { index: 7, name: '外在影响', meaning: '外界的影响' },
      { index: 8, name: '希望恐惧', meaning: '内心的希望和恐惧' },
      { index: 9, name: '最终结果', meaning: '最终的结果和结论' }
    ]
  }
};

/**
 * 占卜类型配置
 */
export const DIVINATION_TYPES: Record<DivinationType, {
  name: string;
  description: string;
  icon: string;
}> = {
  [DivinationType.LOVE]: {
    name: '恋爱运势',
    description: '感情问题、桃花运、关系发展',
    icon: '💕'
  },
  [DivinationType.CAREER]: {
    name: '事业运势', 
    description: '工作发展、职场关系、升职加薪',
    icon: '💼'
  },
  [DivinationType.WEALTH]: {
    name: '财运测算',
    description: '财富机会、投资理财、收入状况',
    icon: '💰'
  },
  [DivinationType.HEALTH]: {
    name: '健康运势',
    description: '身体状况、健康建议、疾病预防',
    icon: '🏥'
  },
  [DivinationType.GENERAL]: {
    name: '综合运势',
    description: '整体运程、人生指导、全面分析',
    icon: '🌟'
  },
  [DivinationType.DECISION]: {
    name: '决策指导',
    description: '重要选择、决策建议、方向指引',
    icon: '🎯'
  }
};

/**
 * 获取所有塔罗牌
 */
export function getAllTarotCards(): TarotCardInfo[] {
  return [
    ...Object.values(MAJOR_ARCANA),
    ...Object.values(MINOR_ARCANA)
  ];
}

/**
 * 根据ID获取塔罗牌信息
 */
export function getTarotCardById(id: string): TarotCardInfo | null {
  const allCards = getAllTarotCards();
  return allCards.find(card => card.card.id === id) || null;
}

/**
 * 随机抽取塔罗牌
 */
export function drawRandomCards(count: number): TarotCardInfo[] {
  const allCards = getAllTarotCards();
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * 生成塔罗解读
 */
export function generateTarotReading(
  cards: TarotCardInfo[],
  positions: any[],
  divinationType: DivinationType
): string {
  // 这里可以实现更复杂的AI解读逻辑
  return `根据抽取到的${cards.length}张塔罗牌，宇宙为你传达了重要的指引...`;
}