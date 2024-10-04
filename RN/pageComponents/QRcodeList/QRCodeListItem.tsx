import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { QRCode } from "@/types";
import { IconButton, IconButtonSize } from "@/components/Button/IconButton";
import { ListItemIcon } from "@/pageComponents/QRcodeList/ListItemIcon";

export interface QRCodeListItemProps {
  data: QRCode;
  onPress: (item: QRCode) => void;
}

export function QRCodeListItem({ data, onPress }: QRCodeListItemProps) {
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <ThemedView style={styles.root}>
        <View style={styles.left}>
          <ListItemIcon data={data} />
          <ThemedText>{data.name}</ThemedText>
        </View>

        <IconButton name="dots-three-horizontal" size={IconButtonSize.small} />
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderColor: "#F0F0F0",
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 12,
  },
  left: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
