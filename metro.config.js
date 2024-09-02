const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig(__dirname);

//   // Extending the default configuration to include HTML files
//   const updatedConfig = {
//     transformer: {
//       // Preserve the existing transformer settings
//       ...defaultConfig.transformer,
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false,
//         },
//       }),
//     },
//     resolver: {
//       // Adding 'html' to assetExts
//       assetExts: [...defaultConfig.resolver.assetExts, 'html'],
//       sourceExts: [...defaultConfig.resolver.sourceExts], // Preserving existing source extensions
//     },
//   };

//   return mergeConfig(defaultConfig, updatedConfig);
// })();
