import React from "react";
import * as RNFS from "react-native-fs";
import { type InitialProps, close } from "expo-share-extension";
import { StyleSheet, View } from "react-native";

import Button from "./components/Button/Button";
import TextInputField from "./components/TextInput";
import { setQRCode } from "./repositories/QRCodeData/setQRCode";

export default function ShareExtension({ images }: InitialProps) {
  const [name, onNameChange] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function resetForm() {
    onNameChange("");
  }

  const validateInput = () => {
    if (name === "") {
      setErrorMessage("Name is required");

      return false;
    }

    return true;
  };

  const handleOpenHostApp = async () => {
    const isValidated = validateInput();

    if (isValidated && images) {
      const data = await RNFS.readFile(images[0], "base64");

      await setQRCode({
        name,
        data,
      });
      resetForm();
      close();
    }
  };

  return (
    <View style={styles.container}>
      <TextInputField
        label="Name"
        value={name}
        errorMessage={errorMessage}
        onChangeText={onNameChange}
      />
      <View style={styles.primaryButtonWrapper}>
        <Button title="Save" onPress={handleOpenHostApp} state="default" />
        <Button
          title="Close"
          buttonType="link"
          onPress={close}
          state="default"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#FAF8F5",
    padding: 30,
    marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  topInner: {},
  primaryButtonWrapper: {
    flex: 1,
    marginTop: 20,
    marginBottom: 12,
    justifyContent: "center",
  },
});
