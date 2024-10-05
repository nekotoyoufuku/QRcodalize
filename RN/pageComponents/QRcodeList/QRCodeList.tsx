import { FlatList } from "react-native";
import { QRCodeListItem } from "@/pageComponents/QRcodeList/QRCodeListItem";
import { QRCode } from "@/types";

export interface QRCodeListProps {
  data: QRCode[];
  onItemPress: (item: QRCode) => void;
}

export function QRCodeList({ data, onItemPress }: QRCodeListProps) {
  return (
    <FlatList<QRCode>
      data={data}
      renderItem={({ item }) => (
        <QRCodeListItem data={item} onPress={onItemPress} />
      )}
    />
  );
}
