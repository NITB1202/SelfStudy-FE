import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PrivatePage from "./Private/page";
import TeamPage from "./Team/page";

const MissedDeadline: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"private" | "team">("private");

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "private" && styles.activeTab]}
          onPress={() => setSelectedTab("private")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "private" && styles.activeTabText,
            ]}
          >
            PRIVATE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === "team" && styles.activeTab]}
          onPress={() => setSelectedTab("team")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "team" && styles.activeTabText,
            ]}
          >
            TEAM
          </Text>
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
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
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
    fontSize: 16,
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});

export default MissedDeadline;
