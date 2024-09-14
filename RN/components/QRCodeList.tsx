import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { QRCode } from "@/types";

export interface QRCodeListProps {
  data: QRCode[];
  onItemPress: (item: QRCode) => void;
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
    <FlatList<QRCode>
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onItemPress(item)}>
          <ThemedView style={styles.stepContainer}>
            <ThemedText>{item.name}</ThemedText>

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
