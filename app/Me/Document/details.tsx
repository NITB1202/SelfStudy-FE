import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import DocumentItem from "./component/doc";

interface DetailsProps {
  route: {
    params: {
      id: number;
      name: string;
    };
  };
  onBack: () => void; // Hàm callback quay lại trang cha
}

export default function Details({ route, onBack }: DetailsProps) {
  const { id, name } = route.params;

  const documentsData: Record<
    number,
    { id: number; name: string; img: string }[]
  > = {
    1: [
      {
        id: 1,
        name: "TaiLieuOnThi.xlsx",
        img: "https://w7.pngwing.com/pngs/619/922/png-transparent-microsoft-excel-illustration-microsoft-excel-microsoft-office-macos-excel-rectangle-logo-microsoft-thumbnail.png",
      },
    ],
    2: [
      {
        id: 2,
        name: "PhysicsNotes.docx",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Microsoft_Word_2013-2019_logo.svg/1200px-Microsoft_Word_2013-2019_logo.svg.png",
      },
    ],
  };

  const documents = documentsData[id] || [];

  const handleEditName = (docId: number) => {
    console.log(`Edit name for document with id: ${docId}`);
  };

  const handleDelete = (docId: number) => {
    console.log(`Delete document with id: ${docId}`);
  };

  return (
    <View style={styles.container}>
      <Header showMenu={false} />
      {/* Nút Back */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>

      {/* Danh sách tài liệu */}
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
              onEdit={() => handleEditName(doc.id)}
              onDelete={() => handleDelete(doc.id)}
            />
          ))
        )}
      </ScrollView>

      {/* Thanh điều hướng dưới cùng */}
      <BottomNavBar
        onAddPress={() => console.log("Add new document pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 20,
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    backgroundColor: "#ffffff",
  },
  backButton: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#007BFF",
    marginRight: 10,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
  },
  documentList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#999999",
    fontSize: 16,
    marginTop: 20,
  },
});
