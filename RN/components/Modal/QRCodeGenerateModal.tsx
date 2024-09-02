import TextInput from "@/components/TextInput";
import { BaseModal, BaseModalProps } from "@/components/Modal/BaseModal";
import Button from "@/components/Button/Button";
import { StyleSheet, Text, View } from "react-native";

export interface QRCodeGenerateModalProps
  extends Pick<BaseModalProps, "isVisible" | "onClose"> {}

export function QRCodeGenerateModal({
  isVisible,
  onClose,
}: QRCodeGenerateModalProps) {
  return (
    <BaseModal title="Generate QR code" isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text>Name</Text>
        <View style={styles.spacer4} />
        <TextInput value={""} placeholder="Instagram" />
        <View style={styles.spacer8} />

        <Text>URL</Text>
        <View style={styles.spacer4} />
        <TextInput
          value={""}
          placeholder="https://www.instagram.com/<your_id>/"
        />

        <View style={styles.spacer32} />

        <Button title="Generate" buttonType="primary" state="default" />
        <View style={styles.spacer8} />
        <Button title="Cancel" buttonType="link" state="default" />
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
