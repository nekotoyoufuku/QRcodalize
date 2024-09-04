import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { ReactNode } from "react";
import { ThemedText } from "../ThemedText";

export interface BaseModalProps {
  isVisible: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
}

export function BaseModal({
  isVisible,
  onClose,
  children,
  title,
}: BaseModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
    >
      <View style={styles.modalContainer}>
        {title ? (
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
        ) : null}

        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    marginBottom: 15,
  },
});
