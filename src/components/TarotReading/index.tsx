import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { TarotReading } from '../../types/tarot';
import { DIVINATION_TYPES } from '../../utils/tarotData';
import './index.scss';

interface TarotReadingProps {
  reading: TarotReading;
  onBack: () => void;
}

export default function TarotReadingComponent({ reading, onBack }: TarotReadingProps) {
  const divinationConfig = DIVINATION_TYPES[reading.divinationType];

  return (
    <View className="tarot-reading">
      <View className="reading-content">
        {/* 头部信息 */}
        <View className="reading-header">
          <View className="divination-info">
            <Text className="divination-icon">{divinationConfig.icon}</Text>
            <Text className="divination-name">{divinationConfig.name}</Text>
          </View>
          <View className="spread-info">
            <Text className="spread-name">{reading.spread.name}</Text>
            <Text className="reading-time">{new Date(reading.timestamp).toLocaleString()}</Text>
          </View>
        </View>

        {/* 问题显示 */}
        {reading.question && (
          <View className="question-section">
            <View className="question-card">
              <Text className="question-label">🔮 你的问题</Text>
              <Text className="question-text">{reading.question}</Text>
            </View>
          </View>
        )}

        {/* 抽到的牌 */}
        <View className="cards-section">
          <View className="section-header">
            <Text className="section-title">🃏 你的塔罗牌</Text>
          </View>
          <View className="cards-spread">
            {reading.drawnCards.map((drawnCard, index) => {
              const position = reading.spread.positions[index];
              const isReversed = drawnCard.position === 'reversed';
              const meaning = isReversed ? 
                drawnCard.cardInfo.meaning.reversed : 
                drawnCard.cardInfo.meaning.upright;
              
              return (
                <View key={index} className="card-item">
                  <View className="card-position">
                    <Text className="position-name">{position.name}</Text>
                    <Text className="position-meaning">{position.meaning}</Text>
                  </View>
                  
                  <View className={`tarot-card ${isReversed ? 'reversed' : ''}`}>
                    <Text className="card-image">{drawnCard.cardInfo.card.image}</Text>
                    <View className="card-info">
                      <Text className="card-name">
                        {drawnCard.cardInfo.card.name}
                        {isReversed && ' (逆位)'}
                      </Text>
                      <View className="card-keywords">
                        {drawnCard.cardInfo.card.keywords.map((keyword, idx) => (
                          <Text key={idx} className="keyword">{keyword}</Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  
                  <View className="card-meaning">
                    <Text className="meaning-title">牌意解读</Text>
                    <Text className="meaning-general">{meaning.general}</Text>
                    
                    <View className="meaning-details">
                      {reading.divinationType === 'love' && (
                        <View className="detail-item">
                          <Text className="detail-label">💕 感情</Text>
                          <Text className="detail-text">{meaning.love}</Text>
                        </View>
                      )}
                      {reading.divinationType === 'career' && (
                        <View className="detail-item">
                          <Text className="detail-label">💼 事业</Text>
                          <Text className="detail-text">{meaning.career}</Text>
                        </View>
                      )}
                      {reading.divinationType === 'wealth' && (
                        <View className="detail-item">
                          <Text className="detail-label">💰 财运</Text>
                          <Text className="detail-text">{meaning.wealth}</Text>
                        </View>
                      )}
                      {reading.divinationType === 'health' && (
                        <View className="detail-item">
                          <Text className="detail-label">🏥 健康</Text>
                          <Text className="detail-text">{meaning.health}</Text>
                        </View>
                      )}
                      <View className="detail-item">
                        <Text className="detail-label">💫 建议</Text>
                        <Text className="detail-text">{meaning.advice}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* 整体解读 */}
        <View className="interpretation-section">
          <View className="section-header">
            <Text className="section-title">🌟 整体解读</Text>
          </View>
          <View className="interpretation-content">
            <View className="interpretation-card">
              <Text className="interpretation-text">{reading.interpretation.overall}</Text>
            </View>
            
            <View className="energy-info">
              <Text className="energy-label">当前能量状态</Text>
              <Text className="energy-text">{reading.interpretation.energy}</Text>
            </View>
            
            <View className="timeframe-info">
              <Text className="timeframe-label">时间框架</Text>
              <Text className="timeframe-text">{reading.interpretation.timeframe}</Text>
            </View>
          </View>
        </View>

        {/* 宇宙建议 */}
        <View className="advice-section">
          <View className="section-header">
            <Text className="section-title">✨ 宇宙的建议</Text>
          </View>
          <View className="advice-content">
            <View className="advice-card">
              <Text className="advice-text">{reading.interpretation.advice}</Text>
            </View>
          </View>
        </View>

        {/* 幸运元素 */}
        <View className="lucky-section">
          <View className="section-header">
            <Text className="section-title">🍀 幸运元素</Text>
          </View>
          <View className="lucky-content">
            <View className="lucky-numbers">
              <Text className="lucky-label">幸运数字</Text>
              <View className="numbers-grid">
                {reading.luckyNumbers.map((number, index) => (
                  <View key={index} className="number-item">
                    <Text className="number-text">{number}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View className="lucky-colors">
              <Text className="lucky-label">幸运颜色</Text>
              <View className="colors-grid">
                {reading.luckyColors.map((color, index) => (
                  <View key={index} className="color-item">
                    <Text className="color-text">{color}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* 注意事项 */}
        {reading.warnings && reading.warnings.length > 0 && (
          <View className="warnings-section">
            <View className="section-header">
              <Text className="section-title">⚠️ 需要注意</Text>
            </View>
            <View className="warnings-content">
              {reading.warnings.map((warning, index) => (
                <View key={index} className="warning-item">
                  <Text className="warning-text">• {warning}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 牌面故事 */}
        <View className="story-section">
          <View className="section-header">
            <Text className="section-title">📖 塔罗的故事</Text>
          </View>
          <View className="story-content">
            {reading.drawnCards.map((drawnCard, index) => (
              <View key={index} className="story-item">
                <Text className="story-title">{drawnCard.cardInfo.card.name}</Text>
                <Text className="story-text">{drawnCard.cardInfo.story}</Text>
                <Text className="symbolism-text">
                  <Text className="symbolism-label">象征意义：</Text>
                  {drawnCard.cardInfo.symbolism}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 底部按钮 */}
      <View className="reading-footer">
        <View className="back-button" onClick={onBack}>
          <Text className="button-text">重新占卜</Text>
        </View>
      </View>
    </View>
  );
}