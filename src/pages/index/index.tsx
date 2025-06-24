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
    { icon: '🧩', title: '经典数独', desc: '传统9x9数独谜题' },
    { icon: '⏱️', title: '计时挑战', desc: '挑战你的解题速度' },
    { icon: '🎯', title: '多种难度', desc: '从简单到困难级别' },
    { icon: '💡', title: '智能提示', desc: '卡住时获得帮助' }
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
        <Text className='section-title'>游戏特色</Text>
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

      {/* 游戏说明 */}
      <View className='game-info'>
        <Text className='section-title'>如何游戏</Text>
        <View className='info-content'>
          <View className='info-item'>
            <Text className='info-number'>1</Text>
            <Text className='info-text'>在9x9网格中填入数字1-9</Text>
          </View>
          <View className='info-item'>
            <Text className='info-number'>2</Text>
            <Text className='info-text'>每行、每列、每个3x3宫格内数字不能重复</Text>
          </View>
          <View className='info-item'>
            <Text className='info-number'>3</Text>
            <Text className='info-text'>根据已有数字推理出正确答案</Text>
          </View>
        </View>
      </View>

      {/* 开始游戏按钮 */}
      <View className='start-section'>
        <View className='start-button' onClick={handleStartGame}>
          <Text className='start-text'>🎮 开始游戏</Text>
        </View>
        
        <View className='tip'>
          <Text className='tip-text'>
            💡 提示：首次游戏建议从简单难度开始
          </Text>
        </View>
      </View>

      {/* 底部信息 */}
      <View className='footer'>
        <Text className='footer-text'>基于 Taro 开发的微信小游戏</Text>
      </View>
    </View>
  )
}
