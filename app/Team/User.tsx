import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router"; // Để điều hướng
import BackButton from "@/components/BackButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

const availableAssignees: Assignee[] = [
  {
    id: "1",
    name: "Anna123",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "JohnDoe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "3",
    name: "SaraSmith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "4",
    name: "MikeBrown",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "5",
    name: "LindaLee",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "6",
    name: "DavidJones",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

interface SearchUserProps {
  onSelect: (user: Assignee) => void; // Nhận prop onSelect từ component cha
}

export default function SearchUser({ onSelect }: SearchUserProps) {
  const [searchText, setSearchText] = useState("");
  const router = useRouter(); // Để điều hướng quay lại PlanScreen

  const filteredAssignees = availableAssignees.filter((assignee) =>
    assignee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectUser = (user: Assignee) => {
    if (onSelect) {
      onSelect(user); // Gọi onSelect từ component cha để thêm assignee vào danh sách
    }
    router.push("/Team/AddPlan"); // Điều hướng quay lại PlanScreen
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#0000004D" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for user"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView>
        {filteredAssignees.map((assignee) => (
          <Pressable
            key={assignee.id}
            onPress={() => handleSelectUser(assignee)}
          >
            <View style={styles.row}>
              <Image source={{ uri: assignee.avatar }} style={styles.avatar} />
              <Text>{assignee.name}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView  >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  searchInput: {
    height: 40,
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: "#E0E0E0",
    shadowColor: "#000",
    paddingBottom: 10,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingVertical: 1,
    marginBottom: 40,
    marginVertical: 20,
    paddingHorizontal: 10
  },
  searchIcon: {
    marginRight: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
});
