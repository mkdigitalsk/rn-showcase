import React from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { useAppTheme } from '../../foundation/theme';

interface AppSegmentedButtonProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onValueChanged: (value: string) => void;
}

export const AppSegmentedButton: React.FC<AppSegmentedButtonProps> = ({
  options,
  selectedValue,
  onValueChanged,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <SegmentedButtons
      value={selectedValue}
      onValueChange={onValueChanged}
      buttons={options.map(opt => ({
        value: opt.value,
        label: opt.label,
        checkedColor: theme.colors.onPrimary,
        uncheckedColor: theme.colors.onSurface,
        style: {
          backgroundColor: selectedValue === opt.value
            ? theme.colors.primary
            : theme.colors.surface,
          borderColor: selectedValue === opt.value
            ? theme.colors.primary
            : theme.colors.outline,
        },
      }))}
    />
  );
};
