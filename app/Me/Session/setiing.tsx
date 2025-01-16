import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

interface ModalSettingProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: {
    duration: string;
    focusTime: string;
    breakTime: string;
    musicLink: string;
  }) => void;
}

export default function ModalSetting({
  visible,
  onClose,
  onSave,
}: ModalSettingProps) {
  const [duration, setDuration] = useState("01:00:00");
  const [focusTime, setFocusTime] = useState("20:00");
  const [breakTime, setBreakTime] = useState("10:00");
  const [musicLink, setMusicLink] = useState("");

  const handleSave = () => {
    const settings = {
      duration,
      focusTime,
      breakTime,
      musicLink,
    };
    onSave(settings);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#4A628A" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Settings</Text>

          {/* Duration */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Duration</Text>
            <TextInput
              style={styles.input}
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />
          </View>

          {/* Focus and Break Time */}
          <View style={styles.timeContainer}>
            <View style={styles.timeBox}>
              <Text style={styles.label}>Focus</Text>
              <View style={styles.timeInputContainer}>
                <TextInput
                  style={styles.timeInput}
                  value={focusTime}
                  onChangeText={setFocusTime}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.label}>Break</Text>
              <View style={styles.timeInputContainer}>
                <TextInput
                  style={styles.timeInput}
                  value={breakTime}
                  onChangeText={setBreakTime}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Connecting Lines */}
          <View style={styles.lineContainer}>
            <View style={styles.horizontalLine} />
            <View style={styles.stagesBox}>
              <Text style={styles.stagesText}>4 stages</Text>
            </View>
            <View style={styles.horizontalLine} />
          </View>

          {/* Music Link */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Music</Text>
            <View style={styles.musicInputContainer}>
              <TextInput
                style={styles.input}
                value={musicLink}
                onChangeText={setMusicLink}
                placeholder="Enter your music link..."
              />
              <Ionicons name="link" size={20} color="#4A628A" />
            </View>
          </View>

          {/* Save Button */}
          <CustomButton title="Save" onPress={handleSave} color="primary" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A628A",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#4A628A",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F9F9F9",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  timeBox: {
    alignItems: "center",
    width: "45%",
  },
  timeInputContainer: {
    borderWidth: 1,
    borderColor: "#B0D7EB",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  timeInput: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: "#B0D7EB",
    flex: 1,
  },
  stagesBox: {
    borderWidth: 1,
    borderColor: "#B0D7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  stagesText: {
    fontSize: 14,
    color: "#4A628A",
    fontWeight: "bold",
  },
  musicInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F9F9F9",
    width: "90%",
    gap: 20,
  },
});
