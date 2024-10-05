import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Entypo from "@expo/vector-icons/Entypo";

export enum IconButtonSize {
  small,
}

function getSizes(size: IconButtonSize) {
  switch (size) {
    case IconButtonSize.small:
      return {
        icon: 20,
        circle: {
          height: 24,
          width: 24,
          borderRadius: 12,
        },
      };
  }
}

export interface IconButtonProps {
  name: (typeof Entypo)["name"];
  size: IconButtonSize;
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
}

export function IconButton(props: IconButtonProps) {
  const { name, size, onPress, lightColor, darkColor } = props;

  const sizes = getSizes(size);

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "iconButton"
  );
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.circle, sizes.circle]}>
        <Entypo name={name as any} size={sizes.icon} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
