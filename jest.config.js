module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/src/**/__tests__/**/*.test.(ts|tsx)', '**/src/**/*.test.(ts|tsx)'],
  transformIgnorePatterns: ['node_modules/(?!(?:@?react-native|@react-navigation|react-native-.*|@op-engineering|@notifee)/)'],
};
