import React from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

interface TeamDetailModalProps {
  visible: boolean;
  onClose: () => void;
  team: {
    name: string;
    avatar: string;
    establishDate?: string; // Cho phép undefined
    members?: { id: string; avatar: string }[]; // Cho phép undefined
    createdBy: { name: string; avatar: string };
  };
}

export default function TeamDetailModal({
  visible,
  onClose,
  team,
}: TeamDetailModalProps) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-outline" size={24} color="#333" />
          </Pressable>

          {/* Avatar và Tên Team */}
          <Image source={{ uri: team.avatar }} style={styles.teamAvatarLarge} />
          <Text style={styles.teamName}>{team.name}</Text>

          {/* Thông tin nhóm */}
          <View style={styles.row}>
            <Text style={styles.label}>Establish date:</Text>
            <Text style={styles.value}>
              {team.establishDate || "Not specified"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Members:</Text>
            <View style={styles.memberList}>
              {(team.members || []).slice(0, 3).map((member) => (
                <Image
                  key={member.id}
                  source={{ uri: member.avatar }}
                  style={styles.memberAvatarSmall}
                />
              ))}
              {team.members && team.members.length > 3 && (
                <View style={styles.moreMembers}>
                  <Text style={styles.moreText}>
                    +{team.members.length - 3}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Create by:</Text>
            <View style={styles.creatorInfo}>
              <Image
                source={{ uri: team.createdBy.avatar }}
                style={styles.memberAvatarSmall}
              />
              <Text style={styles.value}>{team.createdBy.name}</Text>
            </View>
          </View>

          {/* Nút Leave Team */}
          <View style={styles.leaveButtonContainer}>
            <CustomButton
              title="Select"
              onPress={() => {
                console.log("Leaving team...");
                onClose();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  teamAvatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 10,
  },
  memberList: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  memberAvatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  moreMembers: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: {
    fontSize: 14,
    fontWeight: "500",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 20,
  },

  creatorInfo: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  leaveButtonContainer: {
    width: "100%",
  },
});
