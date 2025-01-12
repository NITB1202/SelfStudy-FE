import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// Import a default icon
import defaultIcon from "../../assets/images/plan/Planicon.png";

interface PlanCardProps {
  name: string;
  expiredTime: string;
  recoveryTime: string;
  isRead: boolean;
  onToggleRead: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  expiredTime,
  recoveryTime,
  isRead,
  onToggleRead,
}) => {
  return (
    <Pressable onPress={onToggleRead} style={styles.container}>
      <View style={styles.statusRow}>
        <View style={styles.statusContainer}>
          {isRead ? (
            <View style={styles.readStatus}>
              <Text style={styles.statusText}>read</Text>
              <MaterialIcons
                name="check-circle-outline"
                size={16}
                color="grey"
              />
            </View>
          ) : (
            <View style={styles.unreadStatus}>
              <Text style={styles.statusText}>unread</Text>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={16}
                color="grey"
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.contentRow}>
        <Image source={defaultIcon} style={styles.iconImage} />
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.expiredTime}>{expiredTime}</Text>
          <Text style={styles.description}>
            The plan has expired. You can recover it before{" "}
            <Text style={styles.boldText}>{recoveryTime}</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    color: "grey",
    marginRight: 4, // Khoảng cách giữa text và icon
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconImage: {
    width: 57,
    height: 57,
    resizeMode: "contain",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  expiredTime: {
    fontSize: 13,
    color: "rgba(0, 0, 0, 0.5)",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#333333",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default PlanCard;
