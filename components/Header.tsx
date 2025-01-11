import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "../components/navigation/SideBar";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";


export default function Header() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.secondary, Colors.primary]}
        style = {styles.iconContainer}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="list" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.userContainer}>
        <Ionicons
          name="chevron-down"
          size={24}
          color={Colors.primary }
          style={styles.iconDown}
        />
        <Text style={styles.userName}>Robin</Text>
        <Image
          source={{
            uri: "https://i1-giaitri.vnecdn.net/2022/09/23/-5865-1663929656.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=2qbqN6-vYy6SJLboH93pYA",
          }}
          style={styles.avatar}
        />
      </View>

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
    gap: 10,
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
