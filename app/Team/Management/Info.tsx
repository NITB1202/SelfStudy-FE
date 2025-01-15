import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface TeamInfoProps {
  teamName: string;
  establishDate: string;
  createdBy: {
    name: string;
    avatar: string;
  };
  teamImage: string;
  role: "admin" | "member" | "user"; // Cập nhật kiểu role để đồng bộ
  onUpdateTeamName?: (newName: string) => void;
  onUpdateTeamImage?: (newImageUri: string) => void;
}

const TeamInfo: React.FC<TeamInfoProps> = ({
  teamName,
  establishDate,
  createdBy,
  teamImage,
  role,
  onUpdateTeamName,
  onUpdateTeamImage,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(teamName);

  // Hàm chọn ảnh mới cho ảnh team
  const handlePickTeamImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      onUpdateTeamImage?.(result.assets[0].uri); // Gọi callback để cập nhật ảnh team
    }
  };

  const handleSaveName = () => {
    if (editedName.trim() === "") {
      Alert.alert("Error", "Team name cannot be empty!");
      return;
    }
    onUpdateTeamName?.(editedName);
    setIsEditingName(false);
  };

  return (
    <View style={styles.teamInfo}>
      {/* Ảnh Team */}
      <View style={styles.teamImageWrapper}>
        <Image source={{ uri: teamImage }} style={styles.teamImage} />
        {role === "admin" && (
          <TouchableOpacity
            style={styles.cameraIconWrapperTeam}
            onPress={handlePickTeamImage}
          >
            <MaterialCommunityIcons name="camera" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Tên Team */}
      <View style={styles.teamNameWrapper}>
        {isEditingName ? (
          <TextInput
            style={styles.teamNameInput}
            value={editedName}
            onChangeText={setEditedName}
            onBlur={handleSaveName}
            autoFocus
          />
        ) : (
          <Text style={styles.teamName}>
            {teamName}
            {role === "admin" && (
              <TouchableOpacity onPress={() => setIsEditingName(true)}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={18}
                  color="#7AB2D3"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </Text>
        )}
      </View>

      {/* Thông Tin Chi Tiết */}
      <Text style={styles.teamDetail}>Establish date: {establishDate}</Text>
      <View style={styles.teamCreatedBy}>
        <Text style={styles.teamDetail}>Create by:</Text>
        <Image
          source={{ uri: createdBy.avatar }}
          style={styles.creatorAvatar}
        />
        <Text style={styles.creatorName}>{createdBy.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  teamInfo: {
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  teamImageWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  teamImage: {
    width: 120, // Kích thước ảnh team
    height: 120, // Kích thước ảnh team
    borderRadius: 60, // Chuyển thành hình tròn (nửa đường kính của chiều rộng/chiều cao)
    overflow: "hidden", // Đảm bảo nội dung không vượt ra ngoài
  },
  cameraIconWrapperTeam: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#7AB2D3",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  teamNameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editIcon: {
    marginLeft: 5,
  },
  teamNameInput: {
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#7AB2D3",
    padding: 0,
  },
  teamDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  teamCreatedBy: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  creatorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  creatorName: {
    fontSize: 14,
    color: "#333",
  },
});

export default TeamInfo;
