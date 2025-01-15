import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";

export default function Profile() {
  const [username, setUsername] = useState("MY NEW TEAM");
  const [email, setEmail] = useState("anna123@gmail.com");
  const [avatarUri, setAvatarUri] = useState(
    "https://i1-giaitri.vnecdn.net/2022/09/23/-5865-1663929656.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=2qbqN6-vYy6SJLboH93pYA"
  );
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile has been successfully updated."
    );
    setEditingField(null);
  };

  const handleResetPassword = () => {
    Alert.alert(
      "Reset Password",
      "A password reset link has been sent to your email."
    );
  };

  const handleChangeAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "We need access to your media library to change the avatar."
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
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <Pressable style={styles.cameraIcon} onPress={handleChangeAvatar}>
            <MaterialIcons name="camera-alt" size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Username */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <View
            style={[
              styles.inputContainer,
              editingField === "username" && styles.editingInputContainer,
            ]}
          >
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              onFocus={() => setEditingField("username")}
              onBlur={() => setEditingField(null)}
            />
            {editingField === "username" && (
              <MaterialIcons name="edit" size={20} color="#7AB2D3" />
            )}
          </View>
        </View>

        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <View
            style={[
              styles.inputContainer,
              editingField === "email" && styles.editingInputContainer,
            ]}
          >
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEditingField("email")}
              onBlur={() => setEditingField(null)}
            />
            {editingField === "email" && (
              <MaterialIcons name="edit" size={20} color="#7AB2D3" />
            )}
          </View>
        </View>

        {/* Reset Password */}
        <Pressable style={styles.resetPassword} onPress={handleResetPassword}>
          <Text style={styles.resetPasswordText}>Reset password</Text>
        </Pressable>
      </ScrollView>

      <CustomButton
        title="Save"
        onPress={handleSave}
        color="primary"
        style={styles.saveButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#7AB2D3",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  fieldContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.5)",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  editingInputContainer: {
    borderWidth: 1,
    borderColor: "#7AB2D3",
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: "#000000",
    fontWeight: "500",
  },
  resetPassword: {
    marginTop: 10,
    alignSelf: "center",
  },
  resetPasswordText: {
    fontSize: 16,
    color: "#7AB2D3",
    textDecorationLine: "underline",
  },
  saveButton: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    width: "95%",
  },
});
