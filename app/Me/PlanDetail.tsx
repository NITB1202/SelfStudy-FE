import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlanInfo from "../../components/plan/PlanInfo";
import BackButton from "@/components/BackButton";
import { router, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Checkbox from "@/components/Checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { formatDateToISOString } from "@/util/format";
import planApi from "@/api/planApi";
import taskApi from "@/api/taskApi";
import LoadingScreen from "@/components/LoadingScreen";
import { Colors } from "@/constants/Colors";
import Error from "@/components/Message/Error";
import { hasDuplicateStrings } from "@/util/validator";

export default function PlanScreen() {
  const [tasks, setTasks] = useState<{
     id: string,
     name: string,
     status: string,
  }[]>([]);

  const [planInfo, setPlanInfo] = useState({
    name: "",
    description: "",
    startDate: formatDateToISOString(new Date()),
    endDate: formatDateToISOString(new Date()),
    notifyBefore: "00:00:00",
    status: "INCOMPLETE",
    completeDate: null,
  });
  
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  const searchParams = useLocalSearchParams();
  const id = searchParams.id as string;
  const [loading, setLoading] = useState(false);
  const [addedTasks, setAddedTask] = useState<string[]>([]);
  const [deletedTaskIds, setDeletedTaskIds] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    description: "",
  });

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        if(id === null) return;
        setLoading(true);
        const response: any = await planApi.getById(id);
        const taskResponse: any = await taskApi.getAllForPlan(id);

        const formarttedData = taskResponse.map((item: any) =>({
          id: item.taskId,
          name: item.name,
          status: item.status
        }));

        setPlanInfo({
          name: response.name,
          description: response.description,
          startDate: response.startDate,
          endDate: response.endDate,
          notifyBefore: response.notifyBefore,
          status: response.status,
          completeDate: response.completeDate,
        });

        setTasks(formarttedData);
      }
      catch(error){
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchData();
  },[id])

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setAddedTask((prevTasks) => [
        ...prevTasks,
        newTask,
      ]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id: string, isChecked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: isChecked? "COMPLETED" : "INCOMPLETE" } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setDeletedTaskIds((prev)=> [...prev, id]);
  };

  const startEditingTask = (id: string, name: string) => {
    setEditingTaskId(id);
    setEditingTaskName(name);
  };

  const saveEditedTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: editingTaskName } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskName("");
  };

  const handleDeleteNewTask = (index: number) => {
    setAddedTask((prevTasks) => prevTasks.filter((task, taskIndex) => taskIndex !== index));
  }

  const handleChange = (field: string, value: string) => {
    if(setPlanInfo)
      setPlanInfo((prev: any) => ({
        ...prev,
        [field]: value,
      }));
  };

  const handleSave = async () =>{
    if(planInfo.name === ""){
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Name is required."
      });
      return;
    }

    if(new Date(planInfo.startDate).getTime() >= new Date(planInfo.endDate).getTime()){
      setShowError(true);
      setMessage({
        title: "Error",
        description: "The start date must come after the end date."
      });
      return;
    }

    const taskNames = tasks.map(item => item.name);

    if(hasDuplicateStrings([...taskNames, ...addedTasks])){
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Cannot have tasks with the same name."
      });
      return;
    }

    try{
      setLoading(true);
      await planApi.update(id, planInfo.name, planInfo.description, 
      planInfo.startDate, planInfo.endDate, planInfo.notifyBefore);
      tasks.forEach(async element => {
        await taskApi.update(element.id, element.name, element.status);
      });
      deletedTaskIds.forEach(async element => {
        await taskApi.delete(element);
      });
      addedTasks.forEach(async element => {
        await taskApi.create(id, element);
      });
      router.push("/Me/Plan");
    }
    catch(error: any){
      setShowError(true);
      setMessage({
        title: "Error",
        description:  error. status === 500? 
        "Error connecting to the server. Please try again." :
        "Can't update a task in an expired plan"
      });
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeview}>
      <BackButton />
      <ScrollView style={styles.container}>
        <PlanInfo 
          name={planInfo.name}
          description={planInfo.description}
          startDate={planInfo.startDate}
          endDate={planInfo.endDate}
          notifyBefore={planInfo.notifyBefore}
          status={planInfo.status}
          completeDate={planInfo.completeDate}
          handleChangeValue={handleChange}
        />
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
                      isChecked = {item.status === "COMPLETED"}
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
                          item.status === "COMPLETE" && styles.taskTextCompleted,
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
          {
            addedTasks.map((item, index) => (
              <View key={index} style={styles.taskContainer}>
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={24}
                  color={Colors.green}
                />
                <TextInput
                  style={[styles.taskInput, {marginLeft: 10}]}
                  value={item}
                  editable={false}
                />
                <TouchableOpacity onPress={() => handleDeleteNewTask(index)}>
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
      {
        showError &&
        <Error
          title={message.title}
          description={message.description}
          onClose={()=> setShowError(false)}
          visible={showError}
          onOkPress={()=> setShowError(false)}>
        </Error>
      }
      {
        loading && <LoadingScreen/>
      }
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
