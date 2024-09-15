import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PreviewBottomSheet } from "@/components/BottomSheet/PreviewBottomSheet";
import { PlusButton } from "@/components/Button/PlusButton";
import { GenerateModal } from "@/components/Modal/GenerateModal/GenerateModal";
import { QRCodeList } from "@/components/QRCodeList";
import { useQRCodeList } from "@/hooks/useQRCodeList";
import { useAppState } from "@/hooks/useAppState";
import { QRCode } from "@/types";
import { RenameModal } from "@/components/Modal/RenameModal";

export default function HomeScreen() {
  const { qrCodeList, updateList } = useQRCodeList();
  const [selectedItem, setSelectedItem] = useState<QRCode | null>(null);

  // Modal stats
  const [isGenerateModalVisible, setGenerateModalVisibility] = useState(false);
  const [isRenameModalVisible, setRenameModalVisibility] = useState(false);

  // This is a shared value that can be used to animate the bottom sheet
  const isPreviewSheetOpen = useSharedValue(false);
  const togglePreviewSheet = () => {
    isPreviewSheetOpen.value = !isPreviewSheetOpen.value;
  };

  // Modal handlers
  const handleQRCodeSaved = () => {
    updateList();
  };
  const handleGeneralModalClose = () => {
    setGenerateModalVisibility(false);
  };
  const handleRename = () => {
    togglePreviewSheet();
    setRenameModalVisibility(true);
  };
  const handleRenameModalClose = () => {
    setRenameModalVisibility(false);
  };
  const handlePlusPress = () => {
    setGenerateModalVisibility(true);
  };

  const handlePressItem = (item: QRCode) => {
    setSelectedItem(item);
    togglePreviewSheet();
  };

  useAppState({
    onAppActive: () => {
      updateList();
    },
  });

  return (
    <>
      <ThemedView wrapper style={styles.wrapper}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">QR code list</ThemedText>
        </ThemedView>

        <QRCodeList data={qrCodeList} onItemPress={handlePressItem} />

        <PlusButton onPress={handlePlusPress} />
      </ThemedView>

      {/* Modals */}
      <GenerateModal
        isVisible={isGenerateModalVisible}
        onQRCodeSaved={handleQRCodeSaved}
        onClose={handleGeneralModalClose}
      />
      {!!selectedItem && (
        <RenameModal
          id={selectedItem.id}
          name={selectedItem.name}
          isVisible={isRenameModalVisible}
          onRenamed={handleQRCodeSaved}
          onClose={handleRenameModalClose}
        />
      )}

      {!!selectedItem && (
        <PreviewBottomSheet
          isOpen={isPreviewSheetOpen}
          onClose={togglePreviewSheet}
          item={selectedItem}
          onRename={handleRename}
          onDelete={updateList}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
