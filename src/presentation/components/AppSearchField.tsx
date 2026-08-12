import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import { useAppTheme } from '../foundation/theme';

interface AppSearchFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSearch?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AppSearchField: React.FC<AppSearchFieldProps> = ({ value, onChangeText, placeholder = 'Search...', onSearch, style }) => {
  const theme = useAppTheme();

  return (
    <Searchbar
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onSubmitEditing={onSearch}
      returnKeyType="search"
      style={[{ backgroundColor: theme.colors.surface }, style]}
      inputStyle={{ color: theme.colors.neutral100 }}
      placeholderTextColor={theme.colors.neutral60}
      iconColor={theme.colors.neutral80}
      // Paper draws a shadow under the bar by default; the sibling apps render a flat surface.
      elevation={0}
    />
  );
};
