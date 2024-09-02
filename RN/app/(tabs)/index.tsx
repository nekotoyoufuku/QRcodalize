import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PreviewBottomSheet from "@/components/BottomSheet/PreviewBottomSheet";
import { NewQRCodeBottomSheet } from "@/components/BottomSheet/NewQRCodeBottomSheet";
import { PlusButton } from "@/components/Button/PlusButton";
import { breakDownURL } from "@/helpers/breakDownURL";
import { useQRCodeList } from "@/hooks/useQRCodeList";
import { HomeListItemType } from "@/types";
import {
  GenerateModal,
  OnGeneratePressArgs,
} from "@/components/Modal/GenerateModal";

export default function HomeScreen() {
  const { qrCodeList } = useQRCodeList();
  const [selectedItem, setSelectedItem] =
    React.useState<HomeListItemType | null>(null);
  const [newQRCode, setNewQRCode] = React.useState<OnGeneratePressArgs>({
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

  const renderItem = ({ item }: { item: HomeListItemType }) => {
    return (
      <TouchableOpacity onPress={() => handlePressItem(item)}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>{breakDownURL(item.title).name}</ThemedText>
          <Entypo name="chevron-right" size={24} color="black" />
        </ThemedView>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ThemedView wrapper style={styles.wrapper}>
        <ListHeaderComponent />

        <FlatList data={qrCodeList} renderItem={renderItem} />

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
      />
      <PreviewBottomSheet
        isOpen={isPreviewSheetOpen}
        onClose={togglePreviewSheet}
        selectedItem={selectedItem}
      />
    </>
  );
}

const ListHeaderComponent = () => {
  return (
    <ThemedView style={styles.header}>
      <ThemedText type="title">Home</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderColor: "#ACACAC",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
  },
});
