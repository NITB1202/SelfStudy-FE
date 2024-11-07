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
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Register</Text>
                <LoginInput placeholder="Enter username..." style={styles.space}></LoginInput>
                <LoginInput placeholder="Enter email..." style={styles.space}></LoginInput>
                <PasswordInput placeholder="Enter password..."style={styles.space}></PasswordInput>
                <PasswordInput placeholder="Confirm password..." style={styles.largeSpace}></PasswordInput>
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
    },
    title:{
        fontFamily: "Poppins_700Bold",
        fontSize: 36,
        marginBottom: 30,
    },
    inputContainer:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 40,
        marginTop: 80,
    },
    space:{
        marginBottom:20,
    },
    largeSpace:{
        marginBottom: 40,
    },
});