// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "person.fill": "person",
  "play.fill": "directions-run",
  "music.note": "music-note",
  headphones: "headset",
  gear: "settings",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "watch.analog": "access-time",
  ellipsis: "more-vert",
  plus: "add",
  "arrow.left": "arrow-back",
  "eye.fill": "visibility",
  "eye.slash.fill": "visibility-off",
  globe: "language",
  moon: "dark-mode",
  "sun.max": "light-mode",
  "xmark.circle": "close",
  "person.crop.circle.fill": "account-circle",
  "map.fill": "map",
  speedometer: "speed",
  "location.north.line.fill": "route",
  stop: "stop",
  "minus.circle.fill": "delete",
  "person.crop.circle.fill.badge.minus": "no-accounts",
  "envelope.fill": "email",
  "lock.fill": "lock",
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof MaterialIcons>["name"]
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
