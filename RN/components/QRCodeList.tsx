import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { HomeListItemType } from "@/types";

export interface QRCodeListProps {
  data: HomeListItemType[];
  onItemPress: (item: HomeListItemType) => void;
  lightColor?: string;
  darkColor?: string;
}

export function QRCodeList({
  data,
  onItemPress,
  lightColor,
  darkColor,
}: QRCodeListProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <FlatList<HomeListItemType>
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onItemPress(item)}>
          <ThemedView style={styles.stepContainer}>
            <ThemedText>{item.title}</ThemedText>

            <Entypo name="chevron-right" size={24} color={color} />
          </ThemedView>
        </TouchableOpacity>
      )}
    />
  );
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
