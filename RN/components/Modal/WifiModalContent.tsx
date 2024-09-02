import TextInput from "@/components/TextInput";
import Button from "@/components/Button/Button";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import {
  generateWifiQRCodeString,
  GenerateWifiQRCodeStringInput,
} from "@/helpers/generateWifiQRCodeString";
import { OnGeneratePressArgs } from "@/types";

export interface WifiModalContentProps {
  onGeneratePress?: (args: OnGeneratePressArgs) => void;
  onCancel?: () => void;
}

export function WifiModalContent({
  onGeneratePress,
  onCancel,
}: WifiModalContentProps) {
  const [name, setName] = useState("Wifi");
  const [ssid, setSSID] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    ssid: "",
    password: "",
    encryption: "",
  });

  function resetForm() {
    setName("");
    setSSID("");
    setPassword("");
    setEncryption("");
  }

  function validateInputs() {
    const isNameEmpty = name === "";
    const isSSIDEmpty = ssid === "";
    const isPasswordEmpty = password === "";
    const isEncryptionIncorrect = encryption !== "WPA" && encryption !== "WEP";

    if (
      !isNameEmpty &&
      !isSSIDEmpty &&
      !isPasswordEmpty &&
      !isEncryptionIncorrect
    ) {
      return true;
    }

    setErrorMessages({
      name: isNameEmpty ? "Name is required" : "",
      ssid: isSSIDEmpty ? "SSID is required" : "",
      password: isPasswordEmpty ? "Password is required" : "",
      encryption: isEncryptionIncorrect
        ? "Encryption must be either WPA or WEP"
        : "",
    });

    return false;
  }

  function handleWifiGenerate() {
    const isValidated = validateInputs();

    if (isValidated) {
      onGeneratePress?.({
        name,
        url: generateWifiQRCodeString({
          encryption: encryption as GenerateWifiQRCodeStringInput["encryption"],
          ssid,
          password,
        }),
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
        errorMessage={errorMessages.name}
        value={name}
        placeholder="Wifi"
        onChangeText={setName}
      />
      <View style={styles.spacer8} />
      <TextInput
        label="SSID"
        errorMessage={errorMessages.ssid}
        value={ssid}
        onChangeText={setSSID}
      />
      <View style={styles.spacer8} />
      <TextInput
        label="Password"
        errorMessage={errorMessages.password}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.spacer8} />
      <TextInput
        label="Encryption"
        errorMessage={errorMessages.encryption}
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
