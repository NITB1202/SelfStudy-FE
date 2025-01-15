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
    <View style={styles.container}>
      <BackButton />
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={24}
          color="grey"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for assignees"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  searchInput: {
    height: 40,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    shadowColor: "#000",
  },

  searchContainer: {
    flexDirection: "row", // Để biểu tượng và TextInput nằm ngang
    alignItems: "center", // Căn giữa các phần tử
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 1,
    marginBottom: 40,
    marginVertical: 20,
  },
  searchIcon: {
    marginRight: 10, // Khoảng cách giữa biểu tượng và TextInput
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
});
