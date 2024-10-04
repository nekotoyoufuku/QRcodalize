import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { QRCode } from "@/types";
import { getIconName } from "@/helpers/getIconName";

export interface ListItemIconProps {
  data: QRCode;
  lightColor?: string;
  darkColor?: string;
}

export function ListItemIcon({
  data,
  lightColor,
  darkColor,
}: ListItemIconProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "iconButton"
  );
  const iconName = getIconName(data);

  switch (iconName) {
    case "facebook":
      return (
        <AntDesign
          name="facebook-square"
          size={24}
          color={color}
          style={styles.icon}
        />
      );

    case "linkedin":
      return (
        <AntDesign
          name="linkedin-square"
          size={24}
          color={color}
          style={styles.icon}
        />
      );

    case "threads":
      return (
        <FontAwesome6
          name="square-threads"
          size={24}
          color={color}
          style={styles.icon}
        />
      );

    case "tiktok":
      return (
        <MaterialIcons
          name="tiktok"
          size={24}
          color={color}
          style={styles.icon}
        />
      );

    case "twitch":
      return (
        <FontAwesome
          name="twitch"
          size={24}
          color={color}
          style={styles.icon}
        />
      );

    case "twitter":
      return (
        <FontAwesome
          name="twitter-square"
          size={24}
          color={color}
          style={styles.icon}
        />
      );

    case "whatsapp":
      return (
        <FontAwesome5
          name="whatsapp-square"
          size={24}
          color={color}
          style={styles.icon}
        />
      );

    case "default":
      return (
        <Feather name="link-2" size={24} color={color} style={styles.icon} />
      );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
});
