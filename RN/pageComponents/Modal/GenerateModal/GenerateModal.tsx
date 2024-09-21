import { useState } from "react";
import { View } from "react-native";
import { BaseModal, BaseModalProps } from "@/components/Modal/BaseModal";
import { CreateModalContent } from "@/pageComponents/Modal/GenerateModal/CreateModalContent";
import { NewQRCodeModalContent } from "@/pageComponents/Modal/GenerateModal//NewQRCodeModalContent";
import { URLModalContent } from "@/pageComponents/Modal/GenerateModal/URLModalContent";
import { WifiModalContent } from "@/pageComponents/Modal/GenerateModal/WifiModalContent";
import { GenerateQRCodeInput } from "@/types";

export type ContentType = "URL" | "Wifi" | "QRCode" | null;

export interface GenerateModalProps
  extends Pick<BaseModalProps, "isVisible" | "onClose"> {
  onQRCodeSaved: () => void;
}

export function GenerateModal({
  isVisible,
  onQRCodeSaved,
  onClose,
}: GenerateModalProps) {
  const [type, setType] = useState<ContentType>(null);
  const [newQRCode, setNewQRCode] = useState<GenerateQRCodeInput>({
    name: "",
    url: "",
  });

  const changeType = (type: ContentType) => {
    setType(type);
  };

  function handleGenerate(input: GenerateQRCodeInput) {
    setNewQRCode(input);
    setType("QRCode");
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

        {type === "QRCode" && (
          <NewQRCodeModalContent
            name={newQRCode.name}
            url={newQRCode.url}
            onQRCodeSaved={onQRCodeSaved}
            onClose={handleClose}
          />
        )}

        {type === null && (
          <CreateModalContent onPress={changeType} onClose={handleClose} />
        )}
      </View>
    </BaseModal>
  );
}
