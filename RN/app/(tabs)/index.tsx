import { StyleSheet, TouchableOpacity, FlatList, View } from "react-native";

// Components
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import PreviewBottomSheet from "@/components/BottomSheet/PreviewBottomSheet";
import { useSharedValue } from "react-native-reanimated";
import { useQRCodeList } from "@/hooks/useQRCodeList";
import { HomeListItemType } from "@/types";
import {
  QRCodeGenerateModal,
  OnGeneratePressArgs,
} from "@/components/Modal/QRCodeGenerateModal";
import { NewQRCodeBottomSheet } from "@/components/BottomSheet/NewQRCodeBottomSheet";
import { breakDownURL } from "@/helpers/breakDownURL";

export default function HomeScreen() {
  const { qrCodeList } = useQRCodeList();
  const [selectedItem, setSelectedItem] =
    React.useState<HomeListItemType | null>(null);
  const [newQRCode, setNewQRCode] = React.useState<OnGeneratePressArgs>({
    name: "",
    url: "",
  });
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  // This is a shared value that can be used to animate the bottom sheet
  const isNewQRCodeSheetOpen = useSharedValue(false);
  const isPreviewSheetOpen = useSharedValue(false);

  const toggleNewQRCodeSheet = () => {
    isNewQRCodeSheetOpen.value = !isNewQRCodeSheetOpen.value;
  };

  const togglePreviewSheet = () => {
    isPreviewSheetOpen.value = !isPreviewSheetOpen.value;
  };

  const onPressItem = (item: HomeListItemType) => {
    setSelectedItem(item);
    togglePreviewSheet();
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onPlusPress = () => {
    setIsModalVisible(true);
  };

  const handleGeneratePress = (args: OnGeneratePressArgs) => {
    setIsModalVisible(false);
    setNewQRCode(args);
    toggleNewQRCodeSheet();
  };

  const renderItem = ({ item }: { item: HomeListItemType }) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)}>
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
        <TouchableOpacity onPress={onPlusPress} style={styles.plusIcon}>
          <AntDesign name="pluscircle" size={48} color="black" />
        </TouchableOpacity>
      </ThemedView>

      <QRCodeGenerateModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        onGeneratePress={handleGeneratePress}
      />

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
  plusIcon: {
    position: "absolute",
    bottom: 28,
    right: 40,
  },
});
