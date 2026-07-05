module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest.setup.js', 'jest.config.js', '**/*.test.{ts,tsx,js,jsx}', 'src/__tests__/**'],
      env: {jest: true},
    },
    {
      // The core rule flags TS method overloads as dupes; the TS compiler catches real ones.
      files: ['**/*.{ts,tsx}'],
      rules: {
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'error',
      },
    },
  ],
};
