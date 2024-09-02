import { ThemedView } from "@/components/ThemedView";
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
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
};

export default function TextInputField({
  value,
  label,
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
  spacer4: {
    height: 4,
  },
});
