import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import { container } from 'tsyringe';
import { ThemeMode } from './themeMode';
import { lightTheme, darkTheme } from './theme';
import { TYPES } from '../../app/diTypes';
import { GetThemeModeUseCase } from '../../domain/useCases/settings/GetThemeModeUseCase';
import { SetThemeModeUseCase } from '../../domain/useCases/settings/SetThemeModeUseCase';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  navigationTheme: NavigationTheme;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();

  const getThemeModeUseCase = useMemo(
    () => container.resolve<GetThemeModeUseCase>(TYPES.GetThemeModeUseCase), [],
  );
  const setThemeModeUseCase = useMemo(
    () => container.resolve<SetThemeModeUseCase>(TYPES.SetThemeModeUseCase), [],
  );

  const [themeMode, setThemeModeState] = useState<ThemeMode>(
    () => getThemeModeUseCase.execute(),
  );

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeUseCase.execute(mode);
    setThemeModeState(mode);
  }, [setThemeModeUseCase]);

  const isDark = useMemo(() => {
    switch (themeMode) {
      case 'light': return false;
      case 'dark': return true;
      case 'system': return systemColorScheme === 'dark';
    }
  }, [themeMode, systemColorScheme]);

  const theme = isDark ? darkTheme : lightTheme;

  const navigationTheme: NavigationTheme = useMemo(() => {
    const base = isDark ? NavigationDarkTheme : NavigationDefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.onSurface,
        border: theme.colors.outline,
        notification: theme.colors.error,
      },
    };
  }, [isDark, theme]);

  const value = useMemo(
    () => ({ themeMode, setThemeMode, isDark, navigationTheme }),
    [themeMode, setThemeMode, isDark, navigationTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
};
