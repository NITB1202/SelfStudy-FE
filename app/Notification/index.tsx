import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PlanCard from "@/components/Noti/PlanCard";
import PlanWill from "@/components/Noti/PlanWill";
import Invite from "@/components/Noti/Invite";
import Question from "@/components/Message/Question";
import Error from "@/components/Message/Error";
import Success from "@/components/Message/Success";
import BottomNavBar from "@/components/navigation/ButtonNavBar";

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
      remindTime: "10:00:00 10/02/2025",
      expiredTime: "23:59:59 14/02/2025",
      isRead: true,
    },
    {
      id: 3,
      name: "Invitation",
      expiredTime: "08:00:00 11/02/2025",
      people: "Annie",
      team: "SE100",
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

  // Hàm xử lý Accept và Decline cho Invite
  const handleAccept = (id: number) => {
    console.log(`Accepted invitation for notification ID: ${id}`);
  };

  const handleDecline = (id: number) => {
    console.log(`Declined invitation for notification ID: ${id}`);
  };

  // Test Message

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOkPress = () => {
    console.log("OK Pressed");
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.markAllContainer} onPress={markAllAsRead}>
        <Text style={styles.markAllText}>Mark as read all</Text>
        <MaterialIcons name="check-circle-outline" size={24} color="#7AB2D3" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notif) =>
          notif.id === 2 ? (
            <PlanWill
              key={notif.id}
              name={notif.name}
              remindTime={notif.remindTime}
              expiredTime={notif.expiredTime}
              isRead={notif.isRead}
              onToggleRead={() => toggleReadStatus(notif.id)}
            />
          ) : notif.id === 3 ? (
            <Invite
              key={notif.id}
              name={notif.name}
              expiredTime={notif.expiredTime}
              people={notif.people}
              team={notif.team}
              isRead={notif.isRead}
              onToggleRead={() => toggleReadStatus(notif.id)}
              onAccept={() => handleAccept(notif.id)}
              onDecline={() => handleDecline(notif.id)}
            />
          ) : (
            <PlanCard
              key={notif.id}
              name={notif.name}
              expiredTime={notif.expiredTime}
              recoveryTime={notif.recoveryTime}
              isRead={notif.isRead}
              onToggleRead={() => toggleReadStatus(notif.id)}
            />
          )
        )}
      </ScrollView>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Nút để hiển thị Modal */}
        <Button title="Show Message" onPress={() => setIsModalVisible(true)} />

        {/* Component Message */}
        <Success
          visible={isModalVisible}
          title="Sample Title"
          description="This is a sample description for the modal."
          onClose={() => setIsModalVisible(false)}
          onOkPress={handleOkPress}
        />
      </View>
      {/* Bottom Navigation */}
      <View>
        <BottomNavBar initialActiveTab="Notification" />
      </View>
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
