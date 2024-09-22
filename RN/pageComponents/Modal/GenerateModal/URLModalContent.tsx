import { useState } from "react";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button/Button";
import { HorizontalSpacer } from "@/components/Spacer/HorizontalSpacer";
import { GenerateQRCodeInput } from "@/types";

export interface URLModalContentProps {
  onGeneratePress?: (input: GenerateQRCodeInput) => void;
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
      <HorizontalSpacer height={8} />
      <TextInput
        label="URL"
        value={url}
        errorMessage={errorMessages.url}
        placeholder="https://www.instagram.com/<your_id>/"
        onChangeText={setURL}
      />

      <HorizontalSpacer height={32} />

      <Button
        title="Generate"
        buttonType="primary"
        state="default"
        onPress={handleURLGenerate}
      />
      <HorizontalSpacer height={8} />
      <Button
        title="Cancel"
        buttonType="link"
        state="default"
        onPress={handleCancel}
      />
    </>
  );
}
