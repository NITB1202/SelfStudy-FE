import { View, TextInput, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

interface LoginInputPros {
  placeholder: string;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
  editable?: boolean; // Thêm thuộc tính để kiểm soát chỉnh sửa
}

export default function LoginInput({
  placeholder,
  style,
  onChangeText,
  editable = true, // Mặc định là cho phép chỉnh sửa
}: LoginInputPros) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable} // Sử dụng thuộc tính editable
      />
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
    width: "100%",
    height: 40,
  },
});
