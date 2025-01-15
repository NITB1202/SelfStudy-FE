import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import BottomNavBar from "../../components/navigation/ButtonNavBar";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import planApi from "@/api/planApi";
import { useAuth } from "@/context/AuthContext";
import { Calendar } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlanItem from "@/components/plan/PlanItem";
import LoadingScreen from "@/components/LoadingScreen";

interface Plan {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  notifyBefore: string;
  status: string;
  progress: number;
  completeDate: string | null;
}

export default function Plan() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  const { userId } = useAuth();
  const [markedDatesArray, setMarkedDatesArray] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectDatePlans, setSelectDatePlans] = useState<Plan[]>([]);
  const [todayPlanNum, setTodayPlanNum] = useState(0);
  const [ loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchData = async () =>{
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const dateString = new Date().toISOString().split('T')[0];

      try{
        setLoading(true);
        const dates: any = await planApi.getDateHasDeadlineUser(userId, month, year);
        const plans: any = await planApi.getUserPlansOnDate(userId, dateString);
        const data: Plan[] = plans.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          startDate: item.startDate,
          endDate: item.endDate,
          notifyBefore: item.notifyBefore,
          status: item.status,
          progress: item.process,
          completeDate: item.completeDate,
        }));
        setMarkedDatesArray(dates);
        setSelectDatePlans(data);
        setTodayPlanNum(data.length);
      }
      catch(error){
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchData();
  },[]);


  useEffect(()=>{
    const fetchPlanData = async () =>{
      try{
        setLoading(true);
        const plans: any = await planApi.getUserPlansOnDate(userId, selectedDate);
        const data: Plan[] = plans.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          startDate: item.startDate,
          endDate: item.endDate,
          notifyBefore: item.notifyBefore,
          status: item.status,
          progress: item.process,
          completeDate: item.completeDate,
        }));

        setSelectDatePlans(data);
      }
      catch(error){
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchPlanData();
  },[selectedDate]);

  const getMarkedDates = () => {
    const markedDates: Record<string, any> = {};

    markedDatesArray.forEach((date) => {
      if (date === selectedDate) return;
  
      markedDates[date] = {
        marked: true,
        dotColor: Colors.red,
      };
    });

    if (selectedDate) {
      markedDates[selectedDate] = {
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: Colors.primary,
        selectedTextColor: "#FFFFFF",
      };
    }

    return markedDates;
  };

  const handlePlanPress = (planName: string) => {
    router.push(`/Me/PlanDetail?planName=${encodeURIComponent(planName)}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>
          Hey, you have <Text style={styles.highlightText}>{todayPlanNum}</Text> plans today!
        </Text>
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={getMarkedDates()}
            onDayPress={(day: any) => {
              setSelectedDate(day.dateString);
            }}
            theme={{
              arrowColor: Colors.primary,
              dayTextColor: "#000000",
            }}
          />
        </View>
        <View style={styles.planListContainer}>
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="target"
              size={30}
              color="#7AB2D3"
            />
            <Text style={styles.headerText}>Plans</Text>
          </View>
          {
            selectDatePlans.map((item)=>{
              return(
                <Pressable
                  key={item.id}
                  onPress={() => handlePlanPress(item.name)}>
                  <PlanItem
                    planName={item.name}
                    progress={Number(item.progress)}
                    deadline={item.endDate}
                    >
                  </PlanItem>
                </Pressable>
              );
            })
          }
        </View>
      </ScrollView>
      <BottomNavBar onAddPress={() => router.push("/Me/AddPlan")} />
      {
        loading && <LoadingScreen/>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  title: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginVertical: 20,
  },
  calendarContainer: {
    width: 350,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderColor: "rgba(1,1,1,0.1)",
    borderWidth: 1,
  },
  planListContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  highlightText: {
    color: Colors.primary,
    fontWeight: "900",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginLeft: 8,
  },
});
