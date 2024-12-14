import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import { router } from "expo-router";

export default function ResetPasswordScreen() {
  const { fontsLoaded } = useCustomFonts();

  // Kiểm tra xem font đã tải xong chưa, nếu chưa thì không render nội dung
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.instruction}>
        Enter a new password below to change your password
      </Text>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <PasswordInput placeholder="Enter new password..."></PasswordInput>
          <PasswordInput placeholder="Confirm password..."></PasswordInput>
        </View>
        <CustomButton
          title="Reset password"
          style={styles.resetButton}
          textStyle={styles.resetText}
          onPress={() => {
            router.push("/Intro/PasswordChanged");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    width: "100%",
    textAlign: "center",
    marginTop: 80,
    color: "#7AB2D3", // Màu xanh nhạt cho tiêu đề
  },
  instruction: {
    color: "gray",
    paddingHorizontal: 20,
    //marginBottom: 10,
    textAlign: "center", // Căn giữa mô tả
    fontFamily: "Roboto_400Regular",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 20, // Khoảng cách giữa các trường nhập mật khẩu
    width: "100%",
    height: 98,
    marginBottom: 30,
    marginTop: 20,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  resetButton: {
    backgroundColor: "#7AB2D3", // Màu xanh nhạt
    paddingVertical: 8,
    marginVertical: 20,
    borderRadius: 8,
    // Hiệu ứng shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    height: 40,
    width: "100%",
  },
  resetText: {
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});
