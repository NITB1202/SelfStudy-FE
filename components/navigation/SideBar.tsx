import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Icon libraries

interface SidebarProps {
  onClose: () => void; // Function to close the sidebar
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [activeMenu, setActiveMenu] = useState("Plan"); // Default active menu is "Plan"

  const menuItems = [
    {
      id: "Plan",
      label: "Plan",
      icon: <MaterialCommunityIcons name="target" size={24} color="#1E282D" />, // Updated to use the "target" icon
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
      {/* Close Button */}
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialCommunityIcons name="close-circle" size={24} color="white" />
      </TouchableOpacity>

      {/* Header Section */}
      <View>
        <Image
          source={require("../../assets/images/Header.png")} // Replace with your header image
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
              activeMenu === item.id && styles.activeMenuItem, // Apply active style
            ]}
            onPress={() => setActiveMenu(item.id)} // Set active menu
          >
            {item.icon}
            <Text
              style={[
                styles.menuText,
                // Apply active text style
              ]}
            >
              {item.label}
            </Text>
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
    left: 15, // Positioned to the left
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
    backgroundColor: "#FFFFFF", // Default background color for menu items
  },
  activeMenuItem: {
    backgroundColor: "#EDEDED", // Highlight background for active item
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#1E282D",
    fontFamily: "Poppins_400Regular",
  },
});
