import { BaseModal, BaseModalProps } from "@/components/Modal/BaseModal";
import { View } from "react-native";
import { useState } from "react";
import { CreateModalContent } from "@/components/Modal/CreateModalContent";
import { URLModalContent } from "@/components/Modal/URLModalContent";
import { WifiModalContent } from "@/components/Modal/WifiModalContent";
import { OnGeneratePressArgs } from "@/types";

export type ContentType = "URL" | "Wifi" | null;

export interface GenerateModalProps
  extends Pick<BaseModalProps, "isVisible" | "onClose"> {
  onGeneratePress?: (args: OnGeneratePressArgs) => void;
}

export function GenerateModal({
  isVisible,
  onGeneratePress,
  onClose,
}: GenerateModalProps) {
  const [type, setType] = useState<ContentType>(null);

  const changeType = (type: ContentType) => {
    setType(type);
  };

  function handleGenerate(args: OnGeneratePressArgs) {
    onGeneratePress?.(args);
    setType(null);
    onClose();
  }

  function handleClose() {
    setType(null);
    onClose();
  }

  return (
    <BaseModal isVisible={isVisible} onClose={handleClose}>
      <View>
        {type === "URL" && (
          <URLModalContent
            onGeneratePress={handleGenerate}
            onCancel={handleClose}
          />
        )}

        {type === "Wifi" && (
          <WifiModalContent
            onGeneratePress={handleGenerate}
            onCancel={handleClose}
          />
        )}

        {type === null && (
          <CreateModalContent onPress={changeType} onClose={handleClose} />
        )}
      </View>
    </BaseModal>
  );
}
