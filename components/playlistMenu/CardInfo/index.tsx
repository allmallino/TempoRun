import ThemedText from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

type CardInfoProps = {
  title: string;
  text: string;
};

export default function CardInfo({ title, text }: CardInfoProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      <ThemedText>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
});
