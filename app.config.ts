import type { ConfigContext, ExpoConfig } from "@expo/config"

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Expo Starter",
  slug: "expostarter",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "ltstarter",
  userInterfaceStyle: "dark",
  runtimeVersion: {
    policy: "appVersion",
  },
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  plugins: ["@react-native-voice/voice", ["expo-router"], ["expo-av",]],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.expostarter.base",
    infoPlist: {
      UIBackgroundModes: [
          "audio"
      ],
      NSMicrophoneUsageDescription: "This app uses the Microphone to record your voice.",
      NSSpeechRecognitionUsageDescription: "This app uses SpeechRecognition to generate text from your voice.",
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.expostarter.base",
    permissions: ["android.permission.RECORD_AUDIO"]
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/images/favicon.png",
  },
  experiments: {
    typedRoutes: true,
    baseUrl: "/expo-template",
  },
  extra: {
    eas: {
      projectId: "",
    },
  },
  owner: "*",
})
