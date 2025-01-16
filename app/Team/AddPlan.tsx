import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import { router, useRouter } from "expo-router";
import AddPlan from "@/components/plan/AddPlan";
import SearchUser from "./User";
import Checkbox from "@/components/Checkbox";

export default function PlanScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task01", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, name: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number, isChecked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: isChecked } : task
      )
    );
  };

  return (
    <ScrollView style={styles.planSectionWrapper}>
      {/* Back Button */}
      <BackButton />

      {/* Add Plan Section */}
      <AddPlan />

      {/* Tasks Section */}
      <View style={styles.tasksSectionWrapper}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <ScrollView>
          {tasks.map((item) => (
            <View key={item.id.toString()} style={styles.taskContainer}>
              <Checkbox
                isChecked={item.completed}
                onToggle={(isChecked) =>
                  toggleTaskCompletion(item.id, isChecked)
                }
              />
              <TextInput
                style={[
                  styles.taskInput,
                  item.completed && styles.taskCompleted,
                ]}
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
        </ScrollView>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          router.push("/Team/Plan");
        }}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
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
  assigneesSection: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7AB2D3",
    marginBottom: 10,
  },
  assigneesContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  assigneeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7AB2D3",
    marginBottom: 20,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  modalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalName: {
    fontSize: 16,
    color: "#000",
  },
  closeModalButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#7AB2D3",
    borderRadius: 8,
  },
  taskCompleted: {
    textDecorationLine: "line-through",
    color: "#808080",
  },
  closeModalText: {
    color: "white",
    fontWeight: "bold",
  },
  tasksSectionWrapper: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    fontSize: 12,
    color: "#000",
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
    height: 44,
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
    paddingVertical: 5,
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
});
