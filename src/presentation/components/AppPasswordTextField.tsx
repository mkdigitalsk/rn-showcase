import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { AppTextField } from './AppTextField';

interface AppPasswordTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  onSubmitEditing?: () => void;
}

export const AppPasswordTextField: React.FC<AppPasswordTextFieldProps> = ({ value, onChangeText, ...rest }) => {
  const [visible, setVisible] = useState(false);

  return (
    <AppTextField
      {...rest}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!visible}
      showClearButton={false}
      autoCapitalize="none"
      right={<TextInput.Icon icon={visible ? 'eye-off' : 'eye'} onPress={() => setVisible(current => !current)} />}
    />
  );
};
