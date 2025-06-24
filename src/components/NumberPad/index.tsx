import React from 'react';
import { View, Text } from '@tarojs/components';
import { CellValue } from '../../types/sudoku';
import './index.scss';

interface NumberPadProps {
  onNumberSelect: (number: CellValue) => void;
  onClear: () => void;
  onEraser: () => void;
  selectedNumber?: CellValue;
  numberCounts?: { [key: number]: number };
}

const NumberPad: React.FC<NumberPadProps> = ({ 
  onNumberSelect, 
  onClear, 
  onEraser,
  selectedNumber,
  numberCounts = {}
}) => {
  
  const handleNumberClick = (number: CellValue) => {
    onNumberSelect(number);
  };

  const handleClearClick = () => {
    onClear();
  };

  const handleEraserClick = () => {
    onEraser();
  };

  return (
    <View className="number-pad">

      
      {/* 数字按钮 1-9 */}
      <View className="number-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => {
          const count = numberCounts[number] || 0;
          const isComplete = count >= 9; // 每个数字最多出现9次
          const isSelected = selectedNumber === number;
          
          return (
            <View
              key={number}
              className={`number-button ${isSelected ? 'selected' : ''} ${isComplete ? 'complete' : ''}`}
              onClick={() => handleNumberClick(number as CellValue)}
            >
              <Text className="number-text">{number}</Text>
              {count > 0 && (
                <View className="number-count">
                  <Text className="count-text">{count}/9</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
      
      {/* 功能按钮 */}
      <View className="function-buttons">
        {/* 橡皮擦按钮 */}
        <View 
          className="function-button eraser-button"
          onClick={handleEraserClick}
        >
          <Text className="function-text">橡皮擦</Text>
        </View>
        
        {/* 清空按钮 */}
        <View 
          className="function-button clear-button"
          onClick={handleClearClick}
        >
          <Text className="function-text">清空</Text>
        </View>
      </View>
    </View>
  );
};

export default NumberPad; 