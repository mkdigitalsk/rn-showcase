module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/src/**/__tests__/**/*.test.(ts|tsx)', '**/src/**/*.test.(ts|tsx)'],
};
