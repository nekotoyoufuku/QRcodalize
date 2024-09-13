import React from "react";
import { type InitialProps, close } from "expo-share-extension";
import { Alert, StyleSheet, View } from "react-native";
import RNFS from "react-native-fs";

import Button from "./components/Button/Button";
import TextInputField from "./components/TextInput";
import { setMmkvStorage } from "./repositories/mmkv/mmkvStorage";

export default function ShareExtension({ images }: InitialProps) {
  const [text, onChangeText] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function resetForm() {
    onChangeText("");
  }

  const validateInput = () => {
    if (text === "") {
      setErrorMessage("Name is required");

      return false;
    }

    return true;
  };

  const handleOpenHostApp = async () => {
    const isValidated = validateInput();

    if (isValidated && images) {
      RNFS.readFile(images[0], "base64").then((res) => {
        setMmkvStorage(text, res);
        Alert.alert("Saved", "QR code saved successfully");
        console.log("Saved-------->>>");

        resetForm();
        close();
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInputField
        label="Name"
        value={text}
        errorMessage={errorMessage}
        onChangeText={onChangeText}
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
  },
  topInner: {},
  primaryButtonWrapper: {
    flex: 1,
    marginTop: 20,
    marginBottom: 12,
    justifyContent: "center",
  },
});
