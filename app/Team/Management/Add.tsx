import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import BackButton from "@/components/BackButton";

export default function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([
    {
      id: "1",
      name: "Liam123",
      avatar:
        "https://images2.thanhnien.vn/528068263637045248/2024/1/25/428059e47aeafb68640f168d615371dc-65a11b038315c880-1706156293087602824781.jpg",
    },
  ]);
  const [suggestions] = useState([
    {
      id: "2",
      name: "Emma456",
      avatar:
        "https://vcdn1-dulich.vnecdn.net/2021/07/16/7-1-1626444923.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=IIxN7lYT8dQU8ESp7rWldQ",
    },
    {
      id: "3",
      name: "Noah789",
      avatar:
        "https://images2.thanhnien.vn/528068263637045248/2024/1/25/428059e47aeafb68640f168d615371dc-65a11b038315c880-1706156293087602824781.jpg",
    },
  ]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addMember = (member: { id: string; name: string; avatar: string }) => {
    setMembers([...members, member]);
    setShowSuggestions(false);
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const saveTeam = () => {
    if (!teamName.trim()) {
      Alert.alert("Error", "Team name cannot be empty!");
      return;
    }
    if (members.some((member) => !member.name.trim())) {
      Alert.alert("Error", "All members must have names!");
      return;
    }
    Alert.alert("Success", "Team saved successfully!");
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the gallery to use this feature."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      {/* Ảnh đại diện nhóm */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{
            uri: avatar || "https://via.placeholder.com/120", // Default avatar
          }}
          style={styles.avatar}
        />
        <Pressable onPress={pickImage} style={styles.avatarIconWrapper}>
          <LinearGradient
            colors={["#B9E5E8", "#7AB2D3"]}
            style={styles.avatarIconBackground}
          >
            <Ionicons name="camera" size={20} color="#fff" />
          </LinearGradient>
        </Pressable>
      </View>
      {/* Tên nhóm */}
      <Text style={styles.title}>Team Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter team name"
        value={teamName}
        onChangeText={setTeamName}
      />

      {/* Danh sách thành viên */}
      <View>
        <Text style={styles.sectionTitle}>Members</Text>
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.memberRow}>
              <Image
                source={{ uri: item.avatar }}
                style={styles.memberAvatar}
              />
              <Text style={styles.memberName}>{item.name}</Text>
              <Pressable onPress={() => removeMember(item.id)}>
                <MaterialIcons name="delete" size={24} color="#FF6B6B" />
              </Pressable>
            </View>
          )}
        />
        {/* Nút thêm thành viên */}
        <Pressable
          style={styles.addMemberButton}
          onPress={() => setShowSuggestions(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color="#7AB2D3" />
          <Text style={styles.addMemberText}>Add new member</Text>
        </Pressable>
      </View>

      {/* Gợi ý thêm thành viên */}
      <Modal visible={showSuggestions} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Select a Member</Text>
            {suggestions.map((suggestion) => (
              <TouchableOpacity
                key={suggestion.id}
                style={styles.suggestionItem}
                onPress={() => addMember(suggestion)}
              >
                <Image
                  source={{ uri: suggestion.avatar }}
                  style={styles.suggestionAvatar}
                />
                <Text style={styles.suggestionName}>{suggestion.name}</Text>
              </TouchableOpacity>
            ))}
            <CustomButton
              title="Close"
              onPress={() => setShowSuggestions(false)}
              color="secondary"
            />
          </View>
        </View>
      </Modal>

      {/* Nút lưu */}
      <View style={styles.bottom}>
        <CustomButton title="Save" onPress={saveTeam} color="primary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
  },
  avatarIconWrapper: {
    position: "absolute",
    bottom: 5,
    right: 120,
  },
  avatarIconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  memberName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  addMemberButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  addMemberText: {
    marginLeft: 10,
    color: "#7AB2D3",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  suggestionsContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    marginBottom: 10,
    width: "100%",
  },
  suggestionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  suggestionName: {
    fontSize: 16,
    color: "#333",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
