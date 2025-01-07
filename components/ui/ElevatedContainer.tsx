import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

export function ElevatedContainer({
  style,
  children
}:ViewProps) {

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.dark.surfaceContainerHigh,
    borderRadius:16,
    width:"100%",
    alignItems:"center",

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
  },
});
