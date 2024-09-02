import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { breakDownURL } from "@/helpers/breakDownURL";
import { HomeListItemType } from "@/types";

export interface QRCodeListProps {
  data: HomeListItemType[];
  onItemPress: (item: HomeListItemType) => void;
}

export function QRCodeList({ data, onItemPress }: QRCodeListProps) {
  const renderItem = ({ item }: { item: HomeListItemType }) => {
    return (
      <TouchableOpacity onPress={() => onItemPress(item)}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>{breakDownURL(item.title).name}</ThemedText>
          <Entypo name="chevron-right" size={24} color="black" />
        </ThemedView>
      </TouchableOpacity>
    );
  };

  return <FlatList data={data} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
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
