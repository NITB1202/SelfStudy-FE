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
import { formatDateToISOString } from "@/util/format";
import Error from "@/components/Message/Error";
import { hasDuplicateStrings } from "@/util/validator";
import planApi from "@/api/planApi";
import { useAuth } from "@/context/AuthContext";
import taskApi from "@/api/taskApi";
import LoadingScreen from "@/components/LoadingScreen";
import Checkbox from "@/components/Checkbox";

export default function PlanScreen() {
  const [planInfo, setPlanInfo] = useState({
    name: "",
    description: "",
    startDate: formatDateToISOString(new Date()),
    endDate: formatDateToISOString(new Date()),
    notifyBefore: "00:00:00",
  });
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task01", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    description: "",
  });
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

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

  const handleSave = async () => {
    if (planInfo.name === "") {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Name is required.",
      });
      return;
    }

    if (
      new Date(planInfo.startDate).getTime() >=
      new Date(planInfo.endDate).getTime()
    ) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "The start date must come after the end date.",
      });
      return;
    }

    const taskNames = tasks.map((item) => item.name);

    if (hasDuplicateStrings(taskNames)) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Cannot create a task with the same name.",
      });
      return;
    }

    try {
      setLoading(true);
      const planResponse: any = await planApi.create(
        userId,
        planInfo.name,
        planInfo.description,
        planInfo.startDate,
        planInfo.endDate,
        planInfo.notifyBefore
      );
      const planId = planResponse.id;
      taskNames.forEach(async (item) => {
        await taskApi.create(planId, item);
      });

      router.push("/Me/Plan");
    } catch (error: any) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <BackButton />
      <ScrollView style={styles.container}>
        <AddPlan setPlanInfo={setPlanInfo} />
        <View style={styles.divideLine}></View>
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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton title="Save" onPress={handleSave} />
      </View>
      {showError && (
        <Error
          title={message.title}
          description={message.description}
          onClose={() => setShowError(false)}
          visible={showError}
          onOkPress={() => setShowError(false)}
        ></Error>
      )}
      {loading && <LoadingScreen />}
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
  taskCompleted: {
    textDecorationLine: "line-through",
    color: "#808080",
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
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  safeview: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 10,
  },
  container: {
    flex: 1,
  },
});
