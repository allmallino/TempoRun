export default ({ config }) => ({
  ...config,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.temporun.temporun",
    backgroundColor: "#1A1C18",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSLocationWhenInUseUsageDescription:
        "This permission is needed to display your current location on the map",
    },
    googleServicesFile:
      process.env.GOOGLE_SERVICES_PLIST ?? "./GoogleService-Info.plist",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon.png",
      backgroundColor: "#1A1C18",
    },
    backgroundColor: "#1A1C18",
    package: "com.temporun.temporun",
    permissions: [
      "ACCESS_FINE_LOCATION",
      "ACCESS_COARSE_LOCATION",
      "ACCESS_BACKGROUND_LOCATION",
    ],
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
    softwareKeyboardLayoutMode: "pan",
    allowBackup: true,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
});
