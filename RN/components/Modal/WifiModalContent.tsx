import TextInput from "@/components/TextInput";
import Button from "@/components/Button/Button";
import { EncryptionSelectButtons } from "@/components/Button/EncryptionSelectButtons";
import { StyleSheet, Text, View } from "react-native";
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
  const [encryption, setEncryption] = useState<"WPA" | "WEP">("WPA");
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    ssid: "",
    password: "",
  });

  function resetForm() {
    setName("");
    setSSID("");
    setPassword("");
  }

  function validateInputs() {
    const isNameEmpty = name === "";
    const isSSIDEmpty = ssid === "";
    const isPasswordEmpty = password === "";

    if (!isNameEmpty && !isSSIDEmpty && !isPasswordEmpty) {
      return true;
    }

    setErrorMessages({
      name: isNameEmpty ? "Name is required" : "",
      ssid: isSSIDEmpty ? "SSID is required" : "",
      password: isPasswordEmpty ? "Password is required" : "",
    });

    return false;
  }

  function handleEncriptionPress(value: "WPA" | "WEP") {
    setEncryption(value);
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
      <Text>engription</Text>
      <View style={styles.spacer4} />
      <EncryptionSelectButtons onPress={handleEncriptionPress} />

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
