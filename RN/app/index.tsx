import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PreviewBottomSheet from "@/components/BottomSheet/PreviewBottomSheet";
import { NewQRCodeBottomSheet } from "@/components/BottomSheet/NewQRCodeBottomSheet";
import { PlusButton } from "@/components/Button/PlusButton";
import { useQRCodeList } from "@/hooks/useQRCodeList";
import { HomeListItemType, OnGeneratePressArgs } from "@/types";
import { GenerateModal } from "@/components/Modal/GenerateModal";
import { QRCodeList } from "@/components/QRCodeList";
import { useAppState } from "@/hooks/useAppState";

export default function HomeScreen() {
  const { qrCodeList, updateList } = useQRCodeList();
  const [selectedItem, setSelectedItem] = useState<HomeListItemType | null>(
    null
  );
  const [newQRCode, setNewQRCode] = useState<OnGeneratePressArgs>({
    name: "",
    url: "",
  });

  // Modal stats
  const [isGenerateModalVisible, setGenerateModalVisibility] = useState(false);

  // Modal handlers
  const handleGeneralModalClose = () => {
    setGenerateModalVisibility(false);
  };
  const handlePlusPress = () => {
    setGenerateModalVisibility(true);
  };
  const handleURLGeneratePress = (args: OnGeneratePressArgs) => {
    handleGeneralModalClose();
    setNewQRCode(args);
    toggleNewQRCodeSheet();
  };

  // This is a shared value that can be used to animate the bottom sheet
  const isNewQRCodeSheetOpen = useSharedValue(false);
  const isPreviewSheetOpen = useSharedValue(false);

  const toggleNewQRCodeSheet = () => {
    isNewQRCodeSheetOpen.value = !isNewQRCodeSheetOpen.value;
  };

  const togglePreviewSheet = () => {
    isPreviewSheetOpen.value = !isPreviewSheetOpen.value;
  };

  const handlePressItem = (item: HomeListItemType) => {
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

      <GenerateModal
        isVisible={isGenerateModalVisible}
        onGeneratePress={handleURLGeneratePress}
        onClose={handleGeneralModalClose}
      />

      {/* Bottom Sheets */}
      <NewQRCodeBottomSheet
        name={newQRCode.name}
        url={newQRCode.url}
        isOpen={isNewQRCodeSheetOpen}
        onClose={toggleNewQRCodeSheet}
        onNewQRCodeCreated={updateList}
      />
      {selectedItem ? (
        <PreviewBottomSheet
          isOpen={isPreviewSheetOpen}
          onClose={togglePreviewSheet}
          selectedItem={selectedItem}
          onDelete={updateList}
        />
      ) : null}
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
