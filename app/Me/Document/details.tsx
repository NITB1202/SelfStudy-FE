import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import DocumentItem from "./component/doc";
import AddDocModal from "./addDoc";
import BackButton from "@/components/BackButton";

interface DetailsProps {
  route: {
    params: {
      id: number;
      name: string;
    };
  };
  onBack: () => void;
}

export default function Details({ route, onBack }: DetailsProps) {
  const { id, name } = route.params;

  const initialDocumentsData: Record<
    number,
    { id: number; name: string; img: string }[]
  > = {
    1: [
      {
        id: 1,
        name: "TaiLieuOnThi.xlsx",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGMxczycQSX_rO727PC1YJOB4vzdkzrgoqQ&s",
      },
      {
        id: 2,
        name: "TaiLieuOnThiHDH.xlsx",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGMxczycQSX_rO727PC1YJOB4vzdkzrgoqQ&s",
      },
    ],
    2: [
      {
        id: 3,
        name: "PhysicsNotes.png",
        img: "https://dulichviet.com.vn/images/bandidau/danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi.jpg",
      },
    ],
  };

  const [documentsData, setDocumentsData] = useState(initialDocumentsData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const documents = documentsData[id] || [];

  const handleAddDocument = (docName: string) => {
    const newDoc = {
      id: Math.max(...documents.map((doc) => doc.id), 0) + 1,
      name: docName,
      img: "https://via.placeholder.com/80", // Placeholder image
    };
    setDocumentsData((prevData) => ({
      ...prevData,
      [id]: [...prevData[id], newDoc],
    }));
    setIsAddModalVisible(false);
  };

  const handleDelete = (docId: number) => {
    Alert.alert(
      "Delete Document",
      "Are you sure you want to delete this document?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setDocumentsData((prevData) => ({
              ...prevData,
              [id]: prevData[id].filter((doc) => doc.id !== docId),
            }));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style = {{ marginLeft: 10, marginTop: 10}}
        onPress={onBack}>
        <Feather name="arrow-left-circle" size={35} color="#7AB2D3" />
      </Pressable>
      <Text style={styles.headerTitle}>{name}</Text>
      <ScrollView contentContainerStyle={styles.documentList}>
        {documents.length === 0 ? (
          <Text style={styles.emptyText}>
            No documents available for this subject.
          </Text>
        ) : (
          documents.map((doc) => (
            <DocumentItem
              key={doc.id}
              name={doc.name}
              img={doc.img}
              onDelete={() => handleDelete(doc.id)}
            />
          ))
        )}
      </ScrollView>
      <View style={{ alignItems: "center"}}>
        <BottomNavBar onAddPress={()=> setIsAddModalVisible(true)}/>
      </View>

      {/* Add Document Modal */}
      <AddDocModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onConfirm={handleAddDocument}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 20,
  },
  bottom: {
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ececec",
    backgroundColor: "#ffffff",
  },
  backButton: {
    padding: 10,
    borderRadius: 4,
    position: "absolute",
    top: -55,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7AB2D3",
    textAlign: "center",
  },
  documentList: {
    paddingVertical: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#999999",
    fontSize: 16,
    marginTop: 20,
  },
});
