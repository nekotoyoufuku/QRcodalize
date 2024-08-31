import { type InitialProps, close } from "expo-share-extension";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { createQRCodeFile } from "./repositories/FileSystem/createQRCodeFile";

export default function ShareExtension({ images }: InitialProps) {
  const [text, onChangeText] = React.useState("test_file");

  const handleOpenHostApp = async () => {
    await createQRCodeFile({
      name: text,
      filepath: images![0],
    });

    // When you share images and videos, expo-share-extension stores them in a sharedData
    // directory in your app group's container. These files are not automatically cleaned up,
    // so you should delete them when you're done with them.
    // await clearAppGroupContainer()
  };

  return (
    <View style={styles.container}>
      <Text
        style={{ fontFamily: "Inter-Black", fontSize: 24, marginBottom: 10 }}
      >
        Media Example
      </Text>

      <TextInput onChangeText={onChangeText} value={text} />

      <Button title="Save" onPress={handleOpenHostApp} />
      <Button title="Close" onPress={close} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#FAF8F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
