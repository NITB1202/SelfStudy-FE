import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import LoginInput from "@/components/LoginInput";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import { Link, router } from "expo-router";
import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/Colors";

export default function LoginScreen() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Login</Text>
        <LoginInput
          placeholder="Enter your email..."
          style={styles.inputEmail}
        />
        <PasswordInput placeholder="Enter your password..." />
        <Link style={styles.link} href="/Intro/ForgotPassword">
          Forgot password?
        </Link>
        <CustomButton
          title="Login"
          style={styles.loginButton}
          onPress={() => {
            router.push("/MainPage/MePlan");
          }}
        />
        <View style={styles.divideContainer}>
          <View style={styles.divideLine}></View>
          <Text style={styles.option}>Or</Text>
          <View style={styles.divideLine}></View>
        </View>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../../assets/images/google-icon.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Login with Google</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Link style={styles.signUpLink} href="/Intro/Register">
            Sign up here
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  backButton: {
    alignSelf: "flex-start", // Đặt nút Back về góc trái
    marginTop: 20,
    marginLeft: 0,
  },

  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    marginTop: 20,
    marginBottom: 40,
    color: "#7AB2D3",
    textAlign: "center",
    width: "100%", // Đồng bộ chiều rộng
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    paddingVertical: 60, // Padding trên dưới là 40
    paddingHorizontal: 10, // Padding trái phải là 10
  },
  inputEmail: {
    marginBottom: 10,
    width: "100%", // Chiều rộng giống các thành phần khác
  },
  link: {
    width: "100%",
    textAlign: "right",
    marginTop: 10,
    marginBottom: 20,
    fontWeight: "500",
    color: "#7AB2D3",
    fontSize: 15,
    fontFamily: "Roboto_700Bold",
  },
  loginButton: {
    backgroundColor: "#7AB2D3",
    width: "100%", // Đồng bộ chiều rộng với input
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: "center",
  },
  divideLine: {
    flex: 1, // Dãy phân cách co giãn đều
    height: 1,
    backgroundColor: "gray",
  },
  divideContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Đồng bộ chiều rộng
    paddingVertical: 5,
  },
  option: {
    marginHorizontal: 5,
    color: "gray",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    width: "100%", // Đồng bộ chiều rộng với input
  },
  googleText: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 5,
    color: "gray",
    fontSize: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  footerText: {
    marginTop: 40,
    fontFamily: "Roboto_400Regular",
    color: "black",
    textAlign: "center",
    fontSize: 16,
  },
  signUpLink: {
    color: "#7AB2D3",
    fontFamily: "Roboto_700Bold",
  },
});
