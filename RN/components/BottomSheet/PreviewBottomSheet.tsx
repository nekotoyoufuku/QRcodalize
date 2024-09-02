import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { ThemedText } from "@/components/ThemedText";
import { BaseBottomSheet } from "@/components/BottomSheet/BaseBottomSheet";
import TextInputField from "@/components/TextInput";
import { HomeListItemType } from "@/app/(tabs)/types";

type PreviewBottomSheetProps = {
  isOpen: SharedValue<boolean>;
  selectedItem: HomeListItemType | null;
  onClose: () => void;
};

/**
 * This is a bottom sheet that displays a QR code
 */
export default function PreviewBottomSheet({
  isOpen,
  selectedItem,
  onClose,
}: PreviewBottomSheetProps) {
  const [textInput, setTextInput] = useState<string>(selectedItem?.title || "");

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        {selectedItem?.url ? (
          <>
            <View style={styles.TextInputWrapper}>
              <TextInputField value={textInput} onChangeText={setTextInput} />
            </View>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: selectedItem.url }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          </>
        ) : (
          <View style={styles.emptyUrl}>
            <FontAwesome6 name="file-circle-question" size={60} color="black" />
            <View style={styles.space} />
            <ThemedText>QR code not found</ThemedText>
          </View>
        )}
      </View>
    </BaseBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {},
  TextInputWrapper: {
    flex: 1,
    marginBottom: 20,
  },
  imageWrapper: {
    alignItems: "center",
  },
  space: {
    height: 20,
  },
  emptyUrl: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
