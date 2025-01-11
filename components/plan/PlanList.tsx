import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlanItem from "./PlanItem";


interface Plan {
  id: number;
  progress: number;
  planName: string;
  deadline: string;
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="target"
          size={30}
          color="#7AB2D3"
        />
        <Text style={styles.headerText}>Plans</Text>
      </View>
      {
        plans.map((item)=>{
          return(
            <Pressable
              key={item.id}
              onPress={() => onPlanPress(item.planName)}>
              <PlanItem
                planName={item.planName}
                progress={item.progress}
                deadline={item.deadline}>
              </PlanItem>
            </Pressable>
          );
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
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
  contentContainer: {
    paddingBottom: 20,
  },
  planSeparator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});
