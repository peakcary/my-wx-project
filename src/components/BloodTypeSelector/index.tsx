import React from 'react';
import { View, Text } from '@tarojs/components';
import { BloodType, BloodTypeBasic } from '../../types/bloodType';
import { getAllBloodTypes } from '../../utils/bloodTypeData';
import './index.scss';

interface BloodTypeSelectorProps {
  selectedBloodType?: BloodType;
  onSelect: (bloodType: BloodType) => void;
  mode?: 'grid' | 'list'; // 显示模式：网格或列表
  showDescription?: boolean; // 是否显示描述
}

export default function BloodTypeSelector({
  selectedBloodType,
  onSelect,
  mode = 'grid',
  showDescription = false
}: BloodTypeSelectorProps) {
  
  const bloodTypes = getAllBloodTypes();

  const handleSelect = (bloodType: BloodType) => {
    onSelect(bloodType);
  };

  if (mode === 'list') {
    return (
      <View className="bloodtype-selector list-mode">
        <View className="bloodtype-list">
          {bloodTypes.map((bloodType) => (
            <View
              key={bloodType.id}
              className={`bloodtype-item list-item ${
                selectedBloodType === bloodType.id ? 'selected' : ''
              }`}
              onClick={() => handleSelect(bloodType.id)}
            >
              <View className="item-icon">
                <Text className="bloodtype-emoji">{bloodType.icon}</Text>
              </View>
              
              <View className="item-content">
                <View className="item-header">
                  <Text className="bloodtype-name">{bloodType.name}</Text>
                  <Text className="bloodtype-symbol">{bloodType.symbol}型</Text>
                </View>
                
                <Text className="bloodtype-frequency">{bloodType.frequency}</Text>
                <Text className="bloodtype-origin">{bloodType.origin}</Text>
                
                {showDescription && (
                  <Text className="bloodtype-description">
                    了解你的血型性格特征
                  </Text>
                )}
              </View>
              
              {selectedBloodType === bloodType.id && (
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
    <View className="bloodtype-selector grid-mode">
      <View className="bloodtype-grid">
        {bloodTypes.map((bloodType) => (
          <View
            key={bloodType.id}
            className={`bloodtype-card ${
              selectedBloodType === bloodType.id ? 'selected' : ''
            }`}
            onClick={() => handleSelect(bloodType.id)}
          >
            <View className="card-icon">
              <Text className="bloodtype-emoji">{bloodType.icon}</Text>
            </View>
            
            <View className="card-content">
              <Text className="bloodtype-name">{bloodType.name}</Text>
              <Text className="bloodtype-symbol">{bloodType.symbol}型</Text>
              <Text className="bloodtype-frequency">{bloodType.frequency}</Text>
            </View>
            
            {selectedBloodType === bloodType.id && (
              <View className="selected-overlay">
                <Text className="selected-text">已选择</Text>
              </View>
            )}
          </View>
        ))}
      </View>
      
      {selectedBloodType && (
        <View className="selection-summary">
          <Text className="summary-text">
            已选择: {bloodTypes.find(bt => bt.id === selectedBloodType)?.name}
          </Text>
        </View>
      )}
    </View>
  );
}