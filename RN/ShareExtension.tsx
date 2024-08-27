import {
  type InitialProps,
  clearAppGroupContainer,
  close,
  openHostApp,
} from "expo-share-extension";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ShareExtension({ images }: InitialProps) {
  const handleOpenHostApp = async () => {
    openHostApp(`myapp://app.explore?images=${images}`);

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
      {images?.length ? (
        <Text
          style={{
            textAlign: "center",
            color: "#313639",
            fontSize: 16,
          }}
        >
          Images: {JSON.stringify(images)}
        </Text>
      ) : null}
      <Button title="Open Host App" onPress={handleOpenHostApp} />
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
