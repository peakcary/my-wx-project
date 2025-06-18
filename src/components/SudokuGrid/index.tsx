import React from 'react';
import { View } from '@tarojs/components';
import { CellState } from '../../types/sudoku';
import './index.scss';

interface SudokuGridProps {
  board: CellState[][];
  onCellClick: (row: number, col: number) => void;
}

interface SudokuCellProps {
  cell: CellState;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
}

// 单个数独单元格组件
const SudokuCell: React.FC<SudokuCellProps> = ({ cell, row, col, onClick }) => {
  const handleClick = () => {
    onClick(row, col);
  };

  // 构建单元格样式类名
  const getCellClassName = () => {
    const classes = ['sudoku-cell'];
    
    if (cell.isSelected) classes.push('selected');
    if (cell.isHighlighted) classes.push('highlighted');
    if (cell.hasError) classes.push('error');
    if (cell.isOriginal) classes.push('original');
    
    // 添加边界样式
    if (col % 3 === 2 && col < 8) classes.push('right-border');
    if (row % 3 === 2 && row < 8) classes.push('bottom-border');
    
    return classes.join(' ');
  };

  return (
    <View 
      className={getCellClassName()}
      onClick={handleClick}
    >
      {/* 主要数字 */}
      {cell.value !== 0 && (
        <View className="cell-value">
          {cell.value}
        </View>
      )}
      
      {/* 候选数字（小字） */}
      {cell.value === 0 && cell.candidates.length > 0 && (
        <View className="cell-candidates">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <View 
              key={num} 
              className={`candidate ${cell.candidates.includes(num) ? 'visible' : ''}`}
            >
              {cell.candidates.includes(num) ? num : ''}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// 数独网格组件
const SudokuGrid: React.FC<SudokuGridProps> = ({ board, onCellClick }) => {
  return (
    <View className="sudoku-grid">
      {board.map((row, rowIndex) => (
        <View key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              onClick={onCellClick}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default SudokuGrid; 