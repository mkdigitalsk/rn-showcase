import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { useAppTheme } from '../foundation/theme';

interface AppLinearProgressProps {
  progress?: number;
  indeterminate?: boolean;
}

export const AppLinearProgress: React.FC<AppLinearProgressProps> = ({
  progress,
  indeterminate = false,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <ProgressBar
      progress={progress}
      indeterminate={indeterminate}
      color={theme.colors.primary}
      style={{ backgroundColor: theme.colors.neutral20 }}
    />
  );
};
