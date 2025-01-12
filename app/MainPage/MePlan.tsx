import { Text, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import Header from "@/components/Header";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import BottomNavBar from "../../components/navigation/ButtonNavBar";
import { router, useNavigation } from "expo-router";
import PlanList from "@/components/plan/PlanList";
import { Colors } from "@/constants/Colors";

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
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>
          Hey, you have <Text style={styles.highlightText}>3</Text> plans today!
        </Text>
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
      </ScrollView>
      <BottomNavBar onAddPress={() => router.push("/MainPage/AddPlanPage")} />
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
    width: "100%",
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
});
