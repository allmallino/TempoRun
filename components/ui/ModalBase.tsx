import React from "react";
import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { Colors } from "@/constants/Colors";

type ModalBaseProps = {
  visible: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalBase({
  visible,
  style,
  children,
  onClose,
}: ModalBaseProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={[styles.modal, style]}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <ElevatedContainer elevation={2} style={styles.container}>
            {children}
          </ElevatedContainer>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.shadowBackdrop,
  },
});
