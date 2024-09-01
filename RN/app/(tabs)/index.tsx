import { StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";

// Components
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { getQRcodeFiles } from "@/repositories/FileSystem/getQRcodeFiles";
import React from "react";

type HomeListItemType = {
  title: string;
};

export default function HomeScreen() {
  const [data, setData] = React.useState<HomeListItemType[]>([]);

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

  React.useEffect(() => {
    (async () => {
      const items = await getQRcodeFiles();

      setData(
        items.map((item) => ({
          title: item.name,
        }))
      );
    })();
  }, []);

  return (
    <ThemedView wrapper style={styles.wrapper}>
      <ListHeaderComponent />
      <FlatList data={data} renderItem={renderItem} />
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
