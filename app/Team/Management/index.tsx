import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Select from "@/components/Select";
import TeamInfo from "./Info";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import { router } from "expo-router";

type Member = {
  id: number;
  name: string;
  avatar: string;
  role: string;
};

type Team = {
  name: string;
  establishDate: string;
  createdBy: {
    name: string;
    avatar: string;
  };
  members: Member[];
};

type Teams = Record<string, Team>;

export default function Management() {
  const [teams, setTeams] = useState({
    "Team 1": {
      name: "TEAM 1",
      establishDate: "17/02/2024",
      createdBy: {
        name: "Luvu123",
        avatar:
          "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/hinh-anh-de-thuong-41.jpg",
      },
      teamImage:
        "https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg",
      members: [
        {
          id: 1,
          name: "Liam123",
          avatar:
            "https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg",
          role: "admin",
        },
        {
          id: 2,
          name: "h12",
          avatar:
            "https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg",
          role: "member",
        },
      ],
    },
    "Team 2": {
      name: "TEAM 2",
      establishDate: "01/01/2025",
      createdBy: {
        name: "AdminX",
        avatar:
          "https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg",
      },
      teamImage:
        "https://photo2.tinhte.vn/data/attachment-files/2021/07/5557920_CV.jpg",
      members: [
        {
          id: 3,
          name: "JohnD",
          avatar:
            "https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg",
          role: "admin",
        },
        {
          id: 4,
          name: "JaneS",
          avatar:
            "https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg",
          role: "member",
        },
        {
          id: 5,
          name: "JaneWT",
          avatar:
            "https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg",
          role: "member",
        },
      ],
    },
  });

  const [currentTeam, setCurrentTeam] = useState<keyof typeof teams>("Team 1");
  const [selectedTab, setSelectedTab] = useState<"all" | "admin">("all");
  const userRole = currentTeam === "Team 1" ? "member" : "admin"; // Phân quyền

  // Lọc thành viên dựa trên tab được chọn
  const filteredMembers =
    selectedTab === "all"
      ? teams[currentTeam].members
      : teams[currentTeam].members.filter((member) => member.role === "admin");

  // Hàm xóa thành viên
  const handleRemoveMember = (memberId: number) => {
    setTeams((prevTeams) => ({
      ...prevTeams,
      [currentTeam]: {
        ...prevTeams[currentTeam],
        members: prevTeams[currentTeam].members.filter(
          (member) => member.id !== memberId
        ),
      },
    }));
  };
  // Hàm cập nhật ảnh team
  const handleUpdateTeamImage = (newImageUri: string) => {
    setTeams((prevTeams) => ({
      ...prevTeams,
      [currentTeam]: {
        ...prevTeams[currentTeam],
        teamImage: newImageUri, // Cập nhật ảnh team
      },
    }));
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* Dropdown chọn team */}
      <View style={styles.teamSelect}>
        <Text style={styles.label}>Current team</Text>
        <View style={styles.dropdownRow}>
          <Select
            options={Object.keys(teams)}
            value={currentTeam}
            onChange={(selectedTeam) =>
              setCurrentTeam(selectedTeam as keyof typeof teams)
            }
          />
          {/* Nút Search */}
          <TouchableOpacity style={styles.searchButton}>
            <LinearGradient
              colors={["#B9E5E8", "#7AB2D3"]}
              style={styles.gradientButton}
            >
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#FFFFFF"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Thông tin team */}
      <TeamInfo
        teamName={teams[currentTeam].name}
        establishDate={teams[currentTeam].establishDate}
        createdBy={teams[currentTeam].createdBy}
        teamImage={teams[currentTeam].teamImage}
        onUpdateTeamImage={handleUpdateTeamImage}
        role={currentTeam === "Team 1" ? "member" : "admin"} // Đồng nhất kiểu dữ liệu
      />

      {/* Tabs */}
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "all" && styles.activeTab]}
            onPress={() => setSelectedTab("all")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "all" && styles.activeTabText,
              ]}
            >
              ALL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "admin" && styles.activeTab]}
            onPress={() => setSelectedTab("admin")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "admin" && styles.activeTabText,
              ]}
            >
              ADMIN
            </Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách thành viên */}
        <ScrollView>
          {filteredMembers.map((item) => (
            <View key={item.id} style={styles.memberItem}>
              <Image
                source={{ uri: item.avatar }}
                style={styles.memberAvatar}
              />
              <Text style={styles.memberName}>{item.name}</Text>

              {/* Hiển thị icon "dots-grid" nếu thành viên là admin */}
              {item.role === "admin" && (
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="dots-grid"
                    size={24}
                    color="#7AB2D3"
                  />
                </TouchableOpacity>
              )}

              {/* Hiển thị icon dấu "-" nếu userRole là admin và thành viên không phải là admin */}
              {userRole === "admin" && item.role !== "admin" && (
                <TouchableOpacity onPress={() => handleRemoveMember(item.id)}>
                  <MaterialCommunityIcons
                    name="minus-circle-outline"
                    size={24}
                    color="#FF5A5F"
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <BottomNavBar onAddPress={() => router.push("/Team/AddPlan")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  teamSelect: {
    marginBottom: 20,
    padding: 10,
  },
  content: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  dropdownRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    marginLeft: 10,
  },
  gradientButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 10,
  },

  tabContainer: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#1E282D",
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#7AB2D3", // Màu nền khi Tab được chọn
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF", // Màu chữ mặc định
  },

  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  memberName: {
    flex: 1,
    fontSize: 16,
  },
  bottom: {
    flex: 1, // Đẩy nội dung bên trên lên
    justifyContent: "flex-end", // Dồn xuống cuối
    alignItems: "center", // Căn giữa theo chiều ngang,
  },
});
