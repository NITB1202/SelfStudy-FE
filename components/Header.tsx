import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Thư viện icon
import Sidebar from "../components/navigation/SideBar"; // Import Sidebar Component

export default function Header() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State để điều khiển Sidebar

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Mở hoặc đóng Sidebar
  };

  return (
    <View style={styles.container}>
      {/* Icon menu */}
      <TouchableOpacity style={styles.iconContainer} onPress={toggleSidebar}>
        <Ionicons name="menu" size={24} color="#7AB2D3" />
      </TouchableOpacity>

      {/* Tên người dùng và mũi tên */}
      <View style={styles.userContainer}>
        <Text style={styles.userName}>Robin</Text>
        <Ionicons
          name="chevron-down"
          size={16}
          color="gray"
          style={styles.iconDown}
        />
      </View>

      {/* Ảnh đại diện */}
      <Image
        source={{
          uri: "https://i1-giaitri.vnecdn.net/2022/09/23/-5865-1663929656.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=2qbqN6-vYy6SJLboH93pYA",
        }} // Thay bằng link ảnh thực tế
        style={styles.avatar}
      />
      <Modal
        transparent={true}
        visible={isSidebarVisible}
        onRequestClose={toggleSidebar}
      >
        <View style={styles.modalContainer}>
          <Sidebar onClose={toggleSidebar} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    width: "100%",
    height: 42,
    backgroundColor: "transparent",
    shadowColor: "transparent",
    borderWidth: 0,
  },

  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF5FA",
    borderRadius: 10,
    elevation: 4,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  userName: {
    fontSize: 16,
    color: "black",
    marginRight: 5,
    fontWeight: "500",
    fontFamily: "Poppins_400Regular",
  },
  iconDown: {
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
