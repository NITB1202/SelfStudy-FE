import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface SubjectCardProps {
  subjectName: string;
  imageUri: string;
  onDelete: () => void;
  onUpdate: (newName: string, newImage: string) => void;
  onPress: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subjectName,
  imageUri,
  onDelete,
  onUpdate,
  onPress,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(subjectName);
  const [image, setImage] = useState(imageUri);

  const handleEditImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const newImage = result.assets[0].uri;
      setImage(newImage);
      onUpdate(name, newImage);
    }
    setIsMenuVisible(false);
  };

  const handleEditName = () => {
    setIsEditingName(true);
    setIsMenuVisible(false);
  };

  const saveName = () => {
    if (name.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    setIsEditingName(false);
    onUpdate(name, image);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Pressable
        style={styles.menuIcon}
        onPress={() => setIsMenuVisible(!isMenuVisible)}
      >
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color="#A6A6A6"
        />
      </Pressable>

      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      {isEditingName ? (
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          onBlur={saveName}
          autoFocus
        />
      ) : (
        <Text style={styles.title} onPress={handleEditName}>
          {name}
        </Text>
      )}

      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditName}>
            <Text style={styles.menuText}>Edit name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditImage}>
            <Text style={styles.menuText}>Edit image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  menuIcon: {
    position: "absolute",
    top: 0,
    right: -40,
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingHorizontal: 5,
  },
  menu: {
    position: "absolute",
    top: 40,
    right: -130,
    width: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuText: {
    fontSize: 14,
    color: "#000",
  },
});

export default SubjectCard;
