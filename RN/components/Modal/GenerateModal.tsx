import { BaseModal, BaseModalProps } from "@/components/Modal/BaseModal";
import Button from "@/components/Button/Button";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { URLModalContent } from "@/components/Modal/URLModalContent";
import { WifiModalContent } from "@/components/Modal/WifiModalContent";
import { OnGeneratePressArgs } from "@/types";

export interface GenerateModalProps
  extends Pick<BaseModalProps, "isVisible" | "onClose"> {
  onGeneratePress?: (args: OnGeneratePressArgs) => void;
}

export function GenerateModal({
  isVisible,
  onGeneratePress,
  onClose,
}: GenerateModalProps) {
  const [type, setType] = useState<"URL" | "Wifi" | null>(null);

  const changeType = (type: "URL" | "Wifi") => {
    setType(type);
  };

  function handleGenerate(args: OnGeneratePressArgs) {
    onGeneratePress?.(args);
  }

  function handleClose() {
    setType(null);
    onClose();
  }

  return (
    <BaseModal isVisible={isVisible} onClose={handleClose}>
      <View>
        {type === "URL" ? (
          <URLModalContent
            onGeneratePress={handleGenerate}
            onCancel={handleClose}
          />
        ) : type === "Wifi" ? (
          <WifiModalContent
            onGeneratePress={handleGenerate}
            onCancel={handleClose}
          />
        ) : (
          <>
            <Button
              title="URL"
              buttonType="primary"
              state="default"
              onPress={() => changeType("URL")}
            />

            <View style={styles.spacer8} />

            <Button
              title="Wifi"
              buttonType="primary"
              state="default"
              onPress={() => changeType("Wifi")}
            />

            <View style={styles.spacer8} />

            <Button
              title="Cancel"
              buttonType="link"
              state="default"
              onPress={handleClose}
            />
          </>
        )}
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  spacer8: {
    height: 8,
  },
  spacer32: {
    height: 32,
  },
});
