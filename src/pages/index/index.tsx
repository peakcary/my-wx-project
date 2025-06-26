import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('首页加载完成')
  })

  const handleStartGame = () => {
    console.log('点击开始游戏')
    Taro.navigateTo({
      url: '/pages/game/game'
    })
  }

  const features = [
    { icon: '🧩', title: '经典数独', desc: '9x9传统数独谜题' },
    { icon: '⏱️', title: '计时挑战', desc: '挑战解题速度' },
    { icon: '🎯', title: '多种难度', desc: '简单到困难' },
    { icon: '💡', title: '智能提示', desc: '卡住时获得帮助' }
  ]
  
  const gameRules = [
    { step: '1', desc: '在9×9网格中填入数字1-9' },
    { step: '2', desc: '每行、每列不能有重复数字' },
    { step: '3', desc: '每个3×3宫格内数字不重复' }
  ]

  return (
    <View className='index'>
      {/* 头部区域 */}
      <View className='header'>
        <View className='logo-area'>
          <Text className='logo-text'>🧩</Text>
          <Text className='app-title'>数独小游戏</Text>
          <Text className='app-subtitle'>挑战你的逻辑思维</Text>
        </View>
      </View>

      {/* 特色功能 */}
      <View className='features'>
        <Text className='section-title'>✨ 游戏特色</Text>
        <View className='feature-grid'>
          {features.map((feature, index) => (
            <View key={index} className='feature-item'>
              <Text className='feature-icon'>{feature.icon}</Text>
              <Text className='feature-title'>{feature.title}</Text>
              <Text className='feature-desc'>{feature.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 游戏规则 */}
      <View className='game-rules'>
        <Text className='section-title'>📋 游戏规则</Text>
        <View className='rules-list'>
          {gameRules.map((rule, index) => (
            <View key={index} className='rule-item'>
              <View className='rule-step'>{rule.step}</View>
              <Text className='rule-desc'>{rule.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 开始游戏区域 */}
      <View className='start-section'>
        <View className='start-button' onClick={handleStartGame}>
          <Text className='start-text'>🎮 立即开始</Text>
          <Text className='start-subtitle'>体验智力挑战</Text>
        </View>
        
        <View className='achievement'>
          <Text className='achievement-text'>🏆 挑战自己，成为数独大师</Text>
        </View>
      </View>

    
    </View>
  )
}
