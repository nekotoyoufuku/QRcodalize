import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NewQRCodeBottomSheet } from "@/components/BottomSheet/NewQRCodeBottomSheet";
import { useSharedValue } from "react-native-reanimated";

export default function Playground() {
  return (
    <>
      <ThemedView wrapper style={styles.wrapper}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Playground</ThemedText>
        </ThemedView>
        {/* Playground here */}

        {/* Playground here */}
      </ThemedView>
      <NewQRCodeBottomSheet
        url={"https://www.linkedin.com/in/ryotogashi/"}
        name={"LinkedIn"}
        isOpen={useSharedValue(true)}
        onClose={() => {}}
      />
    </>
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
