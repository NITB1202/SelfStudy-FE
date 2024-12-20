import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import icon
import PlanItem from "./PlanItem";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

interface Plan {
  id: number;
  progress: number;
  planName: string;
  deadline: string;
}

interface PlanListProps {
  onPlanPress: (planId: number) => void; // Thêm sự kiện onPlanPress
}

export default function PlanList({ onPlanPress }: PlanListProps) {
  const plans: Plan[] = [
    {
      id: 1,
      progress: 78.6,
      planName: "PLAN01",
      deadline: "2024-12-02 11:20:00",
    },
    {
      id: 2,
      progress: 65.4,
      planName: "PLAN02",
      deadline: "2024-12-05 14:30:00",
    },
    {
      id: 3,
      progress: 50.0,
      planName: "PLAN03",
      deadline: "2024-12-10 09:00:00",
    },
    {
      id: 4,
      progress: 25.0,
      planName: "PLAN04",
      deadline: "2024-12-15 10:00:00",
    },
    {
      id: 5,
      progress: 95.0,
      planName: "PLAN05",
      deadline: "2024-12-20 12:00:00",
    },
  ];

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleString();
  };

  const renderItem = ({ item }: { item: Plan }) => (
    <TouchableOpacity onPress={() => onPlanPress(item.id)}>
      <PlanItem
        progress={item.progress}
        planName={item.planName}
        deadline={formatDeadline(item.deadline)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="clipboard-list-outline"
          size={30}
          color="#7AB2D3"
        />
        <Text style={styles.headerText}>Plans</Text>
      </View>
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.planSeparator} />}
        contentContainerStyle={[styles.contentContainer, { width: 379 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginLeft: 8, // Tạo khoảng cách giữa icon và chữ
  },
  contentContainer: {
    paddingBottom: 20,
  },
  planSeparator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});
