import { StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";
import { useShareIntent } from "expo-share-intent";

// Components
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

type HomeListItemType = {
  title: string;
};

const DATA: HomeListItemType[] = [
  { title: "Line" },
  { title: "Facebook" },
  { title: "Instagram" },
  { title: "LinkedIn" },
  { title: "Twitter" },
];

export default function HomeScreen() {
  const { hasShareIntent, shareIntent, resetShareIntent, error } =
    useShareIntent();

  const renderItem = ({ item }: { item: HomeListItemType }) => {
    return (
      <TouchableOpacity onPress={() => alert("Item pressed")}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>{item.title}</ThemedText>
          <Entypo name="chevron-right" size={24} color="black" />
        </ThemedView>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView wrapper style={styles.wrapper}>
      {shareIntent?.files ? <Text>{shareIntent.files[0].fileName}</Text> : null}
      <ListHeaderComponent />
      <FlatList data={DATA} renderItem={renderItem} />
      <TouchableOpacity
        onPress={() => alert("Add new item")}
        style={styles.plusIcon}
      >
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
