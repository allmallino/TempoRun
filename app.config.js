export default ({ config }) => ({
  ...config,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.temporun.temporun",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    googleServicesFile:
      process.env.GOOGLE_SERVICES_PLIST ?? "./GoogleService-Info.plist",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon.png",
      backgroundColor: "#1A1C18",
    },
    package: "com.temporun.temporun",
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
  },
});
