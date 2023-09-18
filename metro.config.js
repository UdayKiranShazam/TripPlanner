const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// const defaultSourceExts =
//   require('metro-config/src/defaults/defaults').sourceExts;
// module.exports = {
//   transformer: {
//     getTransformOptions: () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
//   resolver: {
//     sourceExts: process.env.RN_SRC_EXT
//       ? [...process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts), 'cjs'] // <-- cjs added here
//       : [...defaultSourceExts, 'cjs'], // <-- cjs added here
//   },
//};
