import {
  StyleProp,
  StyleSheet,
  TextInput,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { ThemedView } from "../components/ThemedView";

type TextInputFieldProps = {
  value: string;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
};

export default function TextInputField({
  value,
  style,
  onChangeText,
}: TextInputFieldProps) {
  return (
    <ThemedView style={[styles.wrapper, style]}>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={onChangeText}
        value={value}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 10,
  },
  input: {
    padding: 16,
  },
});
