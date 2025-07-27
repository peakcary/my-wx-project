import React, { useState, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { 
  TarotState, 
  DivinationType, 
  SpreadType, 
  TarotReading, 
  TarotPosition,
  DrawnTarotCard 
} from '../../types/tarot';
import { 
  drawRandomCards, 
  TAROT_SPREADS, 
  DIVINATION_TYPES,
  generateTarotReading
} from '../../utils/tarotData';
import TarotCardDraw from '../../components/TarotCardDraw';
import TarotReadingComponent from '../../components/TarotReading';
import './tarot.scss';

export default function TarotPage() {
  const [state, setState] = useState<TarotState>({
    isDrawing: false,
    isReading: false,
    showResult: false
  });

  const handleDivinationSelect = useCallback((type: DivinationType) => {
    setState(prev => ({
      ...prev,
      selectedDivination: type
    }));
  }, []);

  const handleSpreadSelect = useCallback((type: SpreadType) => {
    setState(prev => ({
      ...prev,
      selectedSpread: type
    }));
  }, []);

  const handleQuestionChange = useCallback((question: string) => {
    setState(prev => ({
      ...prev,
      question
    }));
  }, []);

  const handleStartDraw = useCallback(() => {
    if (!state.selectedDivination || !state.selectedSpread) {
      return;
    }

    setState(prev => ({ ...prev, isDrawing: true }));

    // 模拟抽牌过程
    setTimeout(() => {
      setState(prev => ({ ...prev, isDrawing: false, isReading: true }));
      
      // 生成塔罗解读
      setTimeout(() => {
        const spread = TAROT_SPREADS[state.selectedSpread!];
        const cardCount = spread.positions.length;
        const drawnCardInfos = drawRandomCards(cardCount);
        
        // 为每张牌随机分配正位或逆位
        const drawnCards: DrawnTarotCard[] = drawnCardInfos.map((cardInfo, index) => ({
          cardInfo,
          position: Math.random() > 0.7 ? TarotPosition.REVERSED : TarotPosition.UPRIGHT,
          positionInSpread: index
        }));

        // 生成幸运数字和颜色
        const luckyNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * 49) + 1);
        const luckyColors = ['紫色', '金色', '银色', '蓝色', '绿色'].slice(0, 2);
        
        // 生成个性化解读
        const reading: TarotReading = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          question: state.question,
          divinationType: state.selectedDivination!,
          spread,
          drawnCards,
          interpretation: {
            overall: generateOverallInterpretation(drawnCards, state.selectedDivination!),
            detailed: drawnCards.map(card => generateCardInterpretation(card)),
            advice: generateAdvice(drawnCards, state.selectedDivination!),
            timeframe: generateTimeframe(spread.type),
            energy: generateEnergyReading(drawnCards)
          },
          luckyNumbers,
          luckyColors,
          warnings: generateWarnings(drawnCards)
        };

        setState(prev => ({
          ...prev,
          isReading: false,
          showResult: true,
          currentReading: reading
        }));
      }, 3000);
    }, 2000);
  }, [state.selectedDivination, state.selectedSpread, state.question]);

  const handleBackToSelection = useCallback(() => {
    setState({
      isDrawing: false,
      isReading: false,
      showResult: false
    });
  }, []);

  // 生成整体解读
  const generateOverallInterpretation = (cards: DrawnTarotCard[], type: DivinationType): string => {
    const typeNames = {
      love: '爱情',
      career: '事业',
      wealth: '财运',
      health: '健康',
      general: '人生',
      decision: '决策'
    };
    
    const reversedCount = cards.filter(card => card.position === TarotPosition.REVERSED).length;
    const uprichtCount = cards.length - reversedCount;
    
    let interpretation = `通过这次${typeNames[type]}占卜，宇宙为你揭示了重要的信息。`;
    
    if (uprichtCount > reversedCount) {
      interpretation += '整体能量流向积极正面，你正处在一个有利的时期。';
    } else if (reversedCount > uprichtCount) {
      interpretation += '当前面临一些挑战，但这也是成长和转变的机会。';
    } else {
      interpretation += '你正处在一个平衡的状态，需要做出重要选择。';
    }

    return interpretation + '塔罗牌建议你保持开放的心态，相信内在的智慧指引。';
  };

  // 生成单牌解读
  const generateCardInterpretation = (drawnCard: DrawnTarotCard): string => {
    const meaning = drawnCard.position === TarotPosition.REVERSED ? 
      drawnCard.cardInfo.meaning.reversed : 
      drawnCard.cardInfo.meaning.upright;
    
    return `${drawnCard.cardInfo.card.name}${
      drawnCard.position === TarotPosition.REVERSED ? '(逆位)' : ''
    }告诉我们：${meaning.general}`;
  };

  // 生成建议
  const generateAdvice = (cards: DrawnTarotCard[], type: DivinationType): string => {
    const advices = cards.map(card => {
      const meaning = card.position === TarotPosition.REVERSED ? 
        card.cardInfo.meaning.reversed : 
        card.cardInfo.meaning.upright;
      return meaning.advice;
    });
    
    return `基于你抽到的塔罗牌，宇宙建议你：${advices.join('，')}。记住，塔罗牌只是指引，最终的选择权在你手中。`;
  };

  // 生成时间框架
  const generateTimeframe = (spreadType: SpreadType): string => {
    const timeframes = {
      single: '未来1-3天',
      three_card: '未来1-3个月',
      cross: '未来3-6个月',
      celtic: '未来6-12个月'
    };
    
    return timeframes[spreadType] || '未来一段时间';
  };

  // 生成能量解读
  const generateEnergyReading = (cards: DrawnTarotCard[]): string => {
    const majorCount = cards.filter(card => card.cardInfo.card.suit === 'major').length;
    const total = cards.length;
    
    if (majorCount / total > 0.5) {
      return '强大的宇宙能量围绕着你，重大变化即将来临';
    } else {
      return '日常生活的能量平稳流动，适合稳步前进';
    }
  };

  // 生成注意事项
  const generateWarnings = (cards: DrawnTarotCard[]): string[] => {
    const warnings: string[] = [];
    const reversedCards = cards.filter(card => card.position === TarotPosition.REVERSED);
    
    if (reversedCards.length > cards.length / 2) {
      warnings.push('当前阶段需要更多耐心，避免急躁行事');
    }
    
    // 检查特定牌的警告
    cards.forEach(card => {
      if (card.cardInfo.card.name === '塔' || card.cardInfo.card.name === '死神') {
        warnings.push('即将面临重大变化，做好心理准备');
      }
    });
    
    return warnings;
  };

  if (state.showResult && state.currentReading) {
    return (
      <TarotReadingComponent
        reading={state.currentReading}
        onBack={handleBackToSelection}
      />
    );
  }

  if (state.isDrawing || state.isReading) {
    return (
      <View className="tarot-page loading">
        <View className="loading-container">
          <View className="loading-icon">
            <Text className="mystical-symbols">🔮</Text>
            <Text className="cards">🃏</Text>
            <Text className="mystical-symbols">✨</Text>
          </View>
          
          <Text className="loading-title">
            {state.isDrawing ? '正在抽取塔罗牌' : '宇宙正在解读'}
          </Text>
          <Text className="loading-subtitle">
            {state.isDrawing ? '请保持专注，让心灵与宇宙连接...' : '塔罗牌的智慧正在显现...'}
          </Text>
          
          <View className="loading-progress">
            <View className="progress-bar">
              <View className="progress-fill"></View>
            </View>
            <Text className="progress-text">解读中 100%</Text>
          </View>
          
          <View className="mystical-tips">
            <Text className="tip-text">🌙 月亮指引着神秘的力量</Text>
            <Text className="tip-text">⭐ 星辰见证着你的疑问</Text>
            <Text className="tip-text">🔯 塔罗揭示着宇宙的奥秘</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="tarot-page selection">
      <View className="page-header">
        <Text className="page-title">塔罗牌占卜</Text>
        <Text className="page-subtitle">倾听宇宙的声音，探索内心的智慧</Text>
      </View>
      
      <View className="card-draw-wrapper">
        <TarotCardDraw
          selectedDivination={state.selectedDivination}
          selectedSpread={state.selectedSpread}
          question={state.question}
          onDivinationSelect={handleDivinationSelect}
          onSpreadSelect={handleSpreadSelect}
          onQuestionChange={handleQuestionChange}
          onStartDraw={handleStartDraw}
        />
      </View>
    </View>
  );
}