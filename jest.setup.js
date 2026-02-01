// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => {
  const store = {};
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      getString: jest.fn((key) => store[key]),
      set: jest.fn((key, value) => { store[key] = value; }),
      getNumber: jest.fn((key) => store[key]),
      getBoolean: jest.fn((key) => store[key]),
      delete: jest.fn((key) => { delete store[key]; }),
      clearAll: jest.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
    })),
  };
});

// Mock react-native-localize
jest.mock('react-native-localize', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en', countryCode: 'US' }]),
}));

// Mock tsyringe
jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn(),
    registerSingleton: jest.fn(),
    register: jest.fn(),
  },
  injectable: () => (target) => target,
  inject: () => () => {},
}));

// Mock reflect-metadata
jest.mock('reflect-metadata', () => {});
