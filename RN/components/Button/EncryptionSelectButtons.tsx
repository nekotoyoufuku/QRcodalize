import { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export interface EncryptionSelectButtonsProps {
  onPress?: (encryptionType: "WPA" | "WEP") => void;
}

export function EncryptionSelectButtons({
  onPress,
}: EncryptionSelectButtonsProps) {
  const [selected, setSelected] = useState<"left" | "right">("left");

  function handleWPAPress() {
    setSelected("left");
    onPress?.("WPA");
  }
  function handleWEPPress() {
    setSelected("right");
    onPress?.("WEP");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleWPAPress}
        style={[
          styles.leftButton,
          ...(selected === "left"
            ? [styles.selectedButton]
            : [styles.unselectedButton, styles.leftUnselectedButton]),
        ]}
      >
        <Text
          style={[
            selected === "left" ? styles.selectedText : styles.unselectedText,
          ]}
        >
          WPA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleWEPPress}
        style={[
          styles.rightButton,
          ...(selected === "right"
            ? [styles.selectedButton]
            : [styles.unselectedButton, styles.rightUnselectedButton]),
        ]}
      >
        <Text
          style={[
            selected === "right" ? styles.selectedText : styles.unselectedText,
          ]}
        >
          WEP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  leftButton: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  rightButton: {
    flex: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#007bff",
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  unselectedButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#808080",
  },
  leftUnselectedButton: {
    borderRightColor: "transparent",
  },
  rightUnselectedButton: {
    borderLeftColor: "transparent",
  },
  unselectedText: {
    color: "#808080",
    fontWeight: "bold",
  },
});
