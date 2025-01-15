import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import { router, useNavigation } from "expo-router";
import AddPlan from "@/components/plan/AddPlan";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlanScreen() {
  const [planInfo, setPlanInfo] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    notifyBefore: "",
  });

  const [tasks, setTasks] = useState<{
    id: number,
    name: string
  }[]>([]);
  const [newTask, setNewTask] = useState("");
  
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, name: newTask },
      ]);
      setNewTask("");
    }
  };
  
  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleSave = () => {
    console.log(planInfo);
    console.log(tasks);
  }

  return (
     <SafeAreaView style={styles.safeview}>
      <BackButton />
      <ScrollView style={styles.container}>
        <AddPlan setPlanInfo={setPlanInfo}/>
        <View style={styles.divideLine}></View>
        {/* Tasks Section */}
        <View style={styles.tasksSectionWrapper}>
          <Text style={styles.sectionTitle}>Tasks</Text>
            {tasks.map((item) => (
              <View key={item.id.toString()} style={styles.taskContainer}>
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={24}
                  color="#7AB2D3"
                />
                <TextInput
                  style={styles.taskInput}
                  value={item.name}
                  editable={false}
                />
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="#C0C0C0"
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.addTaskContainer}>
              <TouchableOpacity onPress={handleAddTask}>
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  size={30}
                  color="#7AB2D3"
                />
              </TouchableOpacity>
              <TextInput
                style={styles.addTaskInput}
                placeholder="Add new task"
                value={newTask}
                onChangeText={setNewTask}
              />
            </View>
          </View>
      </ScrollView>
 
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Save"
          onPress={handleSave}
        />
      </View>
     </SafeAreaView>
   );
}

const styles = StyleSheet.create({
  planSectionWrapper: {
    flex: 0,
    maxHeight: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#7AB2D3",
    marginBottom: 20,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  tasksSectionWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    elevation: 4,
    width: "100%",
    height: 44,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  taskInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  addTaskInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  addTaskInput: {
    fontSize: 14,
    color: "#000",
    flex: 1,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: "#7AB2D3",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  divideLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(1,1,1,0.2)", 
    margin: 20,
  },
  buttonContainer:{
    width: "100%",
    paddingHorizontal: 10,
  },
  safeview:{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 10
  },
  container: {
    flex: 1,
  },
});