import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DocumentItemProps {
  name: string;
  img: string;
  onEdit?: () => void; // Đánh dấu '?' để biến onEdit thành tùy chọn
  onDelete: () => void;
}

export default function DocumentItem({
  name,
  img,
  onEdit,
  onDelete,
}: DocumentItemProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.documentContainer}>
      <Image source={{ uri: img }} style={styles.documentImage} />
      <Text style={styles.documentName}>{name}</Text>
      <Pressable
        style={styles.menuIcon}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color="#A6A6A6"
        />
      </Pressable>

      {menuVisible && (
        <View style={styles.menu}>
          <Pressable style={styles.menuItem} onPress={onEdit}>
            <Text style={styles.menuText}>Edit name</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={onDelete}>
            <Text style={styles.menuText}>Delete</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Download</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  documentContainer: {
    alignItems: "flex-start",
    padding: 10,
    width: 250,
  },
  documentImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 8,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 8,
  },
  menu: {
    position: "absolute",
    top: 40,
    right: -50,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    fontSize: 14,
    color: "#333",
  },
});
