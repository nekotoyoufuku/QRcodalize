import { Image, StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { ThemedText } from "@/components/ThemedText";
import { BaseBottomSheet } from "@/components/BottomSheet/BaseBottomSheet";
import { HomeListItemType } from "@/types";
import Button from "@/components/Button/Button";
import { deleteFile } from "@/repositories/FileSystem/deleteFile";

type PreviewBottomSheetProps = {
  isOpen: SharedValue<boolean>;
  selectedItem: HomeListItemType | null;
  onClose: () => void;
  onDelete?: () => void;
};

/**
 * This is a bottom sheet that displays a QR code
 */
export default function PreviewBottomSheet({
  isOpen,
  selectedItem,
  onClose,
  onDelete,
}: PreviewBottomSheetProps) {
  const handleDeletePress = () => {
    if (selectedItem?.title) {
      deleteFile(selectedItem?.title);
      onDelete && onDelete();
    }
    onClose();
  };

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        {selectedItem?.base64 ? (
          <>
            <View style={styles.titleWtapper}>
              <ThemedText type="title">{selectedItem.title}</ThemedText>
            </View>

            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${selectedItem.base64}`,
                }}
                style={{ width: 200, height: 200 }}
              />
            </View>

            <View style={styles.spacer24} />

            <Button
              title="Delete"
              buttonType="link"
              state={"default"}
              onPress={handleDeletePress}
            />
          </>
        ) : (
          <View style={styles.emptyUrl}>
            <FontAwesome6 name="file-circle-question" size={60} color="black" />
            <View style={styles.spacer24} />
            <ThemedText>QR code not found</ThemedText>
          </View>
        )}
      </View>
    </BaseBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {},
  titleWtapper: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
  },
  imageWrapper: {
    alignItems: "center",
  },
  spacer24: {
    height: 24,
  },
  emptyUrl: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
