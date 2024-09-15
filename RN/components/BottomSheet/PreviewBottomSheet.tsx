import { Alert, Image, StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { BaseBottomSheet } from "@/components/BottomSheet/BaseBottomSheet";
import Button from "@/components/Button/Button";
import { HorizontalSpacer } from "@/components/Spacer/HorizontalSpacer";
import { QRCode } from "@/types";
import { deleteQRCode } from "@/repositories/QRCodeData/deleteQRCode";

type PreviewBottomSheetProps = {
  isOpen: SharedValue<boolean>;
  item: QRCode;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
};

const ALERT_TITLE = "Delete QR Code";
const ALERT_MESSAGE = "Are you sure you want to delete this QR code?";

/**
 * This is a bottom sheet that displays a QR code
 */
export function PreviewBottomSheet({
  isOpen,
  item,
  onClose,
  onRename,
  onDelete,
}: PreviewBottomSheetProps) {
  const handleDeleteInAlertPress = () => {
    deleteQRCode(item.id);
    onDelete();
    onClose();
  };
  const handleDeletePress = () => {
    Alert.alert(ALERT_TITLE, ALERT_MESSAGE, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDeleteInAlertPress,
      },
    ]);
  };

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
      <View>
        <View style={styles.titleWtapper}>
          <ThemedText type="title">{item.name}</ThemedText>
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${item.imageInBase64}`,
            }}
            style={{ width: 200, height: 200 }}
          />
        </View>

        <HorizontalSpacer height={24} />

        <Button
          title="Rename"
          buttonType="link"
          state={"default"}
          onPress={onRename}
        />
        <HorizontalSpacer height={8} />
        <Button
          title="Delete"
          buttonType="link"
          state={"default"}
          onPress={handleDeletePress}
        />
      </View>
    </BaseBottomSheet>
  );
}

const styles = StyleSheet.create({
  titleWtapper: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
  },
  imageWrapper: {
    alignItems: "center",
  },
});
