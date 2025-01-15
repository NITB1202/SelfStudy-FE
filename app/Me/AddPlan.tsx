import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import { router, useNavigation } from "expo-router";
import AddPlan from "@/components/plan/AddPlan";

export default function PlanScreen() {
  const [tasks, setTasks] = useState([{ id: 1, name: "Task01" }]);
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false); // Trạng thái cho việc hiển thị TextInput khi nhấn dấu +
  const navigation = useNavigation(); // Get navigation prop
  // Thêm task mới vào danh sách
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, name: newTask },
      ]);
      setNewTask(""); // Reset input sau khi thêm task
      setIsAddingTask(false); // Đóng TextInput sau khi thêm task
    }
  };

  // Xóa task theo id
  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <ScrollView style={styles.planSectionWrapper}>
      {/* Back Button */}
      <BackButton />
      {/* Scrollable AddAPlan Component */}
      <AddPlan />

      {/* Tasks Section */}
      <View style={styles.tasksSectionWrapper}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Task List */}
          {tasks.map((item) => (
            <View style={styles.taskContainer} key={item.id}>
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

          {/* Add New Task */}
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
          router.push("/Me/Plan");
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
    maxHeight: "100%", // Chiều cao tối đa là 50% màn hình
    marginBottom: 10,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tasksSectionWrapper: {
    flex: 1, // Chiếm nửa dưới màn hình
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7AB2D3",
    marginBottom: 10,
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
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
