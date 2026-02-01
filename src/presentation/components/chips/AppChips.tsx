import React from 'react';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '../../foundation/theme';

interface AppFilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const AppFilterChip: React.FC<AppFilterChipProps> = ({
  label,
  selected,
  onPress,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Chip
      mode="flat"
      selected={selected}
      showSelectedCheck={selected}
      onPress={onPress}
      textStyle={{ color: selected ? theme.colors.onPrimary : theme.colors.onSurface }}
      style={{
        backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
        borderWidth: 1,
        borderColor: selected ? theme.colors.primary : theme.colors.outline,
      }}
    >
      {label}
    </Chip>
  );
};

interface AppAssistChipProps {
  label: string;
  onPress: () => void;
  icon?: string;
}

export const AppAssistChip: React.FC<AppAssistChipProps> = ({
  label,
  onPress,
  icon,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Chip
      mode="outlined"
      onPress={onPress}
      icon={icon}
      style={{
        borderColor: theme.colors.outline,
      }}
    >
      {label}
    </Chip>
  );
};

interface AppInputChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  onClose?: () => void;
}

export const AppInputChip: React.FC<AppInputChipProps> = ({
  label,
  selected,
  onPress,
  onClose,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Chip
      mode="flat"
      selected={selected}
      onPress={onPress}
      onClose={onClose}
      textStyle={{ color: selected ? theme.colors.onPrimary : theme.colors.onSurface }}
      style={{
        backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
        borderWidth: 1,
        borderColor: selected ? theme.colors.primary : theme.colors.outline,
      }}
    >
      {label}
    </Chip>
  );
};

interface AppSuggestionChipProps {
  label: string;
  onPress: () => void;
}

export const AppSuggestionChip: React.FC<AppSuggestionChipProps> = ({
  label,
  onPress,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Chip
      mode="outlined"
      onPress={onPress}
      style={{
        borderColor: theme.colors.outline,
      }}
    >
      {label}
    </Chip>
  );
};
