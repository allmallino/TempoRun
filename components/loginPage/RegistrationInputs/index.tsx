import ThemedButton from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function RegistrationInputs() {
  const [name, setName] = useState("");

  const handleClick = () => {};

  return (
    <View style={styles.container}>
      <ThemedInput value={name} onChangeText={setName} label="Your name" />

      <View style={styles.buttonContainer}>
        <ThemedButton
          title="Sign In"
          type="filled"
          disabled={name.length === 0}
          onPress={handleClick}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 48,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
