import { StyleSheet, View } from "react-native";
import Timer from "../Timer";
import Pacer from "../Pacer";
import Distancer from "../Distancer";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Timer />
      <Pacer />
      <Distancer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 32,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
