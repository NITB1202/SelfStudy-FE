import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Checkbox from "@/components/Checkbox";

const TeamPage: React.FC = () => {
  const handleToggle = (isChecked: boolean) => {
    console.log(`Checkbox state: ${isChecked}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Team</Text>

      {/* Item 1 */}
      <View style={styles.item}>
        <Checkbox onToggle={handleToggle} />
        <Text style={styles.text}>PLAN01 - Deadline: 2024-12-02 11:20:00</Text>
      </View>

      {/* Item 2 */}
      <View style={styles.item}>
        <Checkbox onToggle={handleToggle} />
        <Text style={styles.text}>PLAN02 - Deadline: 2024-12-03 10:00:00</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default TeamPage;
