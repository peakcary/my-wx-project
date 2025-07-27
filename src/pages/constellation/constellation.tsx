import React, { useState, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { 
  ConstellationType, 
  ConstellationSelectionState, 
  ConstellationAnalysis 
} from '../../types/constellation';
import { 
  getConstellationInfo, 
  generateTodayFortune,
  getConstellationChineseName
} from '../../utils/constellationData';
import ConstellationSelector from '../../components/ConstellationSelector';
import ConstellationAnalysisComponent from '../../components/ConstellationAnalysis';
import './constellation.scss';

export default function ConstellationPage() {
  // 页面状态管理
  const [pageState, setPageState] = useState<ConstellationSelectionState>({
    selectedConstellation: undefined,
    isAnalyzing: false,
    analysisResult: undefined,
    showResult: false
  });

  // 按钮抖动状态
  const [isShaking, setIsShaking] = useState(false);

  // 页面加载
  useLoad(() => {
    console.log('星座分析页面加载');
  });

  // 处理星座选择
  const handleConstellationSelect = useCallback((constellation: ConstellationType) => {
    setPageState(prev => ({
      ...prev,
      selectedConstellation: constellation,
      isAnalyzing: false,
      showResult: false
    }));
  }, []);

  // 开始分析
  const handleStartAnalysis = useCallback(() => {
    if (!pageState.selectedConstellation) {
      // 触发抖动动画提示用户选择星座
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setPageState(prev => ({ ...prev, isAnalyzing: true }));

    // 模拟分析过程
    setTimeout(() => {
      const constellationInfo = getConstellationInfo(pageState.selectedConstellation!);
      if (!constellationInfo) return;

      // 生成个性化运势
      const personalizedFortune = generateTodayFortune(pageState.selectedConstellation!);
      
      // 创建分析结果
      const analysisResult: ConstellationAnalysis = {
        selectedConstellation: pageState.selectedConstellation!,
        analysisDate: new Date().toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        constellationInfo: {
          ...constellationInfo,
          todayFortune: personalizedFortune
        },
        personalizedAdvice: generatePersonalizedAdvice(pageState.selectedConstellation!),
        compatibilityAnalysis: {
          bestMatch: constellationInfo.bestMatches[0],
          challengingMatch: constellationInfo.worstMatches[0]
        }
      };

      setPageState(prev => ({
        ...prev,
        isAnalyzing: false,
        analysisResult,
        showResult: true
      }));
    }, 2000); // 2秒分析时间
  }, [pageState.selectedConstellation]);

  // 返回选择页面
  const handleBackToSelection = useCallback(() => {
    setPageState(prev => ({
      ...prev,
      showResult: false,
      analysisResult: undefined
    }));
  }, []);

  // 重新选择星座
  const handleReselect = useCallback(() => {
    setPageState({
      selectedConstellation: undefined,
      isAnalyzing: false,
      analysisResult: undefined,
      showResult: false
    });
  }, []);

  // 生成个性化建议
  const generatePersonalizedAdvice = (constellation: ConstellationType): string => {
    const adviceMap = {
      [ConstellationType.ARIES]: '作为充满活力的白羊座，建议你在追求目标时保持冷静思考，将你的热情与智慧相结合。',
      [ConstellationType.TAURUS]: '稳重的金牛座，你的坚持是优势，但也要学会在适当时候拥抱变化，保持开放心态。',
      [ConstellationType.GEMINI]: '机智的双子座，你的多才多艺让你在各个领域都能发光，专注于感兴趣的领域会让你更加出色。',
      [ConstellationType.CANCER]: '温柔的巨蟹座，你的同理心是珍贵的礼物，学会设定健康的情感边界会让你更加强大。',
      [ConstellationType.LEO]: '自信的狮子座，你天生的领导魅力会带领你走向成功，记住真正的王者懂得谦逊。',
      [ConstellationType.VIRGO]: '细致的处女座，你的完美主义让你在细节上无可挑剔，学会接受不完美会让你更加快乐。',
      [ConstellationType.LIBRA]: '优雅的天秤座，你的平衡感让你在人际关系中游刃有余，相信自己的判断力会让你更加自信。',
      [ConstellationType.SCORPIO]: '深刻的天蝎座，你的洞察力让你能看透事物本质，学会信任会让你的关系更加深入。',
      [ConstellationType.SAGITTARIUS]: '自由的射手座，你的乐观精神感染着周围的人，承担适当的责任会让你更加成熟。',
      [ConstellationType.CAPRICORN]: '务实的摩羯座，你的毅力是成功的基石，记得在追求目标的路上也要享受过程。',
      [ConstellationType.AQUARIUS]: '独特的水瓶座，你的创新思维能够引领潮流，与人建立更深的情感联系会让你更加圆满。',
      [ConstellationType.PISCES]: '感性的双鱼座，你的直觉和创造力是天赋，学会将梦想付诸实践会让你的人生更加精彩。'
    };

    return adviceMap[constellation] || '相信自己的内在力量，你拥有独特的天赋和潜能。';
  };

  // 如果正在分析，显示加载页面
  if (pageState.isAnalyzing) {
    return (
      <View className="constellation-page analyzing">
        <View className="analysis-loading">
          <View className="loading-icon">
            <Text className="stars">✨</Text>
            <Text className="crystal">🔮</Text>
            <Text className="stars">✨</Text>
          </View>
          
          <Text className="loading-title">正在分析你的星座</Text>
          <Text className="loading-subtitle">解读星象密码，探索性格奥秘...</Text>
          
          <View className="loading-progress">
            <View className="progress-bar">
              <View className="progress-fill"></View>
            </View>
            <Text className="progress-text">分析中...</Text>
          </View>
          
          <View className="loading-tips">
            <Text className="tip-text">💫 星星正在为你排列最准确的分析</Text>
            <Text className="tip-text">🌙 月亮正在照亮你的性格特质</Text>
            <Text className="tip-text">☀️ 太阳正在揭示你的内在力量</Text>
          </View>
        </View>
      </View>
    );
  }

  // 如果显示结果，渲染分析结果
  if (pageState.showResult && pageState.analysisResult) {
    return (
      <View className="constellation-page result">
        <ConstellationAnalysisComponent
          analysis={pageState.analysisResult}
          onBack={handleReselect}
        />
      </View>
    );
  }

  // 默认显示选择页面
  return (
    <View className="constellation-page selection">
      <View className="page-header">
        <Text className="page-title">🌟 星座分析</Text>
        <Text className="page-subtitle">选择你的星座开启专属分析</Text>
      </View>

      <View className="constellation-selector-wrapper">
        <ConstellationSelector
          selectedConstellation={pageState.selectedConstellation}
          onSelect={handleConstellationSelect}
          mode="grid"
          showDescription={false}
        />
      </View>

      <View className="bottom-section">
        {pageState.selectedConstellation ? (
          <View className="selection-info">
            <Text className="selected-text">
              已选择：{getConstellationChineseName(pageState.selectedConstellation)}
            </Text>
          </View>
        ) : (
          <View className="selection-hint">
            <Text className="hint-text">👆 请选择你的星座</Text>
          </View>
        )}
        
        <View 
          className={`start-button ${isShaking ? 'shaking' : ''}`}
          onClick={handleStartAnalysis}
        >
          <Text className="button-text">✨ 开始分析 ✨</Text>
        </View>
      </View>
    </View>
  );
}