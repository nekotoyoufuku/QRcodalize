import TextInput from "@/components/TextInput";
import Button from "@/components/Button/Button";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { OnGeneratePressArgs } from "@/types";

export interface URLModalContentProps {
  onGeneratePress?: (args: OnGeneratePressArgs) => void;
  onCancel?: () => void;
}

export function URLModalContent({
  onGeneratePress,
  onCancel,
}: URLModalContentProps) {
  const [name, setName] = useState("");
  const [url, setURL] = useState("");

  function resetForm() {
    setName("");
    setURL("");
  }

  function handleURLGenerate() {
    onGeneratePress?.({
      name,
      url,
    });

    resetForm();
  }

  function handleCancel() {
    onCancel?.();

    resetForm();
  }

  return (
    <>
      <TextInput
        label="Name"
        value={name}
        placeholder="Instagram"
        onChangeText={setName}
      />
      <View style={styles.spacer8} />
      <TextInput
        label="URL"
        value={url}
        placeholder="https://www.instagram.com/<your_id>/"
        onChangeText={setURL}
      />

      <View style={styles.spacer32} />

      <Button
        title="Generate"
        buttonType="primary"
        state="default"
        onPress={handleURLGenerate}
      />
      <View style={styles.spacer8} />
      <Button
        title="Cancel"
        buttonType="link"
        state="default"
        onPress={handleCancel}
      />
    </>
  );
}

const styles = StyleSheet.create({
  spacer8: {
    height: 8,
  },
  spacer32: {
    height: 32,
  },
});
