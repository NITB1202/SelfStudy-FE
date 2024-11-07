import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import LoginInput from "@/components/LoginInput";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function LoginScreen(){
    const { loaded } = useCustomFonts();

    if (!loaded) {
      return null;
    }

    return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=> router.back()}>
        <Feather name="arrow-left-circle" size={30} color="black"></Feather>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Login</Text>
        <LoginInput placeholder="Enter your email..." style={styles.inputEmail}></LoginInput>
        <PasswordInput></PasswordInput>
        <Link style={styles.link} href="/Intro/ForgotPassword">Forgot password?</Link>
        <CustomButton title="Login" onPress={()=> {}}></CustomButton>
      </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 10,
    },
    title: {
        fontFamily: "Poppins_700Bold",
        fontSize: 36,
        marginTop: 100,
        marginBottom: 30,
    },
    inputContainer:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 40,
    },
    inputEmail:{
        marginBottom:20,
    },
    link:{
        width: "100%",
        textAlign: "right",
        marginTop: 10,
        marginBottom: 30,
        fontWeight:"500"
    },
});