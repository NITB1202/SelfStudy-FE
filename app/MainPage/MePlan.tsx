import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import Header from "@/components/Header";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import PlanList from "../../components/plant/PlanList";
import BottomNavBar from "../../components/navigation/ButtonNavBar";
import { router, useNavigation } from "expo-router";
import { useRouter } from "expo-router";

export default function MePlan() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  const [date, setDate] = useState(dayjs());
  const navigation = useNavigation();
  const handlePlanPress = (planName: string) => {
    console.log("Plan pressed with Name:", planName);
    router.push(`/MainPage/Plan?planName=${encodeURIComponent(planName)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Hey, you have 3 plans today!</Text>
      <View style={styles.calendarContainer}>
        <DateTimePicker
          mode="single"
          date={date.toDate()}
          onChange={(params) => setDate(dayjs(params.date))}
          selectedItemColor="#7AB2D3"
        />
      </View>

      <View style={styles.planListContainer}>
        <PlanList onPlanPress={handlePlanPress} />
      </View>
      <View>
        <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginVertical: 20,
  },
  calendarContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  planListContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
});
