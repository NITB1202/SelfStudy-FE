import CustomButton from "@/components/CustomButton";
import NumberInput from "@/components/NumberInput";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import BackButton from "@/components/BackButton";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";

export default function VerificationScreen() {
  const inputs = Array.from({ length: 4 }, () => useRef<TextInput>(null));
  const loaded = useCustomFonts();
  const [timeLeft, setTimeLeft] = useState(120);

  if (!loaded) {
    return null;
  }

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleTextChange = (text: string, index: number) => {
    if (text.length === 1 && index < inputs.length - 1)
      inputs[index + 1]?.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <BackButton />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.instruction}>
          Enter the verification code we just sent on your email address.
        </Text>
        <View style={styles.numberContainer}>
          {inputs.map((inputRef, index) => (
            <NumberInput
              key={index}
              ref={inputRef}
              onChangeText={(text: string) => handleTextChange(text, index)}
            ></NumberInput>
          ))}
        </View>
        <Text style={styles.countdown}>{formatTime(timeLeft)}</Text>
        <CustomButton
          title="Verify"
          onPress={() => {
            router.push("/Authentication/ResetPassword");
          }}
        ></CustomButton>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Didn't receive a code? </Text>
          <TouchableHighlight>
            <Text style={styles.highlight}>Resend</Text>
          </TouchableHighlight>
        </View>
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
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 0,
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 10,
  },
  title: {
    fontSize: 36,
    fontFamily: "PlusJakartaSans_700Bold",
    marginTop: 80,
    color: "#7AB2D3",
  },
  instruction: {
    color: "gray",
    textAlign: "left",
    marginVertical: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  highlight: {
    color: "#7AB2D3",
    fontFamily: "Roboto_700Bold",
    fontSize: 16,
    fontWeight: "bold"
  },
  countdown: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "#000000",
    fontFamily: "Poppins_400Regular",
  },
  verifyText: {
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  linkText:{
    fontSize: 16,
  }
});
