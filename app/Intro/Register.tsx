import LoginInput from "@/components/LoginInput";
import PasswordInput from "@/components/PasswordInput";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import CustomButton from "@/components/CustomButton";
import BackButton from "@/components/BackButton";

export default function RegisterScreen(){
    const loaded = useCustomFonts();
    
    if (!loaded) {
        return null;
      }

    return(
        <SafeAreaView style={styles.container}>
            <BackButton></BackButton>
            <View style={styles.body}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.inputContainer}>
                    <LoginInput placeholder="Enter username..."></LoginInput>
                    <LoginInput placeholder="Enter email..."></LoginInput>
                    <PasswordInput placeholder="Enter password..."></PasswordInput>
                    <PasswordInput placeholder="Confirm password..."></PasswordInput>
                </View>
                <CustomButton title="Register" onPress={()=> {}}></CustomButton>
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
        backgroundColor: "white",
    },
    title:{
        fontFamily: "Poppins_700Bold",
        fontSize: 36,
    },
    inputContainer:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    body:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 40,
        marginTop: 80,
    }
});