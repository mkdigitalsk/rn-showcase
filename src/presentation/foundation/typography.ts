import { MD3LightTheme } from 'react-native-paper';

export const FontWeights = {
  Bold: '700' as const,
  Medium: '500' as const,
  Regular: '400' as const,
};

export const typography = {
  ...MD3LightTheme.fonts,
  headlineMedium: {
    ...MD3LightTheme.fonts.headlineMedium,
    fontSize: 30,
    fontWeight: FontWeights.Bold,
  },
  bodyLarge: {
    ...MD3LightTheme.fonts.bodyLarge,
    fontSize: 16,
  },
  labelLarge: {
    ...MD3LightTheme.fonts.labelLarge,
    fontSize: 14,
    fontWeight: FontWeights.Medium,
  },
};
