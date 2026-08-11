jest.mock('react-native-mmkv', () => {
  const stores = {};
  const instance = id => {
    const store = (stores[id] ??= {});
    return {
      getString: jest.fn(key => store[key]),
      set: jest.fn((key, value) => {
        store[key] = value;
      }),
      getNumber: jest.fn(key => store[key]),
      getBoolean: jest.fn(key => store[key]),
      remove: jest.fn(key => {
        delete store[key];
      }),
      clearAll: jest.fn(() => {
        Object.keys(store).forEach(k => delete store[k]);
      }),
    };
  };
  return {
    MMKV: jest.fn().mockImplementation(({ id } = {}) => instance(id ?? 'default')),
    createMMKV: jest.fn(({ id } = {}) => instance(id ?? 'default')),
  };
});

jest.mock('react-native-localize', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en', countryCode: 'US' }]),
}));

jest.mock('tsyringe', () => ({
  container: {
    // Providers resolve use cases at mount; an undefined resolve would crash every screen render.
    resolve: jest.fn(() => ({ execute: jest.fn() })),
    registerSingleton: jest.fn(),
    register: jest.fn(),
  },
  injectable: () => target => target,
  inject: () => () => {},
}));

// reflect-metadata stays real: the babel decorator transform emits Reflect.metadata() calls.
require('reflect-metadata');
