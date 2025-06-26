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
    clearBoard,
    useHint,
    pauseGame,
    resumeGame,
    checkSolution,
    getCompletionPercentage,
    formatTime,
    checkIfStuck,
    getEasiestCell
  } = useSudokuGame();

  // 当前选中的数字（用于数字面板）
  const [selectedNumber, setSelectedNumber] = useState<CellValue | undefined>(undefined);
  
  // 检测游戏状态
  const [isStuckWarning, setIsStuckWarning] = useState(false);
  
  // 检查结果状态
  const [checkResult, setCheckResult] = useState<{
    show: boolean;
    isCorrect: boolean;
    message: string;
    suggestion?: string;
  }>({
    show: false,
    isCorrect: false,
    message: ''
  });

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
    if (gameState && gameState.selectedCell) {
      const { row, col } = gameState.selectedCell;
      setCellValue(row, col, number);
      
      // 填入数字后检测是否陷入死局
      setTimeout(() => {
        const isStuck = checkIfStuck();
        setIsStuckWarning(isStuck);
      }, 100); // 延迟检查，确保状态已更新
    }
  }, [gameState, setCellValue, checkIfStuck]);

  // 处理清空操作（清空整个棋盘）
  const handleClear = useCallback(() => {
    clearBoard();
    setSelectedNumber(undefined);
    setIsStuckWarning(false);
  }, [clearBoard]);

  // 处理橡皮擦操作
  const handleEraser = useCallback(() => {
    setSelectedNumber(0);
    if (gameState && gameState.selectedCell) {
      const { row, col } = gameState.selectedCell;
      setCellValue(row, col, 0);
    }
  }, [gameState, setCellValue]);

  // 处理新游戏
  const handleNewGame = useCallback((difficulty: Difficulty) => {
    setSelectedNumber(undefined);
    startNewGame(difficulty);
  }, [startNewGame]);

  // 处理检查解答
  const handleCheck = useCallback(() => {
    if (!gameState) return;
    
    const isCorrect = checkSolution();
    
    if (isCorrect) {
      setCheckResult({
        show: true,
        isCorrect: true,
        message: '🎉 恭喜！解答完全正确！'
      });
    } else {
      // 计算完成度
      const completionPercentage = getCompletionPercentage();
      
      // 检查是否陷入死局
      const isStuck = checkIfStuck();
      
      if (isStuck) {
        setCheckResult({
          show: true,
          isCorrect: false,
          message: '⚠️ 检测到死局状态',
          suggestion: '当前状态可能无法继续，建议使用"清空"功能重新开始，或者尝试智能提示。'
        });
      } else {
        // 提供智能提示
        const easiestCell = getEasiestCell();
        let suggestion = '';
        
        if (easiestCell) {
          suggestion = `💡 建议：尝试填入第${easiestCell.row + 1}行第${easiestCell.col + 1}列，可能的数字有：${easiestCell.possibleValues.join(', ')}`;
        } else {
          suggestion = '继续分析当前局面，寻找突破口。';
        }
        
        setCheckResult({
          show: true,
          isCorrect: false,
          message: `📊 当前进度：${Math.round(completionPercentage)}%`,
          suggestion: suggestion
        });
      }
    }
  }, [gameState, checkSolution, getCompletionPercentage, checkIfStuck, getEasiestCell]);

  // 智能提示功能（新增）
  const handleSmartHint = useCallback(() => {
    if (!gameState) return;
    
    // 首先检查是否陷入死局
    const isStuck = checkIfStuck();
    if (isStuck) {
      console.log('⚠️ 游戏陷入死局！建议重新开始游戏。');
      return;
    }
    
    // 获取最容易填入的单元格
    const easiestCell = getEasiestCell();
    if (easiestCell) {
      // 自动选中这个单元格
      selectCell(easiestCell.row, easiestCell.col);
      console.log(`💡 提示：当前选中的单元格只能填入：${easiestCell.possibleValues.join(', ')}`);
    } else {
      console.log('没有找到明显的下一步，请仔细分析当前局面。');
    }
  }, [gameState, checkIfStuck, getEasiestCell, selectCell]);

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
        onSmartHint={handleSmartHint}
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
        <View className="number-pad-container">
          <NumberPad
            onNumberSelect={handleNumberSelect}
            onClear={handleClear}
            onEraser={handleEraser}
            selectedNumber={selectedNumber}
            numberCounts={getNumberCounts()}
            canClear={true} // 清空功能现在总是可用（清空整个棋盘）
            selectedCellInfo={{
              hasValue: false, // 不再依赖单个单元格
              isOriginal: false,
              value: 0
            }}
          />
        </View>
      )}

      {/* 检查结果弹窗 */}
      {checkResult.show && !gameState.isPaused && !gameState.isCompleted && (
        <View className="check-result-overlay">
          <View className="check-result-content">
            <Text className={`check-result-title ${checkResult.isCorrect ? 'success' : 'info'}`}>
              {checkResult.message}
            </Text>
            {checkResult.suggestion && (
              <Text className="check-result-suggestion">{checkResult.suggestion}</Text>
            )}
            <View className="check-result-actions">
              {!checkResult.isCorrect && (
                <View 
                  className="result-button smart"
                  onClick={handleSmartHint}
                >
                  <Text className="result-text">智能提示</Text>
                </View>
              )}
              <View 
                className="result-button dismiss"
                onClick={() => setCheckResult(prev => ({ ...prev, show: false }))}
              >
                <Text className="result-text">知道了</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 死局警告 */}
      {isStuckWarning && !gameState.isPaused && !gameState.isCompleted && (
        <View className="stuck-warning">
          <View className="warning-content">
            <Text className="warning-title">⚠️ 检测到死局</Text>
            <Text className="warning-subtitle">当前状态可能无法继续，建议：</Text>
            <View className="warning-actions">
              <View 
                className="warning-button smart"
                onClick={handleSmartHint}
              >
                <Text className="warning-text">智能提示</Text>
              </View>
              <View 
                className="warning-button dismiss"
                onClick={() => setIsStuckWarning(false)}
              >
                <Text className="warning-text">知道了</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 暂停遮罩 */}
      {gameState.isPaused && (
        <View className="pause-overlay" onClick={resumeGame}>
          <View className="pause-content" onClick={(e) => e.stopPropagation()}>
            <Text className="pause-title">游戏已暂停</Text>
            <Text className="pause-subtitle">点击任意处或"继续"按钮恢复游戏</Text>
            <View className="pause-actions">
              <View 
                className="pause-button resume"
                onClick={resumeGame}
              >
                <Text className="pause-button-text">继续游戏</Text>
              </View>
              <View 
                className="pause-button new-game"
                onClick={() => handleNewGame(gameState.difficulty)}
              >
                <Text className="pause-button-text">重新开始</Text>
              </View>
            </View>
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