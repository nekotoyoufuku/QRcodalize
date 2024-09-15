import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Button from "@/components/Button/Button";
import { HorizontalSpacer } from "@/components/Spacer/HorizontalSpacer";
import { setQRCode } from "@/repositories/QRCodeData/setQRCode";

export type NewQRCodeModalContentProps = {
  name: string;
  url: string;
  onQRCodeSaved: () => void;
  onClose: () => void;
};

export function NewQRCodeModalContent({
  name,
  url,
  onQRCodeSaved,
  onClose,
}: NewQRCodeModalContentProps) {
  const svgRef = useRef<any>(null);

  function saveQRCode() {
    svgRef.current?.toDataURL(async (data: string) => {
      setQRCode({ name, data });

      onQRCodeSaved();
    });

    onClose();
  }

  return (
    <>
      <HorizontalSpacer height={32} />

      <View style={styles.container}>
        {!!url && <QRCode value={url} size={150} getRef={svgRef as any} />}
      </View>

      <HorizontalSpacer height={32} />

      <Button
        title="Save QR Code"
        buttonType="primary"
        state="default"
        onPress={saveQRCode}
      />
      <HorizontalSpacer height={8} />
      <Button
        title="Cancel"
        buttonType="link"
        state="default"
        onPress={onClose}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
