import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { DivinationType, SpreadType } from '../../types/tarot';
import { DIVINATION_TYPES, TAROT_SPREADS } from '../../utils/tarotData';
import './index.scss';

interface TarotCardDrawProps {
  selectedDivination?: DivinationType;
  selectedSpread?: SpreadType;
  question?: string;
  onDivinationSelect: (type: DivinationType) => void;
  onSpreadSelect: (type: SpreadType) => void;
  onQuestionChange: (question: string) => void;
  onStartDraw: () => void;
}

export default function TarotCardDraw({
  selectedDivination,
  selectedSpread,
  question,
  onDivinationSelect,
  onSpreadSelect,
  onQuestionChange,
  onStartDraw
}: TarotCardDrawProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isShaking, setIsShaking] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartDraw = () => {
    if (!selectedDivination || !selectedSpread) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    onStartDraw();
  };

  return (
    <View className="tarot-card-draw">
      {/* 步骤指示器 */}
      <View className="step-indicator">
        {[1, 2, 3].map((step) => (
          <View
            key={step}
            className={`step-item ${currentStep >= step ? 'active' : ''}`}
          >
            <View className="step-number">{step}</View>
            <Text className="step-label">
              {step === 1 ? '选择占卜类型' : step === 2 ? '选择牌阵' : '许下心愿'}
            </Text>
          </View>
        ))}
      </View>

      {/* 第一步：选择占卜类型 */}
      {currentStep === 1 && (
        <View className="step-content">
          <View className="step-title">
            <Text className="title-text">🔮 选择你想要占卜的类型</Text>
            <Text className="subtitle-text">宇宙将为你指引方向</Text>
          </View>
          
          <View className="divination-grid">
            {Object.entries(DIVINATION_TYPES).map(([type, config]) => (
              <View
                key={type}
                className={`divination-card ${
                  selectedDivination === type ? 'selected' : ''
                }`}
                onClick={() => onDivinationSelect(type as DivinationType)}
              >
                <Text className="card-icon">{config.icon}</Text>
                <Text className="card-title">{config.name}</Text>
                <Text className="card-description">{config.description}</Text>
              </View>
            ))}
          </View>

          <View className="step-actions">
            <View 
              className={`next-button ${selectedDivination ? '' : 'disabled'}`}
              onClick={selectedDivination ? handleNext : undefined}
            >
              <Text className="button-text">下一步</Text>
            </View>
          </View>
        </View>
      )}

      {/* 第二步：选择牌阵 */}
      {currentStep === 2 && (
        <View className="step-content">
          <View className="step-title">
            <Text className="title-text">🃏 选择塔罗牌阵</Text>
            <Text className="subtitle-text">不同牌阵提供不同深度的洞察</Text>
          </View>
          
          <View className="spread-list">
            {Object.entries(TAROT_SPREADS).map(([type, spread]) => (
              <View
                key={type}
                className={`spread-card ${
                  selectedSpread === type ? 'selected' : ''
                }`}
                onClick={() => onSpreadSelect(type as SpreadType)}
              >
                <View className="spread-header">
                  <Text className="spread-name">{spread.name}</Text>
                  <Text className="spread-count">
                    {spread.positions.length}张牌
                  </Text>
                </View>
                <Text className="spread-description">{spread.description}</Text>
                
                <View className="spread-positions">
                  {spread.positions.map((position, index) => (
                    <View key={index} className="position-item">
                      <Text className="position-name">{position.name}</Text>
                      <Text className="position-meaning">{position.meaning}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View className="step-actions">
            <View className="action-buttons">
              <View className="prev-button" onClick={handlePrevious}>
                <Text className="button-text">上一步</Text>
              </View>
              <View 
                className={`next-button ${selectedSpread ? '' : 'disabled'}`}
                onClick={selectedSpread ? handleNext : undefined}
              >
                <Text className="button-text">下一步</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 第三步：许下心愿 */}
      {currentStep === 3 && (
        <View className="step-content">
          <View className="step-title">
            <Text className="title-text">💫 许下你的心愿</Text>
            <Text className="subtitle-text">专注于你想要了解的问题</Text>
          </View>
          
          <View className="question-section">
            <View className="question-card">
              <Text className="question-label">你的问题（可选）</Text>
              <View className="question-input">
                <Text className="placeholder">
                  {question || '在心中默念你的问题，或者写下来...'}
                </Text>
              </View>
              <Text className="question-tip">
                💡 提示：越具体的问题，塔罗牌能给出越准确的指引
              </Text>
            </View>

            <View className="energy-circle">
              <View className="circle-inner">
                <Text className="energy-text">🌟</Text>
                <Text className="energy-label">集中你的意念</Text>
              </View>
            </View>
          </View>

          <View className="step-actions">
            <View className="action-buttons">
              <View className="prev-button" onClick={handlePrevious}>
                <Text className="button-text">上一步</Text>
              </View>
              <View 
                className={`start-button ${isShaking ? 'shaking' : ''}`}
                onClick={handleStartDraw}
              >
                <Text className="button-text">开始抽牌</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}