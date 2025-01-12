import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import thư viện icon
import PrivatePage from "./Private/page";
import TeamPage from "./Team/page";
import { LinearGradient } from "expo-linear-gradient";

const MissedDeadline: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"private" | "team">("private");

  return (
    <View style={styles.container}>
      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={["#B9E8BE", "#3FBE4E"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.iconButton}
        >
          <TouchableOpacity>
            <MaterialIcons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={["#FFA4A5", "#FF2D30"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.iconButton}
        >
          <TouchableOpacity>
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "private" && styles.activeTab]}
          onPress={() => setSelectedTab("private")}
        >
          <Text style={styles.tabText}>PRIVATE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === "team" && styles.activeTab]}
          onPress={() => setSelectedTab("team")}
        >
          <Text style={styles.tabText}>TEAM</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {selectedTab === "private" && <PrivatePage />}
        {selectedTab === "team" && <TeamPage />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
    padding: 8,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#7AB2D3",
  },
  tabText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
});

export default MissedDeadline;
