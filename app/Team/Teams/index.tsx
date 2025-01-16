import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import Header from "@/components/Header";
import { router } from "expo-router";
import TeamDetailModal from "./Detail";

type Team = {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
  establishDate?: string;
  members?: { id: string; avatar: string }[];
  createdBy?: { id: string; name: string; avatar: string };
};

export default function Team() {
  const [modalVisible, setModalVisible] = useState(false);
  const [teamDetailModalVisible, setTeamDetailModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const teams = [
    {
      id: "1",
      name: "Team 1",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-St7P8HoC0Vs1YfbHi_4x6sxMaIg28f5UQ&s",
      isAdmin: true,
      establishDate: "27/10/2025",
      members: [
        {
          id: "1",
          avatar:
            "https://images.baoangiang.com.vn/image/fckeditor/upload/2020/20201205/images/nhung-buc-anh-dep-nhat-nam-2020-theo-do-agora-binh-chon.jpg",
        },
        {
          id: "2",
          avatar:
            "https://images.baoangiang.com.vn/image/fckeditor/upload/2020/20201205/images/nhung-buc-anh-dep-nhat-nam-2020-theo-do-agora-binh-chon.jpg",
        },
        {
          id: "3",
          avatar:
            "https://images.baoangiang.com.vn/image/fckeditor/upload/2020/20201205/images/nhung-buc-anh-dep-nhat-nam-2020-theo-do-agora-binh-chon.jpg",
        },
      ],
      createdBy: {
        id: "4",
        name: "LuvU124",
        avatar:
          "https://images.baoangiang.com.vn/image/fckeditor/upload/2020/20201205/images/nhung-buc-anh-dep-nhat-nam-2020-theo-do-agora-binh-chon.jpg",
      },
    },
    {
      id: "2",
      name: "Team 2",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-St7P8HoC0Vs1YfbHi_4x6sxMaIg28f5UQ&s",
      isAdmin: false,
    },
    {
      id: "3",
      name: "Team 3",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-St7P8HoC0Vs1YfbHi_4x6sxMaIg28f5UQ&s",
      isAdmin: false,
    },
  ];

  const openTeamDetailModal = (team: Team) => {
    setSelectedTeam(team);
    setTeamDetailModalVisible(true);
  };
  const [searchQuery, setSearchQuery] = useState(""); // Quản lý giá trị tìm kiếm
  const [filteredTeams, setFilteredTeams] = useState(teams); // Danh sách đội sau khi lọc

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#0000004D" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search teams"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            const filtered = teams.filter((team) =>
              team.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredTeams(filtered);
          }}
        />
      </View>

      <Pressable
        style={styles.joinButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="add-circle-outline"
          size={20}
          color="#fff"
          style={styles.joinIcon}
        />
        <Text style={styles.joinButtonText}>Join a team</Text>
      </Pressable>

      <View style={styles.header}>
        <FlatList
          data={filteredTeams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.teamRow}
              onPress={() => openTeamDetailModal(item)}
            >
              <Image source={{ uri: item.avatar }} style={styles.teamAvatar} />
              <Text style={styles.teamName}>{item.name}</Text>
              {item.isAdmin && (
                <MaterialCommunityIcons
                  name="view-grid-outline"
                  size={25}
                  color="#7AB2D3"
                />
              )}
            </Pressable>
          )}
        />
      </View>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <TeamDetailModal
          visible={teamDetailModalVisible}
          onClose={() => setTeamDetailModalVisible(false)}
          team={{
            ...selectedTeam,
            createdBy: selectedTeam.createdBy || {
              name: "Unknown",
              avatar: "",
            },
          }}
        />
      )}

      {/* Join Team Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close-outline" size={24} color="#333" />
              </Pressable>
            </View>
            <Text style={styles.modalLabel}>Team code</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter team code..."
              placeholderTextColor="#aaa"
            />
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={styles.bottom}>
        <BottomNavBar onAddPress={() => router.push("/Team/Management/Add")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    padding: 10,
    margin: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  joinButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: "#7AB2D3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: 150,
    marginRight: 10,
  },
  joinIcon: {
    marginRight: 10,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  teamAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  teamName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalLabel: {
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
  },
  modalButton: {
    backgroundColor: "#7AB2D3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
