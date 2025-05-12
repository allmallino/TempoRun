import React, { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import SettingButton from "../SettingButton";
import { IconSymbolName } from "@/components/ui/IconSymbol";

type SettingButtonWithConfirmationModalProps = {
  title: string;
  icon: IconSymbolName;
  onConfirm: () => void;
};

export default function SettingButtonWithConfirmationModal({
  title,
  icon,
  onConfirm,
}: SettingButtonWithConfirmationModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <ConfirmationModal
        visible={isModalVisible}
        onConfirm={onConfirm}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
      <SettingButton
        title={title}
        icon={icon}
        onPress={() => {
          setIsModalVisible(true);
        }}
      />
    </>
  );
}
