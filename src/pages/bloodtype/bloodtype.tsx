import React, { useState, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { BloodType, BloodTypeAnalysis, BloodTypeSelectionState } from '../../types/bloodType';
import { getBloodTypeInfo, getBloodTypeChineseName, generateTodayTips } from '../../utils/bloodTypeData';
import BloodTypeSelector from '../../components/BloodTypeSelector';
import BloodTypeAnalysisComponent from '../../components/BloodTypeAnalysis';
import './bloodtype.scss';

export default function BloodTypePage() {
  const [state, setState] = useState<BloodTypeSelectionState>({
    isAnalyzing: false,
    showResult: false
  });

  const [isShaking, setIsShaking] = useState(false);

  const handleBloodTypeSelect = useCallback((bloodType: BloodType) => {
    setState(prev => ({
      ...prev,
      selectedBloodType: bloodType
    }));
  }, []);

  const handleStartAnalysis = useCallback(() => {
    if (!state.selectedBloodType) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setState(prev => ({ ...prev, isAnalyzing: true }));

    setTimeout(() => {
      const bloodTypeInfo = getBloodTypeInfo(state.selectedBloodType!);
      if (!bloodTypeInfo) return;

      const bestMatch = bloodTypeInfo.bestMatches[0];
      const challengingMatch = bloodTypeInfo.worstMatches[0];
      const todayTips = generateTodayTips(state.selectedBloodType!);

      const analysis: BloodTypeAnalysis = {
        selectedBloodType: state.selectedBloodType!,
        analysisDate: new Date().toLocaleDateString('zh-CN'),
        bloodTypeInfo,
        personalizedAdvice: `作为${bloodTypeInfo.basic.name}的你，${bloodTypeInfo.lifeAdvice}`,
        compatibilityAnalysis: {
          bestMatch,
          challengingMatch
        },
        todayTips
      };

      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        showResult: true,
        analysisResult: analysis
      }));
    }, 3000);
  }, [state.selectedBloodType]);

  const handleBackToSelection = useCallback(() => {
    setState({
      isAnalyzing: false,
      showResult: false
    });
  }, []);

  if (state.showResult && state.analysisResult) {
    return (
      <BloodTypeAnalysisComponent
        analysis={state.analysisResult}
        onBack={handleBackToSelection}
      />
    );
  }

  if (state.isAnalyzing) {
    return (
      <View className="bloodtype-page analyzing">
        <View className="analysis-loading">
          <View className="loading-icon">
            <Text className="drops">💧</Text>
            <Text className="microscope">🔬</Text>
            <Text className="drops">💧</Text>
          </View>
          
          <Text className="loading-title">血型分析中</Text>
          <Text className="loading-subtitle">正在为您解读血型密码...</Text>
          
          <View className="loading-progress">
            <View className="progress-bar">
              <View className="progress-fill"></View>
            </View>
            <Text className="progress-text">分析进度 100%</Text>
          </View>
          
          <View className="loading-tips">
            <Text className="tip-text">📊 分析您的性格特征</Text>
            <Text className="tip-text">💼 评估职业倾向</Text>
            <Text className="tip-text">💕 计算血型配对指数</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="bloodtype-page selection">
      <View className="page-header">
        <Text className="page-title">血型分析</Text>
        <Text className="page-subtitle">探索血型背后的性格密码</Text>
      </View>
      
      <View className="bloodtype-selector-wrapper">
        <BloodTypeSelector
          selectedBloodType={state.selectedBloodType}
          onSelect={handleBloodTypeSelect}
          mode="grid"
        />
      </View>
      
      <View className="bottom-section">
        {state.selectedBloodType ? (
          <View className="selection-info">
            <Text className="selected-text">
              已选择: {getBloodTypeChineseName(state.selectedBloodType)}
            </Text>
          </View>
        ) : (
          <View className="selection-hint">
            <Text className="hint-text">请选择您的血型开始分析</Text>
          </View>
        )}
        
        <View 
          className={`start-button ${isShaking ? 'shaking' : ''}`}
          onClick={handleStartAnalysis}
        >
          <Text className="button-text">开始分析</Text>
        </View>
      </View>
    </View>
  );
}