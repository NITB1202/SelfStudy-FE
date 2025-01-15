import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "@/components/CustomButton";

interface AddDocModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (docName: string, fileUri?: string) => void;
}

export default function AddDocModal({
  visible,
  onClose,
  onConfirm,
}: AddDocModalProps) {
  const [docName, setDocName] = useState("");
  const [fileUri, setFileUri] = useState<string | null>(null);

  const handleUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Cho phép mọi loại file
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        console.log("User canceled document picker");
        return;
      }

      // Nếu file được chọn thành công
      if (result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        setDocName(selectedFile.name || "Unnamed File"); // Sử dụng tên file hoặc fallback
        setFileUri(selectedFile.uri); // Lưu đường dẫn file
        Alert.alert("File Selected", `File: ${selectedFile.name}`);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload file.");
      console.error(error);
    }
  };

  const handleConfirm = () => {
    if (docName.trim() === "") {
      Alert.alert("Error", "Document name cannot be empty.");
      return;
    }

    onConfirm(docName, fileUri || undefined);
    setDocName("");
    setFileUri(null);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="black" />
          </Pressable>

          {/* Document Input */}
          <Text style={styles.label}>Document</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={docName}
              onChangeText={setDocName}
              placeholder="Enter document name"
              editable={!fileUri} // Không cho phép sửa khi đã upload file
            />
            <LinearGradient
              colors={["#B9E5E8", "#7AB2D3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.uploadButton}
            >
              <TouchableOpacity onPress={handleUploadFile}>
                <MaterialIcons name="upload-file" size={24} color="#EDEDED" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Confirm Button */}
          <View style={styles.confirmButton}>
            <CustomButton
              title="Confirm"
              onPress={handleConfirm}
              color="primary"
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
  container: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    width: "100%",
    marginTop: 10,
  },
});
