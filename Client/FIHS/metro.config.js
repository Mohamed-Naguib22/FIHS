const { getDefaultConfig } = require("expo/metro-config");
const defaultSourceExts =
require("metro-config/src/defaults/defaults").sourceExts;
const sourceExts = [
"jsx",
"js",
"ts",
"tsx",
"json",
"svg",
"d.ts",
"mjs",
"cjs",
].concat(defaultSourceExts);
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
// [Web-only]: Enables CSS support in Metro.
isCSSEnabled: true,
});
config.resolver.sourceExts = sourceExts;
module.exports = config;