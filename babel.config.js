module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-reanimated/plugin', 'react-native-paper/babel'],
    },
  },
};
