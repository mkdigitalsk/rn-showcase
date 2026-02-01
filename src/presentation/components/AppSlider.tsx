import React from 'react';
import Slider from '@react-native-community/slider';
import { useAppTheme } from '../foundation/theme';

interface AppSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
}

export const AppSlider: React.FC<AppSliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 1,
  step,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Slider
      value={value}
      onValueChange={onValueChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      minimumTrackTintColor={theme.colors.primary}
      maximumTrackTintColor={theme.colors.neutral20}
      thumbTintColor={theme.colors.primary}
    />
  );
};
