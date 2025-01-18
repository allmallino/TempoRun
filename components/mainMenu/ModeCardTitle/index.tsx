import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

type ModeCardTitleProps = {
  name: string;
};

export default function ModeCardTitle({ name }: ModeCardTitleProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.text}>
        Mode:{" "}
      </ThemedText>
      <ThemedText style={styles.text}>{name}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    color: Colors.dark.onSurface,
  },
});
