import { StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useThemeColor } from "@/hooks/useThemeColor";

export function PlusButton({
  onPress,
  lightColor,
  darkColor,
}: {
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
}) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "plusIcon"
  );
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "plusIconBackgound"
  );

  return (
    <TouchableOpacity onPress={onPress} style={styles.plusIcon}>
      <View style={[styles.circle, { backgroundColor }]}>
        <AntDesign name="plus" size={32} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  plusIcon: {
    position: "absolute",
    bottom: 60,
    right: 40,
  },
});
