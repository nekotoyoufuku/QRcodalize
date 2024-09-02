import TextInput from "@/components/TextInput";
import Button from "@/components/Button/Button";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { generateWifiQRCodeString } from "@/helpers/generateWifiQRCodeString";
import { OnGeneratePressArgs } from "@/types";

export interface WifiModalContentProps {
  onGeneratePress?: (args: OnGeneratePressArgs) => void;
  onCancel?: () => void;
}

export function WifiModalContent({
  onGeneratePress,
  onCancel,
}: WifiModalContentProps) {
  const [name, setName] = useState("");
  const [ssid, setSSID] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("");

  function resetForm() {
    setName("");
    setSSID("");
    setPassword("");
    setEncryption("");
  }

  function handleWifiGenerate() {
    if (encryption !== "WPA" && encryption !== "WEP") {
      return;
    }

    onGeneratePress?.({
      name,
      url: generateWifiQRCodeString({
        encryption,
        ssid,
        password,
      }),
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
        placeholder="Wifi"
        onChangeText={setName}
      />
      <View style={styles.spacer8} />
      <TextInput label="SSID" value={ssid} onChangeText={setSSID} />
      <View style={styles.spacer8} />
      <TextInput label="Password" value={password} onChangeText={setPassword} />
      <View style={styles.spacer8} />
      <TextInput
        label="Encryption"
        value={encryption}
        placeholder="WPA | WEP"
        onChangeText={setEncryption}
      />

      <View style={styles.spacer32} />

      <Button
        title="Generate"
        buttonType="primary"
        state="default"
        onPress={handleWifiGenerate}
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
