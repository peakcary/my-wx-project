import React from 'react';
import { View, Text } from '@tarojs/components';
import { ConstellationType, ConstellationBasic } from '../../types/constellation';
import { getAllConstellations } from '../../utils/constellationData';
import './index.scss';

interface ConstellationSelectorProps {
  selectedConstellation?: ConstellationType;
  onSelect: (constellation: ConstellationType) => void;
  mode?: 'grid' | 'list'; // 显示模式：网格或列表
  showDescription?: boolean; // 是否显示描述
}

export default function ConstellationSelector({
  selectedConstellation,
  onSelect,
  mode = 'grid',
  showDescription = false
}: ConstellationSelectorProps) {
  
  const constellations = getAllConstellations();

  const handleSelect = (constellation: ConstellationType) => {
    onSelect(constellation);
  };

  if (mode === 'list') {
    return (
      <View className="constellation-selector list-mode">
        <View className="selector-header">
          <Text className="header-title">选择你的星座</Text>
          <Text className="header-subtitle">点击选择您的出生星座</Text>
        </View>
        
        <View className="constellation-list">
          {constellations.map((constellation) => (
            <View
              key={constellation.id}
              className={`constellation-item list-item ${
                selectedConstellation === constellation.id ? 'selected' : ''
              }`}
              onClick={() => handleSelect(constellation.id)}
            >
              <View className="item-icon">
                <Text className="constellation-emoji">{constellation.icon}</Text>
              </View>
              
              <View className="item-content">
                <View className="item-header">
                  <Text className="constellation-name">{constellation.name}</Text>
                  <Text className="constellation-symbol">{constellation.symbol}</Text>
                </View>
                
                <Text className="constellation-date">{constellation.dateRange}</Text>
                <Text className="constellation-element">{constellation.element}</Text>
                
                {showDescription && (
                  <Text className="constellation-description">
                    守护星: {constellation.rulingPlanet}
                  </Text>
                )}
              </View>
              
              {selectedConstellation === constellation.id && (
                <View className="selected-indicator">
                  <Text className="check-icon">✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  // 网格模式（默认）
  return (
    <View className="constellation-selector grid-mode">
      <View className="constellation-grid">
        {constellations.map((constellation) => (
          <View
            key={constellation.id}
            className={`constellation-card ${
              selectedConstellation === constellation.id ? 'selected' : ''
            }`}
            onClick={() => handleSelect(constellation.id)}
          >
            <View className="card-icon">
              <Text className="constellation-emoji">{constellation.icon}</Text>
              <Text className="constellation-symbol">{constellation.symbol}</Text>
            </View>
            
            <View className="card-content">
              <Text className="constellation-name">{constellation.name}</Text>
              <Text className="constellation-english">{constellation.englishName}</Text>
              <Text className="constellation-date">{constellation.dateRange}</Text>
            </View>
            
            {selectedConstellation === constellation.id && (
              <View className="selected-overlay">
                <Text className="selected-text">已选择</Text>
              </View>
            )}
          </View>
        ))}
      </View>
      
      {selectedConstellation && (
        <View className="selection-summary">
          <Text className="summary-text">
            已选择: {constellations.find(c => c.id === selectedConstellation)?.name}
          </Text>
        </View>
      )}
    </View>
  );
}