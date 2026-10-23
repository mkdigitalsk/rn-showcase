module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  /** A worktree under .claude/ is another checkout of this repo, whose tests belong to its own run. */
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.claude/'],
  testMatch: ['**/src/**/__tests__/**/*.test.(ts|tsx)', '**/src/**/*.test.(ts|tsx)'],
  transformIgnorePatterns: ['node_modules/(?!(?:@?react-native|@react-navigation|react-native-.*|@op-engineering|@notifee)/)'],
};
