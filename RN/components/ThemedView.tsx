import { View, type ViewProps } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  wrapper?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  wrapper,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  if (wrapper) {
    return (
      <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
    );
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
