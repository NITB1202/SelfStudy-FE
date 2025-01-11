import LoginInput from "@/components/LoginInput";
import PasswordInput from "@/components/PasswordInput";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import CustomButton from "@/components/CustomButton";
import BackButton from "@/components/BackButton";
import { router } from "expo-router";

export default function RegisterScreen() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <LoginInput placeholder="Enter username..." style={styles.input} />
          <LoginInput placeholder="Enter email..." style={styles.input} />
          <PasswordInput placeholder="Enter password..." style={styles.input} />
          <PasswordInput
            placeholder="Confirm password..."
            style={styles.input}
          />
        </View>
        <CustomButton
          title="Register"
          style={styles.registerButton}
          onPress={() => {
            router.push("/Intro/Login");
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
          />
          <Text style={styles.googleText}>Register with Google</Text>
        </TouchableOpacity>
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
    alignSelf: "flex-start",
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
    width: "100%",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 60,
    paddingHorizontal: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
    paddingBottom: 50,
  },
  input: {
    width: "100%",
  },
  registerButton: {
    backgroundColor: "#7AB2D3",
    width: "100%",
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: "center",
  },
  registerText: {
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 16,
  },
  divideLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  divideContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    width: "100%",
  },
  googleText: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 5,
    color: "#1E282DA6",
    fontSize: 20,
  },
});
