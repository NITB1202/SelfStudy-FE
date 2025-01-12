import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import PlanItemNoti from "@/components/plan/PlanItemNoti";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";

const teamsData = {
  Team1: {
    role: "admin",
    plans: [
      {
        progress: 78.6,
        planName: "PLAN01",
        deadline: "2024-12-02 11:20:00",
      },
      {
        progress: 30,
        planName: "PLAN02",
        deadline: "2024-12-03 10:00:00",
      },
    ],
  },
  Team2: {
    role: "admin",
    plans: [
      {
        progress: 90,
        planName: "PLAN03",
        deadline: "2024-12-04 14:00:00",
      },
      {
        progress: 50,
        planName: "PLAN04",
        deadline: "2024-12-05 12:00:00",
      },
    ],
  },
  Team3: {
    role: "member",
    plans: [
      {
        progress: 40,
        planName: "PLAN05",
        deadline: "2024-12-06 16:00:00",
      },
      {
        progress: 70,
        planName: "PLAN06",
        deadline: "2024-12-07 18:00:00",
      },
    ],
  },
};

const TeamPage: React.FC = () => {
  const [selectedTeam, setSelectedTeam] =
    useState<keyof typeof teamsData>("Team1");
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const currentTeam = teamsData[selectedTeam];
  const isAdmin = currentTeam.role === "admin";

  const handleCheckAllToggle = () => {
    if (!isAdmin) return;
    const newCheckedState = !isAllChecked;
    setIsAllChecked(newCheckedState);
    setCheckedItems(currentTeam.plans.map(() => newCheckedState));
  };

  const handleItemToggle = (index: number) => {
    if (!isAdmin) return;
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    setIsAllChecked(newCheckedItems.every((item) => item));
  };

  React.useEffect(() => {
    setCheckedItems(currentTeam.plans.map(() => false));
    setIsAllChecked(false);
  }, [selectedTeam]);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Current team</Text>

        {/* Team Selector */}
        <View style={styles.selectorContainer}>
          <View style={styles.selectWrapper}>
            <Select
              options={Object.keys(teamsData) as (keyof typeof teamsData)[]}
              value={selectedTeam}
              onChange={(value) =>
                setSelectedTeam(value as keyof typeof teamsData)
              }
            />
          </View>
          {/* Search Button with Gradient */}
          <LinearGradient
            colors={["#B9E5E8", "#7AB2D3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.searchButton}
          >
            <Pressable>
              <MaterialIcons name="search" size={24} color="white" />
            </Pressable>
          </LinearGradient>
        </View>

        {isAdmin && (
          <View style={styles.checkAllContainer}>
            <Checkbox
              onToggle={handleCheckAllToggle}
              isChecked={isAllChecked}
            />
            <Text style={styles.checkAllText}>Check all</Text>
          </View>
        )}

        {currentTeam.plans.map((plan, index) => (
          <PlanItemNoti
            key={index}
            progress={plan.progress}
            planName={plan.planName}
            deadline={plan.deadline}
            isChecked={checkedItems[index]}
            onToggle={isAdmin ? () => handleItemToggle(index) : undefined}
            showCheckbox={isAdmin}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: 11,
    fontWeight: "400",
    marginBottom: 10,
    color: "rgba(0, 0, 0, 0.5)",
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "60%",
  },
  selectWrapper: {
    position: "relative",
    zIndex: 1,
    flex: 1,
  },
  searchButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Bo tròn giống hình
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  checkAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 10,
  },
  checkAllText: {
    fontSize: 16,

    color: "#333",
  },
});

export default TeamPage;
