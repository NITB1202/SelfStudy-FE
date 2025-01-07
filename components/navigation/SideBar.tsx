import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [activeMenu, setActiveMenu] = useState("Plan");

  const menuItems = [
    {
      id: "Plan",
      label: "Plan",
      icon: <MaterialCommunityIcons name="target" size={24} color="#1E282D" />,
    },
    {
      id: "Document",
      label: "Document",
      icon: (
        <MaterialCommunityIcons
          name="file-document-outline"
          size={24}
          color="#1E282D"
        />
      ),
    },
    {
      id: "Session",
      label: "Session",
      icon: <Ionicons name="timer-outline" size={24} color="#1E282D" />,
    },
    {
      id: "Statistic",
      label: "Statistic",
      icon: (
        <MaterialCommunityIcons name="chart-bar" size={24} color="#1E282D" />
      ),
    },
  ];

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialCommunityIcons name="close-circle" size={24} color="white" />
      </TouchableOpacity>

      <View>
        <Image
          source={require("../../assets/images/Header.png")}
          style={styles.logo}
        />
      </View>
      {/* Menu Items */}
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              activeMenu === item.id && styles.activeMenuItem,
            ]}
            onPress={() => setActiveMenu(item.id)}
          >
            {item.icon}
            <Text style={[styles.menuText]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    width: "40%",
    height: "100%",
    backgroundColor: "white", // Light background similar to the design
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 15,
    zIndex: 2,
  },
  logo: {
    width: "100%",
    height: 143,
    marginBottom: 10,
  },
  menu: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  activeMenuItem: {
    backgroundColor: "#EDEDED",
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#1E282D",
    fontFamily: "Poppins_400Regular",
  },
});
