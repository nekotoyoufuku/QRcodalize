import { StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";
import { useShareIntent } from "expo-share-intent";

// Hooks
import { useGetQRCodeFiles } from "@/hooks/useGetQRCodeFiles";
// Components
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { IQRCodeFile } from "@/repositories/FileSystem/getQRcodeFiles";

export default function HomeScreen() {
  const { shareIntent } = useShareIntent();

  const { files } = useGetQRCodeFiles();

  const renderItem = ({ item }: { item: IQRCodeFile }) => {
    return (
      <TouchableOpacity onPress={() => alert("Item pressed")}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>{item.name}</ThemedText>
          <Entypo name="chevron-right" size={24} color="black" />
        </ThemedView>
      </TouchableOpacity>
    );
  };

  async function plusButtonClick() {
    alert("Add new item");
  }

  return (
    <ThemedView wrapper style={styles.wrapper}>
      {shareIntent?.files ? <Text>{shareIntent.files[0].fileName}</Text> : null}
      <ListHeaderComponent />
      <FlatList data={files} renderItem={renderItem} />
      <TouchableOpacity onPress={plusButtonClick} style={styles.plusIcon}>
        <AntDesign name="pluscircle" size={48} color="black" />
      </TouchableOpacity>
    </ThemedView>
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
