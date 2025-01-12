import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import LoginInput from "@/components/LoginInput";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import { router } from "expo-router";

export default function ForgotPassWordScreen() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.instruction}>
          Please enter the email linked with your account
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <LoginInput placeholder="Enter your email..." style={styles.space} />
        <CustomButton
          title="Send code"
          style={styles.sendButton}
          onPress={() => {
            router.push("/Authentication/Verification");
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
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  backButtonContainer: {
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 10,
    paddingBottom: 110,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    color: "#7AB2D3",
    textAlign: "center",
  },
  bottom: {
    width: "100%",
  },
  instruction: {
    fontFamily: "Roboto_400Regular",
    color: "gray",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    width: "100%",
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  space: {
    width: "100%",
    marginBottom: 10,
  },
  sendButton: {
    marginTop: 20,
  },
});
