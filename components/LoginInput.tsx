import { View, TextInput, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

interface LoginInputPros {
  placeholder: string;
  style?: ViewStyle;
}

export default function LoginInput({ placeholder, style }: LoginInputPros) {
  return (
    <View style={[styles.container, style]}>
      <TextInput placeholder={placeholder}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "flex-start",
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%", // Cố định chiều rộng giống CustomButton
    height: 40, // Cố định chiều cao giống CustomButton
  },
});
