import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlanItem from "./PlanItem";

interface Plan {
  id: number;
  progress: number;
  planName: string;
  deadline: string;
  isAdmin: boolean;
}

interface PlanListProps {
  onPlanPress: (planName: string) => void;
}

export default function PlanList({ onPlanPress }: PlanListProps) {
  const plans: Plan[] = [
    {
      id: 1,
      progress: 78.6,
      planName: "PLAN01",
      deadline: "2024-12-02 11:20:00",
      isAdmin: true,
    },
    {
      id: 2,
      progress: 65.4,
      planName: "PLAN02",
      deadline: "2024-12-05 14:30:00",
      isAdmin: false,
    },
    {
      id: 3,
      progress: 50.0,
      planName: "PLAN03",
      deadline: "2024-12-10 09:00:00",
      isAdmin: true,
    },
    {
      id: 4,
      progress: 25.0,
      planName: "PLAN04",
      deadline: "2025-01-01 10:00:00",
      isAdmin: false,
    },
    {
      id: 5,
      progress: 95.0,
      planName: "PLAN05",
      deadline: "2025-02-03 12:00:00",
      isAdmin: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="target" size={30} color="#7AB2D3" />
        <Text style={styles.headerText}>Plans</Text>
      </View>
      {plans.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => onPlanPress(item.planName)}
          style={styles.planItemContainer}
        >
          <PlanItem
            planName={item.planName}
            progress={item.progress}
            deadline={item.deadline}
          />
          {item.isAdmin && (
            <MaterialCommunityIcons
              name="account-outline"
              size={30}
              color="#7AB2D3"
            />
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
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
    marginLeft: 8,
  },
  planItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
});
