import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

interface AddSubjectModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (name: string, image: string) => void;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://tapchinuoc.qltns.mediacdn.vn/428507764633956352/2022/9/20/a3htgy3mrgoqd1blrca3yyjaqejfc55e-16636505220201499781405.jpg" // Default placeholder image
  );

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirm = () => {
    if (name.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    onConfirm(name, image);
    setName(""); // Reset input
    setImage(
      "https://tapchinuoc.qltns.mediacdn.vn/428507764633956352/2022/9/20/a3htgy3mrgoqd1blrca3yyjaqejfc55e-16636505220201499781405.jpg"
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>

          {/* Image Section */}
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            onPress={handlePickImage}
            style={styles.imageButton}
          >
            <LinearGradient
              colors={["#B9E5E8", "#7AB2D3"]}
              style={styles.gradientButton}
            >
              <MaterialCommunityIcons name="camera" size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Input Section */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter subject name"
            value={name}
            onChangeText={setName}
          />

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageButton: {
    position: "absolute",
    top: 140,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#7AB2D3",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddSubjectModal;
