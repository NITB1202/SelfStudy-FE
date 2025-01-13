import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import SubjectCard from "./component/subject";
import AddSubjectModal from "./add";

export default function Document() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Math",
      image:
        "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-005.jpg",
    },
    {
      id: 2,
      name: "Physics",
      image:
        "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg",
    },
    // Add other subjects...
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hiển thị modal khi nhấn nút "Add"
  const handleAddPress = () => {
    setIsModalVisible(true);
  };

  // Xử lý xác nhận thêm mới chủ đề
  const handleConfirmAdd = (name: string, image: string) => {
    const newId = subjects.length + 1;
    const newSubject = { id: newId, name, image };
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
    setIsModalVisible(false);
  };

  // Xử lý xóa chủ đề
  const handleDeleteSubject = (id: number) => {
    setSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.id !== id)
    );
  };

  // Xử lý cập nhật thông tin của chủ đề
  const handleUpdateSubject = (
    id: number,
    newName: string,
    newImage: string
  ) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === id
          ? { ...subject, name: newName, image: newImage }
          : subject
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Hiển thị danh sách các chủ đề */}
      <ScrollView contentContainerStyle={styles.content}>
        {subjects.length === 0 ? (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 16, color: "#999", textAlign: "center" }}>
              No subjects available. Click Add to create one!
            </Text>
          </View>
        ) : (
          subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subjectName={subject.name}
              imageUri={subject.image}
              onDelete={() => handleDeleteSubject(subject.id)}
              onUpdate={(newName, newImage) =>
                handleUpdateSubject(subject.id, newName, newImage)
              }
            />
          ))
        )}
      </ScrollView>

      {/* Thanh điều hướng dưới cùng */}
      <BottomNavBar onAddPress={handleAddPress} />

      {/* Modal thêm mới chủ đề */}
      <AddSubjectModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmAdd}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  content: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
