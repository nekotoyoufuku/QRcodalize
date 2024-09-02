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
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    url: "",
  });

  function resetForm() {
    setName("");
    setURL("");
  }

  function validateInputs() {
    const isNameEmpty = name === "";
    const isURLEmpty = url === "";

    if (!isNameEmpty && !isURLEmpty) {
      return true;
    }

    setErrorMessages({
      name: isNameEmpty ? "Name is required" : "",
      url: isURLEmpty ? "URL is required" : "",
    });

    return false;
  }

  function handleURLGenerate() {
    const isValidated = validateInputs();

    if (isValidated) {
      onGeneratePress?.({
        name,
        url,
      });

      resetForm();
    }
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
        errorMessage={errorMessages.name}
        placeholder="Instagram"
        onChangeText={setName}
      />
      <View style={styles.spacer8} />
      <TextInput
        label="URL"
        value={url}
        errorMessage={errorMessages.url}
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
