const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

const config = getDefaultConfig(__dirname)

config.resolver.sourceExts.push("sql")
config.resolver.assetExts.push("tflite")

module.exports = withNativeWind(config, {
  input: "./app/global.css",
  configPath: "./tailwind.config.ts",
})
