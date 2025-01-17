import { Text, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import Header from "@/components/Header";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import BottomNavBar from "../../components/navigation/ButtonNavBar";
import { router, useNavigation } from "expo-router";
import PlanList from "@/components/plan/PlanListTeam";
import { Colors } from "@/constants/Colors";
import { Calendar } from "react-native-calendars";
import planApi from "@/api/planApi";
import LoadingScreen from "@/components/LoadingScreen";

export default function Plan() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  const [date, setDate] = useState(dayjs());
  const navigation = useNavigation();
  const handlePlanPress = (planName: string) => {
    console.log("Plan pressed with Name:", planName);
    router.push(`/Team/PlanDetail?planName=${encodeURIComponent(planName)}`);
  };
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [markedDatesArray, setMarkedDatesArray] = useState<string[]>([]);
  const [ loading, setLoading] = useState(false);
  
  useEffect(()=>{
    const fetchData = async () =>{
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      try{
        setLoading(true);
        const dates: any = await planApi.getDateHasDeadlineTeam("fe55292e-c50b-4827-b338-11dd2494fbde", month, year);
        setMarkedDatesArray(dates);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>
          Hey, you have <Text style={styles.highlightText}>3</Text> plans today!
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
          <PlanList onPlanPress={handlePlanPress} />
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <BottomNavBar onAddPress={() => router.push("/Team/AddPlan")} />
      </View>
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
  },
  scrollViewContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  title: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 20
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
    width: "100%",
    flexGrow: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  highlightText: {
    color: Colors.primary,
    fontWeight: "900",
  },
  bottom: {
    alignItems: "center",
  },
});
