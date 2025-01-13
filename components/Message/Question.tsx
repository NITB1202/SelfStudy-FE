import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../CustomButton";

interface QuestionProps {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onOkPress: (event: GestureResponderEvent) => void;
  onCancelPress: (event: GestureResponderEvent) => void;
}

export default function Question({
  visible,
  title,
  description,
  onClose,
  onOkPress,
  onCancelPress,
}: QuestionProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="black" />
          </Pressable>

          {/* Content Section */}
          <View style={styles.content}>
            {/* Icon và Title */}
            <View style={styles.header}>
              <View style={styles.iconWrapper}>
                <MaterialIcons name="question-mark" size={24} color="white" />
              </View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
          <Text style={styles.description}>{description}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="OK"
              onPress={onOkPress}
              color="primary"
              style={styles.okButton}
            />
            <CustomButton
              title="Cancel"
              onPress={onCancelPress}
              color="secondary"
              style={styles.cancelButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  content: {
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7AB2D3",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#000",
    textAlign: "left",
    height: 40,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  okButton: {
    width: "auto",
  },
  cancelButton: {
    width: "auto",
  },
});
