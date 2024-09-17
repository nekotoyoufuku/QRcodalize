import { useEffect, useState } from "react";
import { View } from "react-native";
import Button from "@/components/Button/Button";
import { BaseModal, BaseModalProps } from "@/components/Modal/BaseModal";
import { HorizontalSpacer } from "@/components/Spacer/HorizontalSpacer";
import TextInput from "@/components/TextInput";
import { renameQRCode } from "@/repositories/QRCodeData/renameQRCode";

export interface RenameModalProps
  extends Pick<BaseModalProps, "isVisible" | "onClose"> {
  id: string;
  name: string;
  onRenamed: () => void;
}

export function RenameModal({
  id,
  name,
  isVisible,
  onRenamed,
  onClose,
}: RenameModalProps) {
  const [text, setText] = useState(name);
  const [errorMessages, setErrorMessages] = useState("");

  useEffect(() => {
    setText(name);
  }, [name]);

  function reset() {
    setErrorMessages("");
  }

  function validateInputs() {
    const isNameEmpty = name === "";

    if (!isNameEmpty) {
      return true;
    }

    setErrorMessages(isNameEmpty ? "Name is required" : "");

    return false;
  }

  function handleClose() {
    onClose();
    reset();
  }

  function handleSave() {
    const isValidated = validateInputs();

    if (isValidated) {
      renameQRCode({
        id,
        name: text,
      });

      reset();
      onRenamed();
      onClose();
    }
  }

  return (
    <BaseModal isVisible={isVisible} onClose={handleClose}>
      <View>
        <TextInput
          label="Name"
          value={text}
          errorMessage={errorMessages}
          placeholder="Instagram"
          onChangeText={setText}
        />

        <HorizontalSpacer height={32} />

        <Button
          title="Save"
          buttonType="primary"
          state={text.length <= 0 ? "disabled" : "default"}
          onPress={handleSave}
        />

        <HorizontalSpacer height={8} />
        <Button
          title="Cancel"
          buttonType="link"
          state="default"
          onPress={handleClose}
        />
      </View>
    </BaseModal>
  );
}
