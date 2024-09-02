import TextInput from "@/components/TextInput";
import { BaseModal, BaseModalProps } from "@/components/Modal/BaseModal";
import Button from "@/components/Button/Button";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

export interface OnGeneratePressArgs {
  name: string;
  url: string;
}
export interface GenerateModalProps
  extends Pick<BaseModalProps, "isVisible" | "onClose"> {
  onWifiPress?: () => void;
  onURLPress?: () => void;
}

export function GenerateModal({
  isVisible,
  onURLPress,
  onWifiPress,
  onClose,
}: GenerateModalProps) {
  return (
    <BaseModal isVisible={isVisible} onClose={onClose}>
      <View>
        <Button
          title="URL"
          buttonType="primary"
          state="default"
          onPress={onURLPress}
        />

        <View style={styles.spacer8} />

        <Button
          title="Wifi"
          buttonType="primary"
          state="default"
          onPress={onWifiPress}
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
  spacer8: {
    height: 8,
  },
});
