import TextInput from "@/components/TextInput";
import { BaseModal, BaseModalProps } from "@/components/Modal/BaseModal";
import Button from "@/components/Button/Button";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

export interface OnGeneratePressArgs {
  name: string;
  url: string;
}
export interface QRCodeGenerateModalProps
  extends Pick<BaseModalProps, "isVisible" | "onClose"> {
  onGeneratePress?: (args: OnGeneratePressArgs) => void;
}

export function QRCodeGenerateModal({
  isVisible,
  onClose,
  onGeneratePress,
}: QRCodeGenerateModalProps) {
  const [name, setName] = React.useState("");
  const [url, setURL] = React.useState("");

  function handleGenerate() {
    onGeneratePress?.({
      name,
      url,
    });

    setName("");
    setURL("");
  }

  return (
    <BaseModal title="Generate QR code" isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text>Name</Text>
        <View style={styles.spacer4} />
        <TextInput
          value={name}
          placeholder="Instagram"
          onChangeText={setName}
        />
        <View style={styles.spacer8} />

        <Text>URL</Text>
        <View style={styles.spacer4} />
        <TextInput
          value={url}
          placeholder="https://www.instagram.com/<your_id>/"
          onChangeText={setURL}
        />

        <View style={styles.spacer32} />

        <Button
          title="Generate"
          buttonType="primary"
          state="default"
          onPress={handleGenerate}
        />
        <View style={styles.spacer8} />
        <Button
          title="Cancel"
          buttonType="link"
          state="default"
          onPress={onClose}
        />
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  container: {},
  spacer4: {
    height: 4,
  },
  spacer8: {
    height: 8,
  },
  spacer32: {
    height: 32,
  },
});
