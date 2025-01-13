import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
} from "react-native";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import SubjectCard from "./component/subject";
import AddSubjectModal from "./add";
import Details from "./details";

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
  const [currentSubject, setCurrentSubject] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleAddPress = () => {
    setIsModalVisible(true);
  };

  const handleConfirmAdd = (name: string, image: string) => {
    const newId = subjects.length + 1;
    const newSubject = { id: newId, name, image };
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
    setIsModalVisible(false);
  };

  const handleDeleteSubject = (id: number) => {
    setSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.id !== id)
    );
  };

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

  const handlePressSubject = (id: number, name: string) => {
    setCurrentSubject({ id, name });
  };

  const handleBack = () => {
    setCurrentSubject(null);
  };

  if (currentSubject) {
    return (
      <Details
        route={{
          params: {
            id: currentSubject.id,
            name: currentSubject.name,
          },
        }}
        onBack={handleBack}
      />
    );
  }

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
              onPress={() => handlePressSubject(subject.id, subject.name)}
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
