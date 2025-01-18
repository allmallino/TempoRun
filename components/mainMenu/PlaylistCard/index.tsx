import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

type PlaylistCardProps = {
  name: string;
};

export default function PlaylistCard({ name }: PlaylistCardProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{name}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    borderColor: Colors.dark.outlineVariant,
    borderWidth: 1,
    padding: 16,
  },
  text: {
    color: Colors.dark.onSurface,
  },
});
