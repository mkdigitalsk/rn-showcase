import { MD3LightTheme, MD3DarkTheme, useTheme } from 'react-native-paper';
import { lightColorScheme, darkColorScheme } from './colors';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColorScheme,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColorScheme,
  },
};

// Type for our custom theme
export type AppTheme = typeof lightTheme;

// Hook to get typed theme
export const useAppTheme = () => useTheme<AppTheme>();

// Hook to get colors directly
export const useAppColors = () => useAppTheme().colors;