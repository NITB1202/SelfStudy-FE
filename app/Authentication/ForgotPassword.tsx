import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import LoginInput from "@/components/LoginInput";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import { router } from "expo-router";
import { useState } from "react";
import authApi from "@/api/authApi";
import Error from "@/components/Message/Error";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ForgotPassWordScreen() {
  const { fontsLoaded } = useCustomFonts();
  const [ email, setEmail ] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    description: ""
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSendCode = async () => {
    if(email === ""){
      setShowError(true);
      setMessage({
        title: "Error",
        description: "The email is empty."
      });
      return;
    }

    try{
      await authApi.sendCode(email);
      AsyncStorage.setItem("email", email);
      router.push("/Authentication/Verification");
    }
    catch(error: any){
      let message = "";
      switch(error.status){
        case 404:
          message = "This email hasn't been registered yet."
          break;
        case 500:
          message = "Invalid email format."
          break; 
      }

      setShowError(true);
      setMessage({
        title: "Error",
        description: message
      });
    }
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
        <LoginInput 
          placeholder="Enter your email" 
          style={styles.space} 
          onChangeText={(text)=> setEmail(text)}/>
        <CustomButton
          title="Send code"
          style={styles.sendButton}
          onPress={handleSendCode}
        />
      </View>
      {
        showError &&
        <Error
          title={message.title}
          description={message.description}
          visible={showError}
          onClose={()=> setShowError(false)}
          onOkPress={()=> setShowError(false)}>
        </Error>
      }
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
