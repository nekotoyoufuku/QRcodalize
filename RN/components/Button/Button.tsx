import { ThemedText } from "../../components/ThemedText";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  buttonType?: "primary" | "link";
  state: ButtonState;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

type ButtonState = "default" | "loading";

export default function Button({
  title,
  buttonType = "primary",
  state,
  style,
  onPress,
}: ButtonProps) {
  if (buttonType === "primary") {
    return (
      <PrimaryButton
        title={title}
        buttonType="primary"
        onPress={onPress}
        state={state}
        style={style}
      />
    );
  }

  return (
    <LinkButton
      title={title}
      buttonType="link"
      onPress={onPress}
      state={state}
      style={style}
    />
  );
}

/**
 * Button with Link style
 */
function LinkButton({ title, onPress, state, style }: ButtonProps) {
  if (state === "loading") {
    return (
      <View style={[styles.linkContainer, style]}>
        <ActivityIndicator color={"#007bff"} />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.linkContainer, style]}>
      <ThemedText type="defaultSemiBold" colorType="linkButtonText">
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

/**
 * Button with Primary style
 */
function PrimaryButton({ title, onPress, state, style }: ButtonProps) {
  if (state === "loading") {
    return (
      <View style={[styles.loadingContainer, style]}>
        <ActivityIndicator color={"#fff"} />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <ThemedText type="defaultSemiBold" colorType="primaryButtonText">
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  linkContainer: {
    padding: 12,
    alignItems: "center",
  },
});
