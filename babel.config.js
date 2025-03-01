export const presets = [
  '@babel/preset-typescript',
  'module:@react-native/babel-preset'
];

export const plugins = [
  ["@babel/plugin-proposal-decorators", { "legacy": true },],
  ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ["babel-plugin-transform-typescript-metadata"]
];