import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface BottomNavBarProps {
  onAddPress?: () => void; // Nút Add sẽ chỉ hiển thị khi có callback này
  initialActiveTab?: string; // Tab được active ban đầu
}

export default function BottomNavBar({
  onAddPress,
  initialActiveTab = "Me",
}: BottomNavBarProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  return (
    <View style={styles.container}>
      {/* Left Navigation Items */}
      <View
        style={[
          styles.leftNavItems,
          !onAddPress && styles.noAddNavItems, // Áp dụng khoảng cách khi không có nút Add
        ]}
      >
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Me");
            router.push("/MainPage/MePlan");
          }}
        >
          <MaterialIcons
            name="person"
            size={24}
            color={activeTab === "Me" ? "#7AB2D3" : "#C0C0C0"}
          />
          <Text
            style={[
              styles.navText,
              { color: activeTab === "Me" ? "#7AB2D3" : "#C0C0C0" },
            ]}
          >
            Me
          </Text>
        </Pressable>
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab("MissedDeadline");
            router.push("/MissedDeadline/page");
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
        </Pressable>
      </View>

      {/* Center Add Button (Only if onAddPress is provided) */}
      {onAddPress && (
        <View style={styles.centerButtonWrapper}>
          <LinearGradient
            colors={["#B9E5E8", "#7AB2D3"]}
            style={styles.addButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Pressable
              onPress={() => {
                setActiveTab("Add");
                onAddPress();
              }}
            >
              <Ionicons name="add-outline" size={36} color="white" />
            </Pressable>
          </LinearGradient>
        </View>
      )}

      {/* Right Navigation Items */}
      <View
        style={[
          styles.rightNavItems,
          !onAddPress && styles.noAddNavItems, // Áp dụng khoảng cách khi không có nút Add
        ]}
      >
        <Pressable
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
        </Pressable>
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Notification");
            router.push("/Notification");
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
              {
                color: activeTab === "Notification" ? "#7AB2D3" : "#C0C0C0",
              },
            ]}
          >
            Notification
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
    paddingHorizontal: 20,
    width: "95%",
    borderRadius: 40,
    borderColor: "rgba(1,1,1,0.1)",
    borderWidth: 1,
    paddingVertical: 3,
    marginBottom: 5,
    justifyContent: "space-between", // Default: space-between for all items
  },
  leftNavItems: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  rightNavItems: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  noAddNavItems: {
    gap: 40, // Cách 40px giữa leftNavItems và rightNavItems khi không có nút Add
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    fontWeight: "600",
  },
  centerButtonWrapper: {
    position: "absolute",
    top: "-55%",
    left: "50%",
    transform: [{ translateX: 0 }], // Align center button
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
