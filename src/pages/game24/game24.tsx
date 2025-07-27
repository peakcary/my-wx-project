import { View, Text, Input, Button } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import './game24.scss'

export default function Game24() {
  const [numbers, setNumbers] = useState<number[]>([])
  const [expression, setExpression] = useState('')
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [usedNumbers, setUsedNumbers] = useState<boolean[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [animatingCard, setAnimatingCard] = useState<number | null>(null)

  const generateNumbers = () => {
    const newNumbers: number[] = []
    for (let i = 0; i < 4; i++) {
      newNumbers.push(Math.floor(Math.random() * 9) + 1)
    }
    setNumbers(newNumbers)
    setExpression('')
    setCurrentInput('')
    setMessage('')
    setGameStarted(true)
    setSelectedNumber(null)
    setUsedNumbers([false, false, false, false])
  }

  const handleNumberClick = (number: number, index: number) => {
    if (usedNumbers[index]) return
    
    // 添加动画效果
    setAnimatingCard(index)
    setTimeout(() => setAnimatingCard(null), 200)
    
    setCurrentInput(prev => prev + number)
    const newUsedNumbers = [...usedNumbers]
    newUsedNumbers[index] = true
    setUsedNumbers(newUsedNumbers)
    
    // 隐藏提示
    setShowHint(false)
  }

  const handleOperatorClick = (operator: string) => {
    if (currentInput === '' && !['√', 'ln', 'log'].includes(operator)) return
    
    // 对于前缀运算符，可以在空输入时使用
    if (['√', 'ln', 'log'].includes(operator) && currentInput === '') {
      setCurrentInput(operator + '(')
    } else {
      setCurrentInput(prev => prev + operator)
    }
  }

  const handleParenthesis = (paren: string) => {
    setCurrentInput(prev => prev + paren)
  }

  const handleClear = () => {
    setCurrentInput('')
    setUsedNumbers([false, false, false, false])
  }

  const handleBackspace = () => {
    const newInput = currentInput.slice(0, -1)
    setCurrentInput(newInput)
    
    // 重新计算已使用的数字
    const usedNums = (newInput.match(/\d+/g) || []).map(Number)
    const newUsedNumbers = [false, false, false, false]
    
    numbers.forEach((num, index) => {
      const count = usedNums.filter(n => n === num).length
      const totalCount = numbers.filter(n => n === num).length
      if (count >= totalCount && numbers.indexOf(num) === index) {
        newUsedNumbers[index] = true
      }
    })
    
    setUsedNumbers(newUsedNumbers)
  }

  const evaluateExpression = (expr: string): number | null => {
    try {
      // 预处理表达式，将自定义运算符转换为JavaScript可执行的代码
      let processedExpr = expr
      
      // 处理阶乘
      processedExpr = processedExpr.replace(/(\d+)!/g, (match, num) => {
        const n = parseInt(num)
        let factorial = 1
        for (let i = 2; i <= n; i++) {
          factorial *= i
        }
        return factorial.toString()
      })
      
      // 处理平方
      processedExpr = processedExpr.replace(/(\d+|\))²/g, '($1*$1)')
      
      // 处理立方
      processedExpr = processedExpr.replace(/(\d+|\))³/g, '($1*$1*$1)')
      
      // 处理根号
      processedExpr = processedExpr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
      
      // 处理自然对数
      processedExpr = processedExpr.replace(/ln\(([^)]+)\)/g, 'Math.log($1)')
      
      // 处理常用对数
      processedExpr = processedExpr.replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
      
      // 处理幂运算
      processedExpr = processedExpr.replace(/(\d+|\))\^(\d+|\()/g, 'Math.pow($1,$2)')
      
      // 处理显示符号转换
      processedExpr = processedExpr.replace(/×/g, '*')
      processedExpr = processedExpr.replace(/÷/g, '/')
      
      // 安全的表达式求值
      const sanitized = processedExpr.replace(/[^0-9+\-*/().\sMath,]/g, '')
      const result = Function(`"use strict"; return (${sanitized})`)()
      return typeof result === 'number' && !isNaN(result) && isFinite(result) ? result : null
    } catch {
      return null
    }
  }

  const checkExpression = () => {
    const expr = currentInput.trim()
    if (!expr) {
      setMessage('请输入表达式')
      setShowHint(true)
      return
    }

    setIsCalculating(true)
    
    // 模拟计算过程，提升用户体验
    setTimeout(() => {
      const usedNums = (expr.match(/\d+/g) || []).map(Number)
      const sortedNumbers = [...numbers].sort((a, b) => a - b)
      const sortedUsed = [...usedNums].sort((a, b) => a - b)

      if (sortedNumbers.length !== sortedUsed.length || 
          !sortedNumbers.every((num, i) => num === sortedUsed[i])) {
        setMessage('必须使用所有4个数字，且每个数字只能使用一次')
        setIsCalculating(false)
        return
      }

      const result = evaluateExpression(expr)
      setAttempts(prev => prev + 1)

      if (result === 24) {
        setScore(prev => prev + 1)
        setMessage('🎉 恭喜！答案正确！')
        setTimeout(() => {
          generateNumbers()
        }, 2000)
      } else if (result === null) {
        setMessage('表达式格式错误，请检查语法')
      } else {
        setMessage(`结果是 ${result}，继续努力！目标是 24`)
      }
      
      setIsCalculating(false)
    }, 500)
  }

  const backToHome = () => {
    Taro.navigateBack()
  }

  const resetGame = () => {
    setScore(0)
    setAttempts(0)
    setGameStarted(false)
    setNumbers([])
    setExpression('')
    setCurrentInput('')
    setMessage('')
    setSelectedNumber(null)
    setUsedNumbers([false, false, false, false])
  }

  return (
    <View className='game24'>
      <View className='header'>
        <View className='title'>
          <Text className='title-text'>🎯 24点游戏</Text>
        </View>
        <View className='stats'>
          <Text className='stat-item'>得分: {score}</Text>
          <Text className='stat-item'>尝试: {attempts}</Text>
        </View>
      </View>

      {!gameStarted ? (
        <View className='start-area'>
          <View className='game-intro'>
            <Text className='intro-title'>🎮 24点游戏规则</Text>
            <View className='rules'>
              <Text className='rule-item'>• 使用给定的4个数字</Text>
              <Text className='rule-item'>• 通过运算符使结果等于24</Text>
              <Text className='rule-item'>• 每个数字只能用一次</Text>
              <Text className='rule-item'>• 支持多种运算符和高级函数</Text>
            </View>
            
            <View className='operators-help'>
              <Text className='help-title'>📚 运算符说明</Text>
              <View className='help-content'>
                <Text className='help-item'>基础: +、-、×、÷、( )</Text>
                <Text className='help-item'>高级: ^、²、³、!、√、ln、log</Text>
              </View>
            </View>
          </View>
          <Button className='start-btn' onClick={generateNumbers}>
            🚀 开始游戏
          </Button>
        </View>
      ) : (
        <View className='game-area'>
          {/* 游戏状态和数字区域 */}
          <View className='game-status-section'>
            <View className='numbers-section'>
              <View className='numbers-display'>
                {numbers.map((num, index) => (
                  <View 
                    key={index} 
                    className={`number-card ${usedNumbers[index] ? 'used' : ''} ${animatingCard === index ? 'animating' : ''}`}
                    onClick={() => handleNumberClick(num, index)}
                  >
                    <Text className='number-text'>{num}</Text>
                    {usedNumbers[index] && <View className='used-indicator'>✓</View>}
                  </View>
                ))}
              </View>
              <Text className='numbers-hint'>轻触数字添加到表达式</Text>
            </View>

            <View className='target-section'>
              <Text className='target-label'>目标</Text>
              <Text className='target-number'>24</Text>
            </View>
          </View>

          {/* 表达式构建区域 */}
          <View className='expression-section'>
            <View className='expression-container'>
              <Text className='expression-label'>表达式</Text>
              <View className='expression-display'>
                <Text className='expression-text'>
                  {currentInput || '点击数字和运算符构建表达式'}
                </Text>
              </View>
              <View className='expression-controls'>
                <View className='control-btn' onClick={handleBackspace}>
                  <Text className='control-icon'>⌫</Text>
                </View>
                <View className='control-btn' onClick={handleClear}>
                  <Text className='control-icon'>🗑</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 运算符面板 */}
          <View className='operators-panel'>
            <View className='basic-operators'>
              <View className='operator-btn primary' onClick={() => handleOperatorClick('+')}>
                <Text className='operator-text'>+</Text>
              </View>
              <View className='operator-btn primary' onClick={() => handleOperatorClick('-')}>
                <Text className='operator-text'>-</Text>
              </View>
              <View className='operator-btn primary' onClick={() => handleOperatorClick('×')}>
                <Text className='operator-text'>×</Text>
              </View>
              <View className='operator-btn primary' onClick={() => handleOperatorClick('÷')}>
                <Text className='operator-text'>÷</Text>
              </View>
              <View className='operator-btn secondary' onClick={() => handleParenthesis('(')}>
                <Text className='operator-text'>(</Text>
              </View>
              <View className='operator-btn secondary' onClick={() => handleParenthesis(')')}>
                <Text className='operator-text'>)</Text>
              </View>
            </View>
            
            <View className='advanced-operators'>
              <View className='operator-btn advanced' onClick={() => handleOperatorClick('^')}>
                <Text className='operator-text'>x^y</Text>
              </View>
              <View className='operator-btn advanced' onClick={() => handleOperatorClick('²')}>
                <Text className='operator-text'>x²</Text>
              </View>
              <View className='operator-btn advanced' onClick={() => handleOperatorClick('!')}>
                <Text className='operator-text'>x!</Text>
              </View>
              <View className='operator-btn advanced' onClick={() => handleOperatorClick('√')}>
                <Text className='operator-text'>√x</Text>
              </View>
            </View>
          </View>

          {/* 操作按钮区域 */}
          <View className='action-section'>
            <View className={`action-btn primary ${isCalculating ? 'calculating' : ''}`} onClick={checkExpression}>
              <Text className='action-text'>
                {isCalculating ? '计算中...' : '检查答案'}
              </Text>
            </View>
            <View className='action-btn secondary' onClick={generateNumbers}>
              <Text className='action-text'>下一题</Text>
            </View>
          </View>

          {/* 结果反馈区域 */}
          {message && (
            <View className='feedback-section'>
              <View className={`feedback-message ${message.includes('恭喜') ? 'success' : 'info'}`}>
                <Text className='feedback-text'>{message}</Text>
              </View>
            </View>
          )}
        </View>
      )}

      <View className='footer'>
        <Button className='back-btn' onClick={backToHome}>
          🏠 返回首页
        </Button>
        <Button className='reset-btn' onClick={resetGame}>
          🔄 重新开始
        </Button>
      </View>
    </View>
  )
}