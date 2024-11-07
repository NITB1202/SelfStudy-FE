import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import LoginInput from "@/components/LoginInput";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import { Link, router } from "expo-router";
import BackButton from "@/components/BackButton";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen(){
    const { loaded } = useCustomFonts();

    if (!loaded) {
      return null;
    }

    return (
    <SafeAreaView style={styles.container}>
        <BackButton></BackButton>
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Login</Text>
            <LoginInput placeholder="Enter your email..." style={styles.inputEmail}></LoginInput>
            <PasswordInput placeholder="Enter your password..."></PasswordInput>
            <Link style={styles.link} href="/Intro/ForgotPassword">Forgot password?</Link>
            <CustomButton title="Login" onPress={()=> {}}></CustomButton>
            <View style={styles.divideContainer}>
                <View style={styles.divideLine}></View>
                <Text style={styles.option}>Or</Text>
                <View style={styles.divideLine}></View>
            </View>
            <TouchableOpacity style={styles.googleButton}>
                <FontAwesome name="google" size={22} color="black"></FontAwesome>
                <Text style={styles.googleText}>Login with Google</Text>
            </TouchableOpacity>
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
        marginTop: 80,
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
        marginBottom: 20,
        fontWeight:"500"
    },
    divideLine:{
        borderBottomWidth: 1,
        width: "45%",
        height: "50%",
        borderBottomColor: "gray",
    },
    divideContainer:{
        flexDirection: "row",
        justifyContent:"center",
        alignContent:"center",
        padding: 10,
        width: "100%",
    },
    option:{
        marginHorizontal:5,
        color: "gray"
    },
    googleButton:{
        flexDirection: "row",
        justifyContent:"center",
        alignContent:"center",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        width: "100%",
        opacity: 0.8,
    },
    googleText:{
        fontFamily: "Poppins_700Bold",
        marginLeft: 5,
    }
});