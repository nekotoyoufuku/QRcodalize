import Button from "@/components/Button/Button";
import { HorizontalSpacer } from "@/components/Spacer/HorizontalSpacer";

export interface CreateModalContentProps {
  onPress: (type: "URL" | "Wifi" | null) => void;
  onClose: () => void;
}

export function CreateModalContent({
  onPress,
  onClose,
}: CreateModalContentProps) {
  return (
    <>
      <Button
        title="URL"
        buttonType="primary"
        state="default"
        onPress={() => onPress("URL")}
      />

      <HorizontalSpacer height={8} />

      <Button
        title="Wifi"
        buttonType="primary"
        state="default"
        onPress={() => onPress("Wifi")}
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
