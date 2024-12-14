import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState("Me"); // Quản lý tab đang được chọn

  return (
    <View style={styles.container}>
      {/* Left Navigation Items */}
      <View style={styles.leftNavItems}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Me");
            router.push("/MainPage/MePlan");
          }}
        >
          <MaterialIcons
            name="person"
            size={24}
            color={activeTab === "Me" ? "#7AB2D3" : "#C0C0C0"} // Đổi màu
          />
          <Text
            style={[
              styles.navText,
              { color: activeTab === "Me" ? "#7AB2D3" : "#C0C0C0" },
            ]}
          >
            Me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab("MissedDeadline");
            router.push("/");
          }}
        >
          <MaterialIcons
            name="error"
            size={24}
            color={activeTab === "MissedDeadline" ? "#7AB2D3" : "#C0C0C0"}
          />
          <Text
            style={[
              styles.navText,
              { color: activeTab === "MissedDeadline" ? "#7AB2D3" : "#C0C0C0" },
            ]}
          >
            Missed Deadline
          </Text>
        </TouchableOpacity>
      </View>

      {/* Center Add Button */}
      <View style={styles.centerButtonWrapper}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setActiveTab("Add");
            router.push("/MainPage/AddPlanPage");
          }}
        >
          <MaterialIcons name="add" size={36} color="white" />
        </TouchableOpacity>
      </View>

      {/* Right Navigation Items */}
      <View style={styles.rightNavItems}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Team");
            router.push("/");
          }}
        >
          <MaterialIcons
            name="group"
            size={24}
            color={activeTab === "Team" ? "#7AB2D3" : "#C0C0C0"}
          />
          <Text
            style={[
              styles.navText,
              { color: activeTab === "Team" ? "#7AB2D3" : "#C0C0C0" },
            ]}
          >
            Team
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Notification");
            router.push("/");
          }}
        >
          <MaterialIcons
            name="notifications"
            size={24}
            color={activeTab === "Notification" ? "#7AB2D3" : "#C0C0C0"}
          />
          <Text
            style={[
              styles.navText,
              { color: activeTab === "Notification" ? "#7AB2D3" : "#C0C0C0" },
            ]}
          >
            Notification
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
  },

  leftNavItems: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  rightNavItems: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  centerButtonWrapper: {
    position: "absolute",
    top: -30,
    left: "50%",
    transform: [{ translateX: -12 }],
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#7AB2D3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
