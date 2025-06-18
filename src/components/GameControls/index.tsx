import React from 'react';
import { View, Text } from '@tarojs/components';
import { Difficulty } from '../../types/sudoku';
import './index.scss';

interface GameControlsProps {
  // 游戏状态
  isPlaying: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  currentDifficulty: Difficulty;
  elapsedTime: number;
  mistakes: number;
  hintsUsed: number;
  completionPercentage: number;
  
  // 操作回调
  onNewGame: (difficulty: Difficulty) => void;
  onPause: () => void;
  onResume: () => void;
  onHint: () => void;
  onCheck: () => void;
  
  // 时间格式化函数
  formatTime: (seconds: number) => string;
}

const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  isPaused,
  isCompleted,
  currentDifficulty,
  elapsedTime,
  mistakes,
  hintsUsed,
  completionPercentage,
  onNewGame,
  onPause,
  onResume,
  onHint,
  onCheck,
  formatTime
}) => {
  
  const getDifficultyLabel = (difficulty: Difficulty): string => {
    switch (difficulty) {
      case Difficulty.EASY:
        return '简单';
      case Difficulty.MEDIUM:
        return '中等';
      case Difficulty.HARD:
        return '困难';
      default:
        return '简单';
    }
  };

  const handleNewGameClick = (difficulty: Difficulty) => {
    onNewGame(difficulty);
  };

  const handlePauseResumeClick = () => {
    if (isPaused) {
      onResume();
    } else {
      onPause();
    }
  };

  return (
    <View className="game-controls">
      {/* 游戏信息栏 */}
      <View className="game-info">
        <View className="info-item">
          <Text className="info-label">时间</Text>
          <Text className="info-value">{formatTime(elapsedTime)}</Text>
        </View>
        
        <View className="info-item">
          <Text className="info-label">错误</Text>
          <Text className={`info-value ${mistakes > 3 ? 'warning' : ''}`}>
            {mistakes}
          </Text>
        </View>
        
        <View className="info-item">
          <Text className="info-label">提示</Text>
          <Text className="info-value">{hintsUsed}</Text>
        </View>
        
        <View className="info-item">
          <Text className="info-label">完成</Text>
          <Text className="info-value">{completionPercentage}%</Text>
        </View>
      </View>
      
      {/* 进度条 */}
      <View className="progress-bar">
        <View 
          className="progress-fill"
          style={{
            width: `${completionPercentage}%`
          }}
        />
      </View>
      
      {/* 难度选择器 */}
      <View className="difficulty-selector">
        <Text className="section-title">难度选择</Text>
        <View className="difficulty-buttons">
          {Object.values(Difficulty).map(difficulty => (
            <View
              key={difficulty}
              className={`difficulty-button ${currentDifficulty === difficulty ? 'active' : ''}`}
              onClick={() => handleNewGameClick(difficulty)}
            >
              <Text className="difficulty-text">
                {getDifficultyLabel(difficulty)}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* 游戏控制按钮 */}
      <View className="control-buttons">
        {/* 暂停/继续按钮 */}
        {isPlaying && (
          <View 
            className={`control-button ${isPaused ? 'resume' : 'pause'}`}
            onClick={handlePauseResumeClick}
          >
            <Text className="button-text">
              {isPaused ? '继续' : '暂停'}
            </Text>
          </View>
        )}
        
        {/* 提示按钮 */}
        {isPlaying && !isPaused && !isCompleted && (
          <View 
            className="control-button hint"
            onClick={onHint}
          >
            <Text className="button-text">提示</Text>
          </View>
        )}
        
        {/* 检查按钮 */}
        {isPlaying && !isPaused && !isCompleted && (
          <View 
            className="control-button check"
            onClick={onCheck}
          >
            <Text className="button-text">检查</Text>
          </View>
        )}
      </View>
      
      {/* 游戏状态提示 */}
      {isPaused && (
        <View className="game-status paused">
          <Text className="status-text">游戏已暂停</Text>
        </View>
      )}
      
      {isCompleted && (
        <View className="game-status completed">
          <Text className="status-text">🎉 恭喜完成！</Text>
          <Text className="status-detail">
            用时: {formatTime(elapsedTime)} | 错误: {mistakes}次 | 提示: {hintsUsed}次
          </Text>
        </View>
      )}
    </View>
  );
};

export default GameControls; 