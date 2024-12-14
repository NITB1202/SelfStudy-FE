import { StyleSheet, Text, Image, View } from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Index() {
  const { fontsLoaded } = useCustomFonts();

  // Kiểm tra xem font đã tải xong chưa, nếu chưa thì không render nội dung
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudyPal</Text>

      {/* Hình ảnh minh họa */}
      <Image
        source={require("../assets/images/IndexPicture.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Phần mô tả */}
      <Text style={styles.subtitle}>Welcome to StudyPal</Text>
      <Text style={styles.description}>
        StudyPal is a self-learning app that helps users organize their study
        routine, track progress, and stay motivated to achieve their goals.
      </Text>

      {/* Các nút */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Get Started"
          // style={styles.buttonContainer}
          // textStyle={styles.loginText}
          onPress={() => {
            router.push("/Intro/Login");
          }}
        />
        {/* <CustomButton
          title="Register"
          style={styles.registerButton}
          textStyle={styles.registerText}
          onPress={() => {
            router.push("/Intro/Register");
          }}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20, // Padding trên và dưới là 20
    paddingHorizontal: 40, // Padding trái và phải là 40
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    color: "#7AB2D3",
    marginBottom: 40,
  },
  image: {
    width: 332,
    height: 371,
    marginBottom: 40,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 20,
    color: Colors.black,
    marginBottom: 10,
  },
  description: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: Colors.black,
    textAlign: "center",
    marginBottom: 60,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#7AB2D3", // Màu xanh nhạt
    width: "85%",
    paddingVertical: 10,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#C0C0C0", // Màu xám
    width: "85%",
    paddingVertical: 10,
  },
  loginText: {
    color: Colors.white, // Màu chữ trắng
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  registerText: {
    color: Colors.black, // Màu chữ đen
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});
