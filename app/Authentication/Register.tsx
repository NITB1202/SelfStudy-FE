import LoginInput from "@/components/LoginInput";
import PasswordInput from "@/components/PasswordInput";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import CustomButton from "@/components/CustomButton";
import BackButton from "@/components/BackButton";
import { router } from "expo-router";
import { useState } from "react";
import { isValidEmail } from "@/util/validator";
import Error from "@/components/Message/Error";
import userApi from "@/api/userApi";
import authApi from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";

export default function RegisterScreen() {
  const { fontsLoaded } = useCustomFonts();
  const [ request, setRequest ] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({
    title:"",
    description: "",
  });
  const { login } = useAuth();

  if (!fontsLoaded) {
    return null;
  }

  const handleRegister = async () => {
    if(request.username === "" || request.email === "" ||
      request.password === "" || confirm === ""){
      setShowError(true);
      setMessage({
        title: "Error",
        description: "All fields are required."
      });
      return;
    }

    if(!isValidEmail(request.email)){
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Invalid email format."
      });
      return;
    }

    if(request.password !== confirm){
      setShowError(true);
      setMessage({
        title: "Error",
        description: "The password and the confirmation password must match."
      });
      return;
    }

    try{
      await userApi.register(request.username, request.email, request.password);
      const response: any = await authApi.login(request.email,request.password);
      const accessToken = response.accessToken;

      await login(accessToken);
      router.push("/Me/Plan");
    }
    catch(error: any){
      let message = ""
      switch(error.status){
        case 400:
          message = "The email has already been used."
          break;
        case 500:
          message = "Error occurs when connecting to the server. Please try again."
          break;
      }

      setShowError(true);
      setMessage({
        title: "Error",
        description: message
      });
    }
  }

  const updateField = (fieldName: keyof typeof request, value: string) => {
    setRequest((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <LoginInput 
            placeholder="Enter username" 
            style={styles.input}
            onChangeText={(text)=> updateField("username", text)} />
          <LoginInput 
            placeholder="Enter email"
            style={styles.input}
            onChangeText={(text) => updateField("email", text)} />
          <PasswordInput 
            placeholder="Enter password" 
            style={styles.input}
            onChangeText={(text)=> updateField("password", text)} />
          <PasswordInput
            placeholder="Confirm password"
            style={styles.input}
            onChangeText={(text)=> setConfirm(text)}
          />
        </View>
        <CustomButton
          title="Register"
          onPress={handleRegister}
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
  registerText: {
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 16,
  },
});
