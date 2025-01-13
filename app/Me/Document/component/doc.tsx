import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DocumentItemProps {
  name: string;
  img: string;
  onEdit: () => void;
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
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color="#A6A6A6"
        />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
            <Text style={styles.menuText}>Edit name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  documentContainer: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    width: 200,
    elevation: 2,
  },
  documentImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 8,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
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
    right: 0,
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 14,
    color: "#333",
  },
});
