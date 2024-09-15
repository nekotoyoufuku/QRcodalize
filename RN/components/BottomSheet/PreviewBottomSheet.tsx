import { Alert, Image, StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { ThemedText } from "@/components/ThemedText";
import { BaseBottomSheet } from "@/components/BottomSheet/BaseBottomSheet";
import { QRCode } from "@/types";
import Button from "@/components/Button/Button";
import { deleteQRCode } from "@/repositories/QRCodeData/deleteQRCode";
import { HorizontalSpacer } from "../Spacer/HorizontalSpacer";

type PreviewBottomSheetProps = {
  isOpen: SharedValue<boolean>;
  selectedItem: QRCode | null;
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
    if (selectedItem?.id) {
      Alert.alert(
        "Delete QR Code",
        "Are you sure you want to delete this QR code?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              deleteQRCode(selectedItem?.id);
              onDelete && onDelete();
              onClose();
            },
          },
        ]
      );
    } else {
      onDelete && onDelete();
      onClose();
    }
  };

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        {selectedItem?.imageInBase64 ? (
          <>
            <View style={styles.titleWtapper}>
              <ThemedText type="title">{selectedItem.name}</ThemedText>
            </View>

            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${selectedItem.imageInBase64}`,
                }}
                style={{ width: 200, height: 200 }}
              />
            </View>

            <HorizontalSpacer height={24} />

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
            <HorizontalSpacer height={24} />
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
  emptyUrl: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
