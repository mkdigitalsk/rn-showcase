module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest.setup.js', 'jest.config.js', '**/*.test.{ts,tsx,js,jsx}', 'src/__tests__/**'],
      env: { jest: true },
    },
    {
      // The core rule flags TS method overloads as dupes; the TS compiler catches real ones.
      files: ['**/*.{ts,tsx}'],
      extends: ['plugin:@typescript-eslint/recommended-type-checked'],
      parserOptions: { projectService: true, tsconfigRootDir: __dirname },
      rules: {
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'error',
        // A domain interface returning Promise makes the implementation async whether it awaits or not.
        '@typescript-eslint/require-await': 'off',
      },
    },
    {
      // `expect(mock.method)` reads a method off its object, which is the whole point of the assertion.
      files: ['**/*.test.{ts,tsx}', 'src/__tests__/**'],
      rules: { '@typescript-eslint/unbound-method': 'off' },
    },
  ],
};
