import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { BloodTypeAnalysis as BloodTypeAnalysisType } from '../../types/bloodType';
import './index.scss';

interface BloodTypeAnalysisProps {
  analysis: BloodTypeAnalysisType;
  onBack: () => void;
}

export default function BloodTypeAnalysis({ analysis, onBack }: BloodTypeAnalysisProps) {
  const { bloodTypeInfo, todayTips, compatibilityAnalysis } = analysis;
  const { basic, personality, health, career, learning, social, money, emotion, lifestyle, strengths, weaknesses, lifeAdvice, monthlyFortune } = bloodTypeInfo;

  return (
    <View className="bloodtype-analysis">
      <ScrollView className="analysis-content" scrollY>
        {/* 头部信息 */}
        <View className="analysis-header">
          <View className="bloodtype-icon">
            <Text className="icon-emoji">{basic.icon}</Text>
          </View>
          <View className="bloodtype-info">
            <Text className="bloodtype-name">{basic.name}</Text>
            <Text className="bloodtype-frequency">{basic.frequency}</Text>
          </View>
        </View>

        {/* 性格特征 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">🌟 性格特征</Text>
          </View>
          <View className="section-content">
            <Text className="description">{personality.description}</Text>
            
            <View className="trait-groups">
              <View className="trait-group positive">
                <Text className="group-title">✨ 优势特质</Text>
                <View className="trait-tags">
                  {personality.positive.map((trait, index) => (
                    <View key={index} className="trait-tag positive">
                      <Text className="trait-text">{trait}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View className="trait-group negative">
                <Text className="group-title">⚠️ 注意特质</Text>
                <View className="trait-tags">
                  {personality.negative.map((trait, index) => (
                    <View key={index} className="trait-tag negative">
                      <Text className="trait-text">{trait}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 工作与恋爱风格 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">💼 工作与恋爱</Text>
          </View>
          <View className="section-content">
            <View className="style-item">
              <Text className="style-label">工作风格</Text>
              <Text className="style-value">{personality.workStyle}</Text>
            </View>
            <View className="style-item">
              <Text className="style-label">恋爱风格</Text>
              <Text className="style-value">{personality.loveStyle}</Text>
            </View>
          </View>
        </View>

        {/* 健康建议 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">🏥 健康建议</Text>
          </View>
          <View className="section-content">
            <View className="health-group">
              <Text className="group-subtitle">饮食建议</Text>
              <View className="advice-list">
                {health.diet.map((item, index) => (
                  <Text key={index} className="advice-item">• {item}</Text>
                ))}
              </View>
            </View>
            
            <View className="health-group">
              <Text className="group-subtitle">运动建议</Text>
              <View className="advice-list">
                {health.exercise.map((item, index) => (
                  <Text key={index} className="advice-item">• {item}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* 职业倾向 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">🎯 职业倾向</Text>
          </View>
          <View className="section-content">
            <View className="career-info">
              <Text className="career-label">适合职业</Text>
              <View className="job-tags">
                {career.suitableJobs.map((job, index) => (
                  <View key={index} className="job-tag">
                    <Text className="job-text">{job}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View className="career-info">
              <Text className="career-label">工作环境</Text>
              <Text className="career-value">{career.workEnvironment}</Text>
            </View>
            
            <View className="career-info">
              <Text className="career-label">团队角色</Text>
              <Text className="career-value">{career.teamRole}</Text>
            </View>
          </View>
        </View>

        {/* 学习特征 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">📚 学习特征</Text>
          </View>
          <View className="section-content">
            <View className="feature-item">
              <Text className="feature-label">学习风格</Text>
              <Text className="feature-value">{learning.learningStyle}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">记忆类型</Text>
              <Text className="feature-value">{learning.memoryType}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">学习环境</Text>
              <Text className="feature-value">{learning.studyEnvironment}</Text>
            </View>
            <View className="tips-list">
              <Text className="tips-title">专注力提升建议</Text>
              {learning.concentrationTips.map((tip, index) => (
                <Text key={index} className="tip-item">• {tip}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* 社交特征 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">👥 社交特征</Text>
          </View>
          <View className="section-content">
            <View className="feature-item">
              <Text className="feature-label">沟通风格</Text>
              <Text className="feature-value">{social.communicationStyle}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">友谊模式</Text>
              <Text className="feature-value">{social.friendshipPattern}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">冲突解决</Text>
              <Text className="feature-value">{social.conflictResolution}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">社交能量</Text>
              <Text className="feature-value">{social.socialEnergy}</Text>
            </View>
          </View>
        </View>

        {/* 理财观念 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">💰 理财观念</Text>
          </View>
          <View className="section-content">
            <View className="feature-item">
              <Text className="feature-label">消费模式</Text>
              <Text className="feature-value">{money.spendingPattern}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">投资风格</Text>
              <Text className="feature-value">{money.investmentStyle}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">风险承受</Text>
              <Text className="feature-value">{money.riskTolerance}</Text>
            </View>
            <View className="tips-list">
              <Text className="tips-title">理财建议</Text>
              {money.budgetingTips.map((tip, index) => (
                <Text key={index} className="tip-item">• {tip}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* 情感特征 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">💖 情感特征</Text>
          </View>
          <View className="section-content">
            <View className="feature-item">
              <Text className="feature-label">情感表达</Text>
              <Text className="feature-value">{emotion.emotionalExpression}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">压力反应</Text>
              <Text className="feature-value">{emotion.stressResponse}</Text>
            </View>
            <View className="tips-list">
              <Text className="tips-title">应对策略</Text>
              {emotion.copingStrategies.map((strategy, index) => (
                <Text key={index} className="tip-item">• {strategy}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* 生活方式 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">🏠 生活方式</Text>
          </View>
          <View className="section-content">
            <View className="feature-item">
              <Text className="feature-label">时间管理</Text>
              <Text className="feature-value">{lifestyle.timeManagement}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">旅行风格</Text>
              <Text className="feature-value">{lifestyle.travelStyle}</Text>
            </View>
            <View className="feature-item">
              <Text className="feature-label">居家环境</Text>
              <Text className="feature-value">{lifestyle.homeEnvironment}</Text>
            </View>
            <View className="hobby-tags">
              <Text className="hobby-title">兴趣爱好</Text>
              <View className="tags-container">
                {lifestyle.hobbyPreferences.map((hobby, index) => (
                  <View key={index} className="hobby-tag">
                    <Text className="hobby-text">{hobby}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* 本月运势 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">🔮 本月运势</Text>
          </View>
          <View className="section-content">
            <View className="fortune-item overall">
              <Text className="fortune-label">整体运势</Text>
              <Text className="fortune-content">{monthlyFortune.overall}</Text>
            </View>
            <View className="fortune-grid">
              <View className="fortune-card">
                <Text className="fortune-icon">💼</Text>
                <Text className="fortune-title">事业</Text>
                <Text className="fortune-desc">{monthlyFortune.career}</Text>
              </View>
              <View className="fortune-card">
                <Text className="fortune-icon">💕</Text>
                <Text className="fortune-title">感情</Text>
                <Text className="fortune-desc">{monthlyFortune.love}</Text>
              </View>
              <View className="fortune-card">
                <Text className="fortune-icon">🏥</Text>
                <Text className="fortune-title">健康</Text>
                <Text className="fortune-desc">{monthlyFortune.health}</Text>
              </View>
              <View className="fortune-card">
                <Text className="fortune-icon">💎</Text>
                <Text className="fortune-title">财运</Text>
                <Text className="fortune-desc">{monthlyFortune.wealth}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 血型配对 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">💕 血型配对</Text>
          </View>
          <View className="section-content">
            <View className="match-item best">
              <View className="match-header">
                <Text className="match-type">最佳配对</Text>
                <Text className="match-bloodtype">{compatibilityAnalysis.bestMatch.bloodType}型</Text>
                <Text className="match-score">{compatibilityAnalysis.bestMatch.matchScore}%</Text>
              </View>
              <Text className="match-description">{compatibilityAnalysis.bestMatch.description}</Text>
            </View>
            
            <View className="match-item challenging">
              <View className="match-header">
                <Text className="match-type">需要磨合</Text>
                <Text className="match-bloodtype">{compatibilityAnalysis.challengingMatch.bloodType}型</Text>
                <Text className="match-score">{compatibilityAnalysis.challengingMatch.matchScore}%</Text>
              </View>
              <Text className="match-description">{compatibilityAnalysis.challengingMatch.description}</Text>
            </View>
          </View>
        </View>

        {/* 今日小贴士 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">📅 今日小贴士</Text>
          </View>
          <View className="section-content">
            <View className="tips-grid">
              <View className="tip-card health">
                <Text className="tip-icon">💚</Text>
                <Text className="tip-category">健康</Text>
                <Text className="tip-content">{todayTips.health}</Text>
              </View>
              
              <View className="tip-card work">
                <Text className="tip-icon">💼</Text>
                <Text className="tip-category">工作</Text>
                <Text className="tip-content">{todayTips.work}</Text>
              </View>
              
              <View className="tip-card love">
                <Text className="tip-icon">💖</Text>
                <Text className="tip-category">感情</Text>
                <Text className="tip-content">{todayTips.love}</Text>
              </View>
              
              <View className="tip-card mood">
                <Text className="tip-icon">😊</Text>
                <Text className="tip-category">心情</Text>
                <Text className="tip-content">{todayTips.mood}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 人生建议 */}
        <View className="analysis-section">
          <View className="section-header">
            <Text className="section-title">🌈 人生建议</Text>
          </View>
          <View className="section-content">
            <View className="life-advice">
              <Text className="advice-text">{lifeAdvice}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部按钮 */}
      <View className="analysis-footer">
        <View className="back-button" onClick={onBack}>
          <Text className="button-text">重新分析</Text>
        </View>
      </View>
    </View>
  );
}