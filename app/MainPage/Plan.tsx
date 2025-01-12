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
import APlan from "../../components/plan/APlan";
import BackButton from "@/components/BackButton";
import { router, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Checkbox from "@/components/Checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

export default function PlanScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task01", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskName, setEditingTaskName] = useState("");
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
    <SafeAreaView style={styles.safeview}>
      <BackButton />
      <ScrollView style={styles.container}>
        <APlan Name={planName} />
        <View style={styles.divideLine}></View>
        <View style={styles.tasksSectionWrapper}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          {
            tasks.map(item => {
              return(
                <View key={item.id}>
                  <View
                    style={styles.taskContainer}>
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
                </View>
              );
            })
          }
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
          onPress={() => {
            router.push("/MainPage/MePlan");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  tasksSectionWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#7AB2D3",
    marginBottom: 20,
    fontFamily: "PlusJakartaSans_700Bold",
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
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  addTaskInput: {
    fontSize: 14,
    color: "#000",
    flex: 1,
    marginLeft: 10,
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
  }
});
