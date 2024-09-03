import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { type InitialProps, close } from "expo-share-extension";

import { createQRCodeFile } from "@/repositories/FileSystem/createQRCodeFile";
import TextInputField from "./components/TextInput";

export default function ShareExtension({ images }: InitialProps) {
  const [text, onChangeText] = React.useState("test_file");

  const handleOpenHostApp = async () => {
    await createQRCodeFile({
      name: text,
      filepath: images![0],
    });

    //   // When you share images and videos, expo-share-extension stores them in a sharedData
    //   // directory in your app group's container. These files are not automatically cleaned up,
    //   // so you should delete them when you're done with them.
    //   // await clearAppGroupContainer()
    close();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Media Example</Text>

      <Text style={styles.labelText}>Enter QR code name : </Text>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          onChangeText={onChangeText}
          value={text}
        />
      </View>
      <View style={styles.primaryButtonWrapper}>
        <TouchableOpacity
          onPress={handleOpenHostApp}
          style={styles.primaryButton}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={close} style={styles.linkContainer}>
          <Text style={styles.linkButtonText}>Close</Text>
        </TouchableOpacity>
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
  titleText: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: "center",
  },
  labelText: {
    fontSize: 16,
    marginBottom: 12,
  },
  primaryButtonWrapper: {
    flex: 1,
    marginTop: 20,
    marginBottom: 12,
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  linkContainer: {
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  linkButtonText: {
    color: "#007bff",
  },
  wrapper: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 10,
  },
  input: {
    padding: 16,
  },
});
