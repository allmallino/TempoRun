import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import ua from "./ua";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  en: en,
  ua: ua,
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    const userLanguage = Localization.getLocales()[0].languageCode || "en";
    savedLanguage = Object.keys(resources).includes(userLanguage)
      ? userLanguage
      : "en";
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
