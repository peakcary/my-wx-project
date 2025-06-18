import React, { useState, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useSudokuGame } from '../../hooks/useSudokuGame';
import { Difficulty, CellValue } from '../../types/sudoku';
import { SudokuValidator } from '../../utils/sudokuValidator';
import SudokuGrid from '../../components/SudokuGrid';
import NumberPad from '../../components/NumberPad';
import GameControls from '../../components/GameControls';
import './game.scss';

export default function GamePage() {
  // 游戏状态管理
  const {
    gameState,
    startNewGame,
    selectCell,
    setCellValue,
    clearCell,
    useHint,
    pauseGame,
    resumeGame,
    checkSolution,
    getCompletionPercentage,
    formatTime
  } = useSudokuGame();

  // 当前选中的数字（用于数字面板）
  const [selectedNumber, setSelectedNumber] = useState<CellValue | undefined>(undefined);

  // 页面加载时开始新游戏
  useLoad(() => {
    console.log('游戏页面加载');
    startNewGame(Difficulty.EASY);
  });

  // 处理单元格点击
  const handleCellClick = useCallback((row: number, col: number) => {
    selectCell(row, col);
  }, [selectCell]);

  // 处理数字选择
  const handleNumberSelect = useCallback((number: CellValue) => {
    setSelectedNumber(number);
    
    // 如果有选中的单元格，直接填入数字
    if (gameState?.selectedCell) {
      const { row, col } = gameState.selectedCell;
      setCellValue(row, col, number);
    }
  }, [gameState?.selectedCell, setCellValue]);

  // 处理清除操作
  const handleClear = useCallback(() => {
    if (gameState?.selectedCell) {
      const { row, col } = gameState.selectedCell;
      clearCell(row, col);
    }
  }, [gameState?.selectedCell, clearCell]);

  // 处理橡皮擦操作
  const handleEraser = useCallback(() => {
    setSelectedNumber(0);
    if (gameState?.selectedCell) {
      const { row, col } = gameState.selectedCell;
      setCellValue(row, col, 0);
    }
  }, [gameState?.selectedCell, setCellValue]);

  // 处理新游戏
  const handleNewGame = useCallback((difficulty: Difficulty) => {
    setSelectedNumber(undefined);
    startNewGame(difficulty);
  }, [startNewGame]);

  // 处理检查解答
  const handleCheck = useCallback(() => {
    const isCorrect = checkSolution();
    
    // 这里可以添加提示逻辑
    console.log('解答检查结果:', isCorrect);
    
    // 可以添加 Toast 提示
    if (isCorrect) {
      console.log('恭喜！解答正确！');
    } else {
      console.log('还有错误，请继续努力！');
    }
  }, [checkSolution]);

  // 获取数字使用计数
  const getNumberCounts = useCallback(() => {
    if (!gameState) return {};
    
    const currentBoard = gameState.board.map(row => row.map(cell => cell.value));
    return SudokuValidator.getNumberCounts(currentBoard);
  }, [gameState]);

  // 如果游戏状态还未初始化
  if (!gameState) {
    return (
      <View className="game-page loading">
        <Text className="loading-text">游戏加载中...</Text>
      </View>
    );
  }

  return (
    <View className="game-page">
      {/* 游戏控制面板 */}
      <GameControls
        isPlaying={true}
        isPaused={gameState.isPaused}
        isCompleted={gameState.isCompleted}
        currentDifficulty={gameState.difficulty}
        elapsedTime={gameState.elapsedTime}
        mistakes={gameState.mistakes}
        hintsUsed={gameState.hintsUsed}
        completionPercentage={getCompletionPercentage()}
        onNewGame={handleNewGame}
        onPause={pauseGame}
        onResume={resumeGame}
        onHint={useHint}
        onCheck={handleCheck}
        formatTime={formatTime}
      />

      {/* 数独网格 */}
      <View className="game-board">
        <SudokuGrid
          board={gameState.board}
          onCellClick={handleCellClick}
        />
      </View>

      {/* 数字输入面板 */}
      {!gameState.isPaused && !gameState.isCompleted && (
        <NumberPad
          onNumberSelect={handleNumberSelect}
          onClear={handleClear}
          onEraser={handleEraser}
          selectedNumber={selectedNumber}
          numberCounts={getNumberCounts()}
        />
      )}

      {/* 暂停遮罩 */}
      {gameState.isPaused && (
        <View className="pause-overlay">
          <View className="pause-content">
            <Text className="pause-title">游戏已暂停</Text>
            <Text className="pause-subtitle">点击"继续"按钮恢复游戏</Text>
          </View>
        </View>
      )}

      {/* 完成庆祝页面 */}
      {gameState.isCompleted && (
        <View className="completion-overlay">
          <View className="completion-content">
            <Text className="completion-title">🎉 恭喜完成！</Text>
            <View className="completion-stats">
              <Text className="stat-item">用时: {formatTime(gameState.elapsedTime)}</Text>
              <Text className="stat-item">错误: {gameState.mistakes} 次</Text>
              <Text className="stat-item">提示: {gameState.hintsUsed} 次</Text>
              <Text className="stat-item">难度: {
                gameState.difficulty === Difficulty.EASY ? '简单' :
                gameState.difficulty === Difficulty.MEDIUM ? '中等' : '困难'
              }</Text>
            </View>
            <View className="completion-actions">
              <View 
                className="action-button primary"
                onClick={() => handleNewGame(gameState.difficulty)}
              >
                <Text className="action-text">再来一局</Text>
              </View>
              <View 
                className="action-button secondary"
                onClick={() => handleNewGame(
                  gameState.difficulty === Difficulty.EASY ? Difficulty.MEDIUM :
                  gameState.difficulty === Difficulty.MEDIUM ? Difficulty.HARD : 
                  Difficulty.EASY
                )}
              >
                <Text className="action-text">挑战更高难度</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
} 