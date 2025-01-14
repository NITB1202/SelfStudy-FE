import CustomButton from "@/components/CustomButton";
import NumberInput from "@/components/NumberInput";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import BackButton from "@/components/BackButton";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import Success from "@/components/Message/Success";
import Error from "@/components/Message/Error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authApi from "@/api/authApi";

export default function VerificationScreen() {
  const inputs = Array.from({ length: 4 }, () => useRef<TextInput>(null));
  const loaded = useCustomFonts();
  const [timeLeft, setTimeLeft] = useState(120);
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    title: "",
    description: ""
  });

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
    const updatedCode = [...code];
    updatedCode[index] = text;
    setCode(updatedCode);

    if (text.length === 1 && index < inputs.length - 1) {
      inputs[index + 1]?.current?.focus();
    }
  };

  const handleResend = async () => {
    const email = await AsyncStorage.getItem("email");

    if(email === null){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "Can't find verification email."
      })
      return;
    }

    try{
      await authApi.sendCode(email);
      setTimeLeft(120);
      setCode(["", "", "", ""]); 
      inputs[0]?.current?.focus();
      setShowMessage(true);
      setMessage({
        type: "success",
        title: "Success",
        description: "Resend successfully. Please check your mail box."
      });
    }
    catch(error){
      console.log(error);
    }
  };

  const handleVerify = async () => {
    const email = await AsyncStorage.getItem("email");
    const verificationCode = code.join("");

    if(verificationCode.length < 4){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "The verification code consists of 4 digits."
      });
      return;
    }

    if(email === null){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "Can't find verification email."
      })
      return;
    }

    if(timeLeft === 0){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "The code is expired."
      });
      return;
    }

    try{
      await authApi.verify(email, verificationCode);
      router.push("/Authentication/ResetPassword");
    }
    catch(error){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "The code is incorrect."
      });
    }
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
              defaultValue={code.at(index)}
              ref={inputRef}
              onChangeText={(text: string) => handleTextChange(text, index)}
            ></NumberInput>
          ))}
        </View>
        <Text style={styles.countdown}>{formatTime(timeLeft)}</Text>
        <CustomButton
          title="Verify"
          onPress={handleVerify}
        ></CustomButton>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Didn't receive a code? </Text>
          <Pressable onPress={handleResend}>
            <Text style={styles.highlight}>Resend</Text>
          </Pressable>
        </View>
      </View>
      {
        showMessage && message.type === "success" &&
        <Success
          title={message.title}
          description={message.description}
          visible={showMessage}
          onClose={() => setShowMessage(false)}
          onOkPress={() => setShowMessage(false)}>
        </Success>
      }
      {
        showMessage && message.type === "error" &&
        <Error
          title={message.title}
          description={message.description}
          visible={showMessage}
          onClose={() => setShowMessage(false)}
          onOkPress={() => setShowMessage(false)}>
        </Error>
      }
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
