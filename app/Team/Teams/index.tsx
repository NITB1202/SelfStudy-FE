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
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import Header from "@/components/Header";
import { router } from "expo-router";
import TeamDetailModal from "./Detail";
import BackButton from "@/components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";

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
      name: "TEAM 1",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-St7P8HoC0Vs1YfbHi_4x6sxMaIg28f5UQ&s",
      isAdmin: true,
      establishDate: "24/10/2024",
      members: [
        {
          id: "1",
          avatar:
            "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
        },
        {
          id: "2",
          avatar:
            "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
        },
        {
          id: "3",
          avatar:
            "https://images.baoangiang.com.vn/image/fckeditor/upload/2020/20201205/images/nhung-buc-anh-dep-nhat-nam-2020-theo-do-agora-binh-chon.jpg",
        },
      ],
      createdBy: {
        id: "4",
        name: "123",
        avatar:
          "https://res.cloudinary.com/drvyagz4w/image/upload/v1736875036/e50f7e05-bb8a-4c71-a107-feea8ff60ed7.png",
      },
    },
    {
      id: "2",
      name: "TEAM 2",
      avatar:
        "https://tnktravel.com.vn/wp-content/uploads/2023/05/Team-Work-l%C3%A0-g%C3%AC--1024x536.jpeg",
      isAdmin: false,
      establishDate: "22/12/2024",
      members: [
        {
          id: "1",
          avatar:
            "https://res.cloudinary.com/drvyagz4w/image/upload/v1736875036/e50f7e05-bb8a-4c71-a107-feea8ff60ed7.png",
        },
        {
          id: "2",
          avatar:
            "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
        },
        {
          id: "3",
          avatar:
            "https://images.baoangiang.com.vn/image/fckeditor/upload/2020/20201205/images/nhung-buc-anh-dep-nhat-nam-2020-theo-do-agora-binh-chon.jpg",
        },
      ],
      createdBy: {
        id: "4",
        name: "Mike",
        avatar:
          "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
      },
    },
    {
      id: "3",
      name: "TEAM 3",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNNriLBTwLS853i_fILTzh8liXUcnqdN7ELQ&s",
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
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <BackButton/>
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

      <View style={styles.header}>
        <ScrollView>
          {filteredTeams.map((item) => (
            <Pressable
              key={item.id}
              style={styles.teamRow}
              onPress={() => openTeamDetailModal(item)}
            >
              <Image source={{ uri: item.avatar }} style={styles.teamAvatar} />
              <Text style={styles.teamName}>{item.name}</Text>
              {item.isAdmin && (
                <Pressable onPress={()=> console.log("You are admin of this team")}>
                  <MaterialCommunityIcons
                    name="view-grid-outline"
                    size={25}
                    color="#7AB2D3"
                  />
                </Pressable>
              )}
            </Pressable>
          ))}
        </ScrollView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 10,
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
    marginTop: 20,
    marginHorizontal: 10,
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
