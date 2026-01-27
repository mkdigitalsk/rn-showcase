import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleProp, ViewStyle, TextStyle, KeyboardTypeOptions } from 'react-native';
import { useAppTheme } from '../foundation/theme';

interface AppTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  left?: React.ReactNode;
  right?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
  helperText?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onSubmitEditing?: () => void;
}

export const AppTextField: React.FC<AppTextFieldProps> = ({
  value,
  onChangeText,
  style,
  label,
  placeholder,
  disabled = false,
  readOnly = false,
  error = false,
  multiline = false,
  numberOfLines = 1,
  left,
  right,
  showClearButton = true,
  onClear,
  helperText,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize,
  onSubmitEditing,
}) => {
  const theme = useAppTheme();

  const clearButton =
    right ||
    (showClearButton && value.length > 0 ? (
      <TextInput.Icon
        icon="close"
        onPress={() => {
          onChangeText('');
          onClear?.();
        }}
      />
    ) : undefined);

  return (
    <TextInput
      mode="outlined"
      value={value}
      onChangeText={onChangeText}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      editable={!readOnly}
      error={error}
      multiline={multiline}
      numberOfLines={numberOfLines}
      left={left}
      right={clearButton}
      style={style}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      onSubmitEditing={onSubmitEditing}
      outlineColor={theme.colors.neutral80}
      activeOutlineColor={theme.colors.primary}
      textColor={theme.colors.onSurface}
      placeholderTextColor={theme.colors.neutral80}
    />
  );
};
