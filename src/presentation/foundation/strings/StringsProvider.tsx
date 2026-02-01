import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { en, StringKey } from './en';
import { sk } from './sk';

export type Language = 'en' | 'sk';

const strings: Record<Language, Record<StringKey, string>> = {
  en,
  sk,
};

interface StringsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: StringKey) => string;
}

const StringsContext = createContext<StringsContextType | null>(null);

interface StringsProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const StringsProvider = ({ children, defaultLanguage = 'en' }: StringsProviderProps) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = useCallback(
    (key: StringKey): string => {
      return strings[language][key] ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return (
    <StringsContext.Provider value={value}>
      {children}
    </StringsContext.Provider>
  );
};

export const useStrings = (): StringsContextType => {
  const context = useContext(StringsContext);
  if (!context) {
    throw new Error('useStrings must be used within StringsProvider');
  }
  return context;
};
