import { Colors } from "@/constants/Colors";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { IconSymbol, IconSymbolName } from "./IconSymbol";

type FloatingActionButtonPropsType = {
  icon: IconSymbolName;
} & PressableProps;

export function FloatingActionButton({
  onPress,
  icon,
  ...rest
}: FloatingActionButtonPropsType) {
  const color = Colors.dark.primary;
  return (
    <View style={styles.outerShadow}>
      <View style={styles.innerShadow}>
        <Pressable
          onPress={onPress}
          {...rest}
          style={styles.container}
          android_ripple={{ color: Colors.dark.primaryOpacity[12] }}
        >
          <IconSymbol size={28} name={icon} color={color} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.surfaceContainerHigh,
    padding: 16,
  },
  outerShadow: {
    position: "absolute",
    bottom: 16,
    right: 16,
    borderRadius: 16,

    shadowColor: Colors.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },

  innerShadow: {
    borderRadius: 16,

    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
  },
});
