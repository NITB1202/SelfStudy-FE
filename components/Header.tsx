import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "../components/navigation/SideBar";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { usePathname } from "expo-router";
import { useNavigationContext } from "@/context/NavigationContext";

export default function Header({ showMenu = true }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Plan");
  const pathname = usePathname();
  const { setSidePath } = useNavigationContext();

  useEffect(() => {
    const loadActiveTab = () => {
      let tab = "Plan";

      switch (pathname) {
        case "/Me/Plan":
          tab = "Plan";
          break;
        case "/Me/Document":
          tab = "Document";
          break;
        case "/Me/Session":
          tab = "Session";
          break;
        case "/Me/Statistic":
          tab = "Statistic";
          break;
      }

      if (tab === activeTab) return;
      setActiveTab(tab);
      setSidePath(tab);
    };
    loadActiveTab();
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <View>
      <View style={styles.container}>
        {/* Nút menu (chỉ hiển thị nếu showMenu = true) */}
        {showMenu && (
          <LinearGradient
            colors={[Colors.secondary, Colors.primary]}
            style={styles.iconContainer}
          >
            <Pressable onPress={toggleSidebar}>
              <Ionicons name="list" size={24} color="white" />
            </Pressable>
          </LinearGradient>
        )}

        {/* Avatar luôn nằm bên phải */}
        <View style={styles.rightContainer}>
          <Ionicons
            name="chevron-down"
            size={24}
            color={Colors.primary}
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
      </View>
      <View style={styles.bottomBorder} />
      <Modal
        transparent={true}
        visible={isSidebarVisible}
        onRequestClose={toggleSidebar}
      >
        <View style={styles.modalContainer}>
          <Sidebar initialTab={activeTab} onClose={toggleSidebar} />
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
    backgroundColor: "transparent",
    paddingHorizontal: 20,
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
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto", // Đẩy avatar luôn nằm bên phải
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
  bottomBorder: {
    borderBottomColor: "rgba(1,1,1,0.1)",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
