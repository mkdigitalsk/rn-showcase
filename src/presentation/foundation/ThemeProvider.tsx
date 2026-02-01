import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { ThemeMode } from './themeMode';
import { lightTheme, darkTheme } from './theme';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider = ({ children, defaultMode = 'system' }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode);

  const isDark = useMemo(() => {
    switch (themeMode) {
      case 'light': return false;
      case 'dark': return true;
      case 'system': return systemColorScheme === 'dark';
    }
  }, [themeMode, systemColorScheme]);

  const theme = isDark ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({ themeMode, setThemeMode, isDark }),
    [themeMode, isDark],
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
