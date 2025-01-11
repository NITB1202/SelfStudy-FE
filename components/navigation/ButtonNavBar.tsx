import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface BottomNavBarProps {
  onAddPress?: () => void;
}

export default function BottomNavBar({ onAddPress }: BottomNavBarProps) {
  const [activeTab, setActiveTab] = useState("Me");

  return (
    <View style={styles.container}>
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

      <View style={styles.centerButtonWrapper}>
        <LinearGradient
          colors={["#B9E5E8", "#7AB2D3"]}
          style={styles.addButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <TouchableOpacity
            onPress={() => {
              setActiveTab("Add");
              if (onAddPress) {
                onAddPress();
              } else {
                console.warn("No onAddPress function provided!");
              }
            }}
          >
            <MaterialIcons name="add" size={36} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

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
              {
                color: activeTab === "Notification" ? "#7AB2D3" : "#C0C0C0",
              },
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
    borderColor: "rgba(1,1,1,0.1)",
    borderWidth: 1,
    paddingVertical: 3,
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
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
  },
  centerButtonWrapper: {
    position: "absolute",
    top: "-55%",
    left: "53%",
    transform: [{ translateX: -12 }],
  },
  addButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  touchableButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
