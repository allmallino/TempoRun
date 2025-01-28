import { Tabs, useSegments } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { pagesToHideTabBar } from "@/constants/Navigation";

export default function TabLayout() {
  const page = useSegments().join("/");
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.onSurfaceVariant,
        headerShown: false,
        tabBarStyle: {
          display: pagesToHideTabBar.includes(page) ? "none" : "flex",
          backgroundColor: Colors.dark.surfaceContainer,
          height: 70,
          paddingTop: 12,
        },
      }}
    >
      <Tabs.Screen
        name="statistic"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mode"
        options={{
          title: "Mode",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="music.note" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="directions.run" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(playlists)"
        options={{
          title: "Playlists",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="headphones" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appSettings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
