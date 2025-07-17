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

  const handleStart24Game = () => {
    console.log('点击24点游戏')
    Taro.navigateTo({
      url: '/pages/game24/game24'
    })
  }

  const games = [
    { 
      icon: '🧩', 
      title: '经典数独', 
      desc: '9x9传统数独谜题', 
      difficulty: '⭐⭐⭐',
      action: handleStartGame
    },
    { 
      icon: '🎲', 
      title: '24点游戏', 
      desc: '数学计算挑战', 
      difficulty: '⭐⭐',
      action: handleStart24Game
    }
  ]
  
  const features = [
    { icon: '⏱️', title: '计时挑战', desc: '挑战解题速度' },
    { icon: '🎯', title: '多种难度', desc: '简单到困难' },
    { icon: '💡', title: '智能提示', desc: '卡住时获得帮助' },
    { icon: '🏆', title: '成就系统', desc: '解锁更多奖励' }
  ]
  
  const gameRules = [
    { step: '1', desc: '选择你喜欢的游戏类型' },
    { step: '2', desc: '根据提示完成挑战' },
    { step: '3', desc: '挑战更高难度获得成就' }
  ]

  return (
    <View className='index'>
      {/* 头部区域 */}
      <View className='header'>
        <View className='logo-area'>
          <Text className='logo-text'>🧩</Text>
          <Text className='app-title'>智力游戏大全</Text>
          <Text className='app-subtitle'>挑战你的逻辑思维</Text>
        </View>
      </View>

      {/* 游戏选择 */}
      <View className='games-section'>
        <Text className='section-title'>🎮 选择游戏</Text>
        <View className='games-grid'>
          {games.map((game, index) => (
            <View 
              key={index} 
              className='game-card'
              onClick={game.action}
            >
              <Text className='game-icon'>{game.icon}</Text>
              <Text className='game-title'>{game.title}</Text>
              <Text className='game-desc'>{game.desc}</Text>
              <Text className='game-difficulty'>{game.difficulty}</Text>
            </View>
          ))}
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
        <Text className='section-title'>📋 如何开始</Text>
        <View className='rules-list'>
          {gameRules.map((rule, index) => (
            <View key={index} className='rule-item'>
              <View className='rule-step'>{rule.step}</View>
              <Text className='rule-desc'>{rule.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 底部激励 */}
      <View className='bottom-section'>
        <View className='achievement'>
          <Text className='achievement-text'>🏆 挑战自己，成为智力游戏大师</Text>
        </View>
      </View>

    
    </View>
  )
}
