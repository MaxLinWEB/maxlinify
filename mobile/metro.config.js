const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Watch the shared package
config.watchFolders = [path.resolve(__dirname, '../shared')];

// Resolve shared package from parent directory
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

// Allow importing from outside the project root
config.resolver.extraNodeModules = {
  '@maxlinify/shared': path.resolve(__dirname, '../shared'),
};

module.exports = config;
