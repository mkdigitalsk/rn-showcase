import { MD3LightTheme } from "react-native-paper";


export const FontWeights = {
    Bold: '700' as '700',
    Medium: '500' as '500',
    Regular: '400' as '400',
}

export const typography = {
    ...MD3LightTheme.fonts,
    headlineMedium: {
        ...MD3LightTheme.fonts.headlineMedium,
        fontSize: 30,
        fontWeight: FontWeights.Bold
    },
    bodyLarge: {
        ...MD3LightTheme.fonts.bodyLarge,
        fontSize: 16,
    },
    labelLarge: {
        ...MD3LightTheme.fonts.labelLarge,
        fontSize: 14,
        fontWeight: FontWeights.Medium
    }
}