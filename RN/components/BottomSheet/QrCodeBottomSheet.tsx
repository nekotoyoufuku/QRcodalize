import { Image, StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { ThemedText } from "@/components/ThemedText";
import { BaseBottomSheet } from "@/components/BottomSheet/BaseBottomSheet";

type QrCodeBottomSheetProps = {
  isOpen: SharedValue<boolean>;
  qrCodeUrl: string | null;
  onClose: () => void;
};

/**
 * This is a bottom sheet that displays a QR code
 */
export default function QrCodeBottomSheet({
  isOpen,
  qrCodeUrl,
  onClose,
}: QrCodeBottomSheetProps) {
  return (
    <>
      <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
        {qrCodeUrl ? (
          <View style={styles.container}>
            <Image
              source={{ uri: qrCodeUrl }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        ) : (
          <View style={styles.emptyUrl}>
            <FontAwesome6 name="file-circle-question" size={60} color="black" />
            <View style={styles.space} />
            <ThemedText>QR code not found</ThemedText>
          </View>
        )}
      </BaseBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
