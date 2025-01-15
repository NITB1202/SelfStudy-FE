import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlanInfo from "../../components/plan/PlanInfo";
import BackButton from "@/components/BackButton";
import { router, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Checkbox from "@/components/Checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
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

  // Danh sách các Assignees có sẵn để chọn
  const availableAssignees = [
    {
      id: 2,
      name: "Alice",
      avatar: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-102.jpg",
    },
    {
      id: 3,
      name: "Bob",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Iqfw4D_ivGHG07zJGKa6INsxFnbaSSZo7wjHYa75MrRY5oiTRaNyEUUsly8YRnWdvZg&usqp=CAU",
    },
    {
      id: 4,
      name: "Charlie",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRr3a1KXOZGASLEIz795oUqGKhIsMCEjM-bilF9HsiaUkOH22bVXFfKOBr5I-VohXA8ZI&usqp=CAU",
    },
  ];
  const [assignees, setAssignees] = useState([
    {
      id: 1,
      name: "John",
      avatar:
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/hinh-anh-de-thuong-41.jpg",
    },
  ]); // Danh sách Assignees hiện tại
  const [modalVisible, setModalVisible] = useState(false); // Modal cho danh sách chọn Assignee
  // Thêm Assignee mới vào danh sách
  const handleAddAssignee = (assignee: {
    id: number;
    name: string;
    avatar: string;
  }) => {
    if (!assignees.some((a) => a.id === assignee.id)) {
      setAssignees((prevAssignees) => [...prevAssignees, assignee]);
    }
    setModalVisible(false); // Đóng modal sau khi chọn
  };

  // Xóa Assignee
  const handleRemoveAssignee = (id: number) => {
    setAssignees((prevAssignees) =>
      prevAssignees.filter((assignee) => assignee.id !== id)
    );
  };
  const navigateToUserSelection = () => {
    // Truyền assignees qua params khi điều hướng
    router.push({
      pathname: "./User", // Trang SearchUser
      params: { assignees: JSON.stringify(assignees) }, // Chuyển assignees thành chuỗi JSON
    });
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <BackButton />
      <ScrollView style={styles.container}>
        <PlanInfo Name={planName} />

        <View style={styles.assigneesSection}>
          <Text style={styles.sectionTitle}>Assignee</Text>
          <View style={styles.assigneesContainer}>
            {assignees.map((assignee) => (
              <TouchableOpacity
                key={assignee.id}
                onPress={() => handleRemoveAssignee(assignee.id)}
              >
                <Image
                  source={{ uri: assignee.avatar }}
                  style={styles.assigneeAvatar}
                />
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={navigateToUserSelection}>
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={30}
                color="#7AB2D3"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divideLine}></View>
        <View style={styles.tasksSectionWrapper}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          {tasks.map((item) => {
            return (
              <View key={item.id}>
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
              </View>
            );
          })}
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
            router.push("/Me/Plan");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  tasksSectionWrapper: {
    flex: 1,
    paddingHorizontal: 20,
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
  closeModalText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
});
