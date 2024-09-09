import { type InitialProps, close } from "expo-share-extension";
import { StyleSheet, View } from "react-native";
import React from "react";
import { createQRCodeFile } from "./repositories/FileSystem/createQRCodeFile";
import Button from "./components/Button/Button";
import TextInputField from "./components/TextInput";

export default function ShareExtension({ images }: InitialProps) {
  const [text, onChangeText] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [debugMessage, setDebugMessage] = React.useState("");

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

    if (isValidated) {
      await createQRCodeFile({
        name: text,
        filepath: images![0],
        onMessage: (m) => setDebugMessage(m),
      });

      resetForm();

      // When you share images and videos, expo-share-extension stores them in a sharedData
      // directory in your app group's container. These files are not automatically cleaned up,
      // so you should delete them when you're done with them.
      // await clearAppGroupContainer()
      // close();
    }
  };

  return (
    <View style={styles.container}>
      <TextInputField
        label="Name"
        value={text}
        errorMessage={errorMessage || debugMessage}
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
