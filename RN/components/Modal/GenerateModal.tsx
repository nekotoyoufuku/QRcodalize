import TextInput from "@/components/TextInput";
import { BaseModal, BaseModalProps } from "@/components/Modal/BaseModal";
import Button from "@/components/Button/Button";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { generateWifiQRCodeString } from "@/helpers/generateWifiQRCodeString";

export interface OnGeneratePressArgs {
  name: string;
  url: string;
}

export interface GenerateModalProps
  extends Pick<BaseModalProps, "isVisible" | "onClose"> {
  onGeneratePress?: (args: OnGeneratePressArgs) => void;
}

export function GenerateModal({
  isVisible,
  onGeneratePress,
  onClose,
}: GenerateModalProps) {
  const [type, setType] = useState<"URL" | "Wifi" | null>(null);
  const [name, setName] = React.useState("");
  const [url, setURL] = React.useState("");

  const [ssid, setSSID] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("");

  const changeType = (type: "URL" | "Wifi") => {
    setType(type);
  };

  function handleURLGenerate() {
    onGeneratePress?.({
      name,
      url,
    });

    setName("");
    setURL("");
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

    setName("");
    setSSID("");
    setPassword("");
    setEncryption("");
  }

  function handleClose() {
    setType(null);
    onClose();
  }

  const generalContent = (
    <>
      <Button
        title="URL"
        buttonType="primary"
        state="default"
        onPress={() => changeType("URL")}
      />

      <View style={styles.spacer8} />

      <Button
        title="Wifi"
        buttonType="primary"
        state="default"
        onPress={() => changeType("Wifi")}
      />

      <View style={styles.spacer8} />

      <Button
        title="Cancel"
        buttonType="link"
        state="default"
        onPress={handleClose}
      />
    </>
  );

  const URLContent = (
    <>
      <Text>Name</Text>
      <View style={styles.spacer4} />
      <TextInput value={name} placeholder="Instagram" onChangeText={setName} />
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
        onPress={handleURLGenerate}
      />
      <View style={styles.spacer8} />
      <Button
        title="Cancel"
        buttonType="link"
        state="default"
        onPress={handleClose}
      />
    </>
  );

  const WifiContent = (
    <>
      <Text>Name</Text>
      <View style={styles.spacer4} />
      <TextInput value={name} placeholder="Wifi" onChangeText={setName} />
      <View style={styles.spacer8} />

      <Text>SSID</Text>
      <View style={styles.spacer4} />
      <TextInput value={ssid} onChangeText={setSSID} />
      <View style={styles.spacer8} />

      <Text>Password</Text>
      <View style={styles.spacer4} />
      <TextInput value={password} onChangeText={setPassword} />

      <Text>Encryption</Text>
      <View style={styles.spacer4} />
      <TextInput
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
        onPress={handleClose}
      />
    </>
  );

  return (
    <BaseModal isVisible={isVisible} onClose={handleClose}>
      <View>
        {type === "URL"
          ? URLContent
          : type === "Wifi"
            ? WifiContent
            : generalContent}
      </View>
    </BaseModal>
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
