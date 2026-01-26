import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { lightColorScheme, darkColorScheme } from './colors';
import { typography } from './typography';

// Light theme (LightColorPalette equivalent)
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColorScheme,
  },

};

// Dark theme (DarkColorPalette equivalent)
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColorScheme,
  },
};