import React, { useState } from "react";
import InputModal from "../InputModal";
import SettingButton from "../SettingButton";
import { IconSymbolName } from "@/components/ui/IconSymbol";

type SettingButtonWithConfirmationModalProps = {
  title: string;
  type: "email" | "password";
  icon: IconSymbolName;
  onSave: (value: string) => void;
};

export default function SettingButtonWithInputModal({
  title,
  type,
  icon,
  onSave,
}: SettingButtonWithConfirmationModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <InputModal
        type={type}
        visible={isModalVisible}
        onSave={onSave}
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
