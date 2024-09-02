import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Playground() {
  return (
    <ThemedView wrapper style={styles.wrapper}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Playground</ThemedText>
      </ThemedView>
      {/* Playground here */}

      {/* Playground here */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
