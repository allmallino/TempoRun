import ThemedText from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

type ResultTableRowProps = {
  title: string;
  value: string;
};

export default function ResultTableRow({ title, value }: ResultTableRowProps) {
  return (
    <View style={styles.container}>
      <ThemedText>{`${title}:`}</ThemedText>
      <ThemedText type="subtitle">{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
