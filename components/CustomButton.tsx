import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  Text,
  Platform, // Để kiểm tra nền tảng
} from "react-native";
import { Colors } from "@/constants/Colors";
import useCustomFonts from "@/hooks/useCustomFonts";

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: "primary" | "secondary"; // Tùy chọn màu sắc
  borderRadius?: number; // Bo tròn nút
  shadow?: boolean; // Thêm hoặc tắt shadow
}

export default function CustomButton({
  title,
  onPress,
  style,
  textStyle,
  color = "primary",
  borderRadius = 10, // Bo tròn mặc định
  shadow = true, // Shadow mặc định bật
}: CustomButtonProps) {
  const { fontsLoaded } = useCustomFonts();

  // Kiểm tra xem font đã tải xong chưa, nếu chưa thì không render nội dung
  if (!fontsLoaded) {
    return null;
  }

  const buttonColor = color === "primary" ? "#7AB2D3" : "#C0C0C0"; // Màu xanh nhạt hoặc xám
  const textColor = color === "primary" ? "#FFFFFF" : "#000000"; // Chữ trắng hoặc đen

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor, borderRadius: borderRadius },
        shadow && Platform.OS === "ios" ? styles.shadow : { elevation: 6 }, // Áp dụng shadow cho iOS và elevation cho Android
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5, // Căn chỉnh chiều dọc cho nút
    paddingHorizontal: 20, // Thêm padding ngang
    borderRadius: 10, // Bo tròn nút nhiều hơn để trông mềm mại
    alignItems: "center",
    justifyContent: "center", // Đảm bảo text nằm giữa nút
    width: 332, // Nút sẽ chiếm toàn bộ chiều ngang container
    height: 40,
  },

  text: {
    fontFamily: "Poppins_700Bold", // Font chữ in đậm
    fontSize: 20, // Tăng kích thước chữ cho phù hợp với thiết kế
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
