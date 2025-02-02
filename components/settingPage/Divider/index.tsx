import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export default function Divider({ color = Colors.white }: { color?: string }) {
  return <View style={[styles.container, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1,
  },
});
