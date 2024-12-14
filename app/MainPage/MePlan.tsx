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

export default function MePlan() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  const [date, setDate] = useState(dayjs());
  const navigation = useNavigation(); // Khởi tạo hook useNavigation

  // Hàm xử lý khi người dùng nhấn vào một kế hoạch
  const handlePlanPress = (planId: number) => {
    console.log("Plan pressed with ID:", planId);
    // Bạn có thể xử lý chuyển trang hoặc hiển thị thông tin chi tiết về kế hoạch ở đây
    router.push("/MainPage/Plan");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />
      {/* Title */}
      <Text style={styles.title}>Hey, you have 3 plans today!</Text>
      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <DateTimePicker
          mode="single"
          date={date.toDate()} // Chuyển đổi dayjs thành Date
          onChange={(params) => setDate(dayjs(params.date))}
        />
      </View>
      {/* Plan List */}
      <View style={styles.planListContainer}>
        {/* Truyền hàm handlePlanPress vào PlanList */}
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
    flex: 1, // Đảm bảo container chiếm toàn bộ màn hình
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
    flex: 1, // Đảm bảo PlanList chiếm toàn bộ không gian còn lại
    width: "100%", // Căn chỉnh PlanList theo chiều ngang
    marginTop: 20,
  },
});
