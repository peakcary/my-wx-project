import React from 'react';
import { View, Text } from '@tarojs/components';
import { ConstellationAnalysis, FortuneType } from '../../types/constellation';
import { getConstellationChineseName } from '../../utils/constellationData';
import './index.scss';

interface ConstellationAnalysisProps {
  analysis: ConstellationAnalysis;
  onBack: () => void;
}

export default function ConstellationAnalysisComponent({
  analysis,
  onBack
}: ConstellationAnalysisProps) {
  
  const { constellationInfo } = analysis;
  const { basic, personality, todayFortune, bestMatches, worstMatches, strengths, weaknesses, lifeAdvice } = constellationInfo;

  // 运势类型对应的中文名称和颜色
  const fortuneTypeConfig = {
    [FortuneType.OVERALL]: { name: '综合运势', color: '#6c63ff', icon: '🌟' },
    [FortuneType.LOVE]: { name: '爱情运势', color: '#ff6b6b', icon: '💕' },
    [FortuneType.CAREER]: { name: '事业运势', color: '#4ecdc4', icon: '💼' },
    [FortuneType.WEALTH]: { name: '财富运势', color: '#ffe66d', icon: '💰' },
    [FortuneType.HEALTH]: { name: '健康运势', color: '#95e1d3', icon: '🍀' }
  };

  // 渲染星级评分
  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text key={index} className={`star ${index < score ? 'filled' : ''}`}>
        ★
      </Text>
    ));
  };

  // 渲染匹配度
  const renderMatchScore = (score: number) => {
    const width = `${score}%`;
    return (
      <View className="match-score">
        <View className="score-bg">
          <View className="score-fill" style={{ width }}></View>
        </View>
        <Text className="score-text">{score}%</Text>
      </View>
    );
  };

  return (
    <View className="constellation-analysis">
      {/* 头部信息 */}
      <View className="analysis-header">
        <View className="header-background">
          <View className="constellation-info">
            <Text className="constellation-icon">{basic.icon}</Text>
            <View className="constellation-text">
              <Text className="constellation-name">{basic.name}</Text>
              <Text className="constellation-english">{basic.englishName}</Text>
              <Text className="constellation-date">{basic.dateRange}</Text>
              <Text className="constellation-element">{basic.element} • 守护星: {basic.rulingPlanet}</Text>
            </View>
          </View>
          
          <View className="back-button" onClick={onBack}>
            <Text className="back-text">← 返回</Text>
          </View>
        </View>
      </View>

      <View className="analysis-content">
        {/* 性格特征 */}
        <View className="analysis-section personality">
          <View className="section-header">
            <Text className="section-title">🎭 性格特征</Text>
          </View>
          
          <View className="personality-content">
            <Text className="personality-description">{personality.description}</Text>
            
            <View className="traits-container">
              <View className="traits-group positive">
                <Text className="traits-title">✨ 积极特质</Text>
                <View className="traits-list">
                  {personality.positive.map((trait, index) => (
                    <Text key={index} className="trait-tag positive">{trait}</Text>
                  ))}
                </View>
              </View>
              
              <View className="traits-group negative">
                <Text className="traits-title">⚠️ 注意特质</Text>
                <View className="traits-list">
                  {personality.negative.map((trait, index) => (
                    <Text key={index} className="trait-tag negative">{trait}</Text>
                  ))}
                </View>
              </View>
            </View>
            
            <View className="keywords">
              <Text className="keywords-title">🔑 关键词：</Text>
              <View className="keywords-list">
                {personality.keyWords.map((keyword, index) => (
                  <Text key={index} className="keyword-tag">{keyword}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* 今日运势 */}
        <View className="analysis-section fortune">
          <View className="section-header">
            <Text className="section-title">🔮 今日运势</Text>
            <Text className="section-subtitle">{analysis.analysisDate}</Text>
          </View>
          
          <View className="fortune-grid">
            {todayFortune.map((fortune) => {
              const config = fortuneTypeConfig[fortune.type];
              return (
                <View key={fortune.type} className="fortune-card">
                  <View className="fortune-header">
                    <Text className="fortune-icon">{config.icon}</Text>
                    <Text className="fortune-name">{config.name}</Text>
                  </View>
                  
                  <View className="fortune-score">
                    {renderStars(fortune.score)}
                  </View>
                  
                  <Text className="fortune-description">{fortune.description}</Text>
                  <Text className="fortune-advice">{fortune.advice}</Text>
                  
                  {fortune.luckyColor && (
                    <View className="fortune-extra">
                      <Text className="extra-item">幸运色: {fortune.luckyColor}</Text>
                      {fortune.luckyNumber && (
                        <Text className="extra-item">幸运数字: {fortune.luckyNumber}</Text>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* 星座配对 */}
        <View className="analysis-section compatibility">
          <View className="section-header">
            <Text className="section-title">💝 星座配对</Text>
          </View>
          
          <View className="compatibility-content">
            <View className="matches-group best">
              <Text className="matches-title">✨ 最佳配对</Text>
              {bestMatches.slice(0, 3).map((match, index) => (
                <View key={index} className="match-item">
                  <View className="match-header">
                    <Text className="match-name">
                      {getConstellationChineseName(match.constellation)}
                    </Text>
                    {renderMatchScore(match.matchScore)}
                  </View>
                  <Text className="match-description">{match.description}</Text>
                </View>
              ))}
            </View>
            
            <View className="matches-group challenging">
              <Text className="matches-title">⚡ 挑战配对</Text>
              {worstMatches.slice(0, 2).map((match, index) => (
                <View key={index} className="match-item">
                  <View className="match-header">
                    <Text className="match-name">
                      {getConstellationChineseName(match.constellation)}
                    </Text>
                    {renderMatchScore(match.matchScore)}
                  </View>
                  <Text className="match-description">{match.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 优势与劣势 */}
        <View className="analysis-section strengths-weaknesses">
          <View className="section-header">
            <Text className="section-title">⚖️ 优势与挑战</Text>
          </View>
          
          <View className="sw-content">
            <View className="sw-group strengths">
              <Text className="sw-title">💪 你的优势</Text>
              <View className="sw-list">
                {strengths.map((strength, index) => (
                  <View key={index} className="sw-item">
                    <Text className="sw-bullet">•</Text>
                    <Text className="sw-text">{strength}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View className="sw-group weaknesses">
              <Text className="sw-title">🎯 成长空间</Text>
              <View className="sw-list">
                {weaknesses.map((weakness, index) => (
                  <View key={index} className="sw-item">
                    <Text className="sw-bullet">•</Text>
                    <Text className="sw-text">{weakness}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* 人生建议 */}
        <View className="analysis-section life-advice">
          <View className="section-header">
            <Text className="section-title">🌟 人生建议</Text>
          </View>
          
          <View className="advice-content">
            <Text className="advice-text">{lifeAdvice}</Text>
            
            {analysis.personalizedAdvice && (
              <View className="personalized-advice">
                <Text className="advice-label">💡 专属建议：</Text>
                <Text className="advice-text">{analysis.personalizedAdvice}</Text>
              </View>
            )}
          </View>
        </View>

        {/* 底部操作 */}
        <View className="analysis-actions">
          <View className="action-button primary" onClick={onBack}>
            <Text className="action-text">🔄 重新选择</Text>
          </View>
          
          <View className="action-button secondary">
            <Text className="action-text">💫 分享结果</Text>
          </View>
        </View>
      </View>
    </View>
  );
}