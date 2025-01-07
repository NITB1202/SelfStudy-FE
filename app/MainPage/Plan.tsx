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
import APlan from "../../components/plant/APlant";
import BackButton from "@/components/BackButton";
import { router, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Checkbox from "@/components/Checkbox";

export default function PlanScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task01", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // Theo dõi task đang chỉnh sửa
  const [editingTaskName, setEditingTaskName] = useState(""); // Tên task đang được chỉnh sửa
  const searchParams = useLocalSearchParams();
  const planName = searchParams.planName as string;

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, name: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };
  const toggleTaskCompletion = (id: number, isChecked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: isChecked } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const startEditingTask = (id: number, name: string) => {
    setEditingTaskId(id);
    setEditingTaskName(name);
  };

  const saveEditedTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: editingTaskName } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskName("");
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView style={styles.planSectionWrapper}>
        <APlan Name={planName} />
      </ScrollView>
      <View style={styles.tasksSectionWrapper}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Checkbox
                onToggle={(isChecked) =>
                  toggleTaskCompletion(item.id, isChecked)
                }
              />
              <View style={styles.taskContent}>
                {editingTaskId === item.id ? (
                  <TextInput
                    style={styles.taskInput}
                    value={editingTaskName}
                    onChangeText={setEditingTaskName}
                    onSubmitEditing={() => saveEditedTask(item.id)}
                    autoCorrect={false}
                    keyboardType="default"
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => startEditingTask(item.id, item.name)}
                  >
                    <Text
                      style={[
                        styles.taskText,
                        item.completed && styles.taskTextCompleted,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color="#C0C0C0"
                />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={
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

              <TouchableOpacity onPress={handleAddTask}>
                <MaterialCommunityIcons name="check" size={24} color="green" />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          router.push("/MainPage/MePlan");
        }}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  planSectionWrapper: {
    flex: 0,
    maxHeight: "50%",
    marginBottom: 10,
  },
  tasksSectionWrapper: {
    flex: 1,
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
  taskContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  taskText: {
    fontSize: 14,
    color: "#000",
  },
  taskInput: {
    flex: 1,

    fontSize: 14,
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
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "gray",
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
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
