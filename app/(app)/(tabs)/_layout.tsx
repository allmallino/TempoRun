import { Tabs, useSegments } from "expo-router";
import React, { useContext } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { pagesToHideTabBar } from "@/constants/Navigation";
import { Theme } from "@/theme/types";
import { StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const page = useSegments().join("/");
  const styles = useTheme(getStyle);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const i18nRoot = "app:tabs";
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.onSurfaceVariant,
        headerShown: false,
        tabBarStyle: {
          display: pagesToHideTabBar.includes(page) ? "none" : "flex",
          ...styles.container,
        },
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
  });
