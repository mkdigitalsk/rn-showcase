import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getLocales } from 'react-native-localize';
import { container } from 'tsyringe';
import { en, StringKey } from './en';
import { sk } from './sk';
import { TYPES } from '../../../app/diTypes';
import { GetLanguageUseCase } from '../../../domain/useCases/settings/GetLanguageUseCase';
import { SetLanguageUseCase } from '../../../domain/useCases/settings/SetLanguageUseCase';

export type Language = 'en' | 'sk';

const SUPPORTED_LANGUAGES: Language[] = ['en', 'sk'];

const strings: Record<Language, Record<StringKey, string>> = {
  en,
  sk,
};

function getDeviceLanguage(): Language {
  const locales = getLocales();
  const tag = locales[0]?.languageCode?.toLowerCase();
  return SUPPORTED_LANGUAGES.find(l => l === tag) ?? 'en';
}

interface StringsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: StringKey) => string;
}

const StringsContext = createContext<StringsContextType | null>(null);

interface StringsProviderProps {
  children: React.ReactNode;
}

export const StringsProvider = ({ children }: StringsProviderProps) => {
  const getLanguageUseCase = useMemo(
    () => container.resolve<GetLanguageUseCase>(TYPES.GetLanguageUseCase), [],
  );
  const setLanguageUseCase = useMemo(
    () => container.resolve<SetLanguageUseCase>(TYPES.SetLanguageUseCase), [],
  );

  const [language, setLanguageState] = useState<Language>(
    () => getLanguageUseCase.execute() ?? getDeviceLanguage(),
  );

  const setLanguage = useCallback((lang: Language) => {
    setLanguageUseCase.execute(lang);
    setLanguageState(lang);
  }, [setLanguageUseCase]);

  const t = useCallback(
    (key: StringKey): string => {
      return strings[language][key] ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
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
