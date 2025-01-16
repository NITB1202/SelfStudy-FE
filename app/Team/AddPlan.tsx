import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import { router } from "expo-router";
import AddPlan from "@/components/plan/AddPlan";

export default function PlanScreen() {
  const [tasks, setTasks] = useState([{ id: 1, name: "Task01" }]);
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false); // Trạng thái cho việc hiển thị TextInput khi nhấn dấu +
  const [assignees, setAssignees] = useState([
    {
      id: 1,
      name: "John",
      avatar:
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/hinh-anh-de-thuong-41.jpg",
    },
  ]); // Danh sách Assignees hiện tại
  const [modalVisible, setModalVisible] = useState(false); // Modal cho danh sách chọn Assignee

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
  // Thêm task mới vào danh sách
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, name: newTask },
      ]);
      setNewTask("");
      setIsAddingTask(false);
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={30}
              color="#7AB2D3"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Selecting Assignee */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Assignee</Text>
            {availableAssignees.map((assignee) => (
              <TouchableOpacity
                key={assignee.id}
                style={styles.modalItem}
                onPress={() => handleAddAssignee(assignee)}
              >
                <Image
                  source={{ uri: assignee.avatar }}
                  style={styles.modalAvatar}
                />
                <Text style={styles.modalName}>{assignee.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Tasks Section */}
      <View style={styles.tasksSectionWrapper}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <ScrollView>
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
  closeModalText: {
    color: "white",
    fontWeight: "bold",
  },
  tasksSectionWrapper: {
    flex: 1, // Chiếm nửa dưới màn hình
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
