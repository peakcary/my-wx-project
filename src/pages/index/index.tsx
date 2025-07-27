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

  const handleStartConstellation = () => {
    console.log('点击星座分析')
    Taro.navigateTo({
      url: '/pages/constellation/constellation'
    })
  }

  const handleStartBloodType = () => {
    console.log('点击血型分析')
    Taro.navigateTo({
      url: '/pages/bloodtype/bloodtype'
    })
  }

  const handleStartTarot = () => {
    console.log('点击塔罗牌占卜')
    Taro.navigateTo({
      url: '/pages/tarot/tarot'
    })
  }

  const games = [
    { 
      icon: '🧩', 
      title: '经典数独', 
      desc: '9x9传统数独谜题', 
      category: '逻辑游戏',
      action: handleStartGame
    },
    { 
      icon: '🎲', 
      title: '24点游戏', 
      desc: '数学计算挑战', 
      category: '逻辑游戏',
      action: handleStart24Game
    }
  ]
  
  const divination = [
    { 
      icon: '🌟', 
      title: '星座分析', 
      desc: '探索你的星座奥秘', 
      category: '占星测算',
      action: handleStartConstellation
    },
    { 
      icon: '🩸', 
      title: '血型分析', 
      desc: '探索血型背后的性格密码', 
      category: '性格测算',
      action: handleStartBloodType
    },
    { 
      icon: '🔮', 
      title: '塔罗占卜', 
      desc: '倾听宇宙的神秘指引', 
      category: '神秘占卜',
      action: handleStartTarot
    }
  ]
  
  const features = [
    { icon: '🎯', title: '逻辑挑战', desc: '锻炼思维能力' },
    { icon: '🔮', title: '神秘占卜', desc: '探索未知奥秘' },
    { icon: '💡', title: '趣味测算', desc: '了解自己性格' },
    { icon: '🌟', title: '多样体验', desc: '游戏娱乐兼备' }
  ]
  
  const appGuide = [
    { step: '1', desc: '选择游戏或占卜测算类型' },
    { step: '2', desc: '按照引导完成体验' },
    { step: '3', desc: '享受娱乐与探索的乐趣' }
  ]

  return (
    <View className='index'>
      {/* 头部区域 */}
      <View className='header'>
        <View className='logo-area'>
          <Text className='logo-text'>✨</Text>
          <Text className='app-title'>趣味应用大全</Text>
          <Text className='app-subtitle'>游戏娱乐 · 占卜测算</Text>
        </View>
      </View>

      {/* 逻辑游戏区域 */}
      <View className='games-section'>
        <Text className='section-title'>🎮 逻辑游戏</Text>
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
              <Text className='game-category'>{game.category}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 占卜测算区域 */}
      <View className='divination-section'>
        <Text className='section-title'>🔮 占卜测算</Text>
        <View className='divination-grid'>
          {divination.map((item, index) => (
            <View 
              key={index} 
              className='divination-card'
              onClick={item.action}
            >
              <Text className='divination-icon'>{item.icon}</Text>
              <Text className='divination-title'>{item.title}</Text>
              <Text className='divination-desc'>{item.desc}</Text>
              <Text className='divination-category'>{item.category}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 特色功能 */}
      <View className='features'>
        <Text className='section-title'>✨ 应用特色</Text>
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

      {/* 使用指南 */}
      <View className='app-guide'>
        <Text className='section-title'>📋 如何开始</Text>
        <View className='guide-list'>
          {appGuide.map((guide, index) => (
            <View key={index} className='guide-item'>
              <View className='guide-step'>{guide.step}</View>
              <Text className='guide-desc'>{guide.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 底部激励 */}
      <View className='bottom-section'>
        <View className='achievement'>
          <Text className='achievement-text'>🌟 发现自己，探索无限可能</Text>
        </View>
      </View>

    
    </View>
  )
}
