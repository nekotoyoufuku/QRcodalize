import { useRef } from "react";
import { SharedValue } from "react-native-reanimated";
import { Button, StyleSheet, View } from "react-native";
import { BaseBottomSheet } from "@/components/BottomSheet/BaseBottomSheet";
import QRCode from "react-native-qrcode-svg";
import { setQRCode } from "@/repositories/QRCodeData/setQRCode";

type NewQRCodeBottomSheetProps = {
  name: string;
  url: string;
  isOpen: SharedValue<boolean>;
  onClose: () => void;
  onNewQRCodeCreated?: () => void;
};

export function NewQRCodeBottomSheet({
  name,
  url,
  isOpen,
  onClose,
  onNewQRCodeCreated,
}: NewQRCodeBottomSheetProps) {
  const svgRef = useRef<any>(null);

  function saveQRCode() {
    svgRef.current?.toDataURL(async (data: string) => {
      setQRCode({ name, data });

      onNewQRCodeCreated?.();
    });

    onClose();
  }

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        {url ? <QRCode value={url} size={150} getRef={svgRef as any} /> : null}

        <Button title="Save QR Code" onPress={saveQRCode} />
      </View>
    </BaseBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
