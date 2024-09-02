import { StyleSheet, TouchableOpacity } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

export function PlusButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.plusIcon}>
      <AntDesign name="pluscircle" size={48} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    position: "absolute",
    bottom: 28,
    right: 40,
  },
});
