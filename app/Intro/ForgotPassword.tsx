import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import LoginInput from "@/components/LoginInput";
import { Text, StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import { router } from "expo-router";

export default function ForgotPassWordScreen(){
    const { loaded } = useCustomFonts();

    if (!loaded) {
      return null;
    }

    return(
        <SafeAreaView style={styles.container}>
            <BackButton></BackButton>
            <Text style={styles.title}>Forgot password?</Text>
            <Text style={styles.instruction}>Please enter the email linked with your account.</Text>
            <View style={styles.inputContainer}>
                <LoginInput placeholder="Enter your email..." style={styles.space}></LoginInput>
                <CustomButton title="Send code" onPress={()=>{router.push("/Intro/Verification")}}></CustomButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems:"flex-start",
        padding: 10,
        backgroundColor: "white",
    },
    title:{
        fontFamily: "Poppins_700Bold",
        fontSize: 36,
        marginTop: 80,
        textAlign: "center",
        width: "100%",
    },
    instruction:{
        color: "gray",
        textAlign:"left",
        paddingHorizontal: 10,
        width: "100%",
    },
    inputContainer:{
        justifyContent:"center",
        alignItems: "center",
        width: "100%",
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    space:{
        marginBottom: 30,
    },
});