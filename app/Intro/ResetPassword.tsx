import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import { router } from "expo-router";

export default function ResetPasswordScreen() {
  const { fontsLoaded } = useCustomFonts();

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
    color: "#7AB2D3",
  },
  instruction: {
    color: "gray",
    paddingHorizontal: 20,
    textAlign: "justify",
    fontFamily: "Roboto_400Regular",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 20,
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
});
