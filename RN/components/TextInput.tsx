import { ThemedView } from "../components/ThemedView";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  Text,
  View,
  ViewStyle,
} from "react-native";

type TextInputFieldProps = {
  value: string;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
};

export default function TextInputField({
  value,
  label,
  errorMessage,
  placeholder,
  style,
  onChangeText,
}: TextInputFieldProps) {
  return (
    <>
      {label ? (
        <>
          <Text>{label}</Text>
          <View style={styles.spacer4} />
        </>
      ) : null}

      <ThemedView style={[styles.wrapper, style]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </ThemedView>

      {errorMessage ? (
        <>
          <View style={styles.spacer2} />
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </>
      ) : null}
    </>
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
  spacer2: {
    height: 2,
  },
  spacer4: {
    height: 4,
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
  },
});
