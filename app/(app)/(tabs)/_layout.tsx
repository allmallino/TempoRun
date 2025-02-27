import { Tabs, useSegments } from "expo-router";
import React, { useContext } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { pagesToHideTabBar } from "@/constants/Navigation";
import { Theme } from "@/theme/types";
import { StyleSheet, View } from "react-native";
import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import { useTranslation } from "react-i18next";
import LoadingScreen from "@/components/LoadingScreen";
import { useSelector } from "react-redux";
import { getLoaderVisibility } from "@/state/loader/selectors";

export default function TabLayout() {
  const page = useSegments().join("/");
  const styles = useTheme(getStyle);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const i18nRoot = "app:tabs";
  const loaderIsVisible = useSelector(getLoaderVisibility);

  return (
    <View style={styles.mainContainer}>
      <Tabs
        screenOptions={{
          sceneStyle: styles.sceneContainer,
          tabBarActiveTintColor: theme.onSurfaceVariant,
          headerShown: false,
          tabBarStyle: {
            display: pagesToHideTabBar.includes(page) ? "none" : "flex",
            ...styles.container,
          },
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="statistic"
          options={{
            title: t(`${i18nRoot}.stats`),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mode"
          options={{
            title: t(`${i18nRoot}.mode`),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="music.note" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: t(`${i18nRoot}.menu`),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="directions.run" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(playlists)"
          options={{
            title: t(`${i18nRoot}.playlists`),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="headphones" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="appSettings"
          options={{
            title: t(`${i18nRoot}.settings`),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gear" color={color} />
            ),
          }}
        />
      </Tabs>
      {loaderIsVisible && <LoadingScreen />}
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surfaceContainer,
      height: 70,
      paddingTop: 12,
      borderTopWidth: 0,
    },
    mainContainer: {
      flex: 1,
      paddingTop: 45,
      backgroundColor: theme.surfaceContainerLow,
    },
    sceneContainer: {
      paddingHorizontal: 16,
      backgroundColor: "transparent",
    },
  });
