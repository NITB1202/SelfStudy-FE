import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import PlanCard from "@/components/Noti/PlanCard";

const Noti: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "PLAN 1",
      expiredTime: "09:00:00 12/02/2025",
      recoveryTime: "00:00:00 on 15/02/2025",
      isRead: false,
    },
    {
      id: 2,
      name: "PLAN 2",
      expiredTime: "10:00:00 10/02/2025",
      recoveryTime: "23:59:59 on 14/02/2025",
      isRead: true,
    },
    {
      id: 3,
      name: "PLAN 3",
      expiredTime: "08:00:00 11/02/2025",
      recoveryTime: "12:00:00 on 16/02/2025",
      isRead: false,
    },
  ]);

  // Hàm đánh dấu tất cả thông báo là "read"
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  // Hàm chuyển đổi trạng thái "read" cho một thông báo cụ thể
  const toggleReadStatus = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.markAllContainer} onPress={markAllAsRead}>
        <Text style={styles.markAllText}>Mark as read all</Text>
        <MaterialIcons name="check-circle-outline" size={24} color="#7AB2D3" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notif) => (
          <PlanCard
            key={notif.id} // key phải là duy nhất
            name={notif.name}
            expiredTime={notif.expiredTime}
            recoveryTime={notif.recoveryTime}
            isRead={notif.isRead}
            onToggleRead={() => toggleReadStatus(notif.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: 50,
  },
  markAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
    gap: 10,
  },
  markAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7AB2D3",
  },
  scrollContainer: {
    paddingBottom: 16,
  },
});

export default Noti;
