import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import { Text, StyleSheet, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";

export default function ResetPasswordScreen(){
    const { loaded } = useCustomFonts();

    if (!loaded) {
      return null;
    }
    return (
        <SafeAreaView style={styles.container}>
            <BackButton></BackButton>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.instruction}>Your new password must be unique from those previously used.</Text>
            <View style={styles.body}>
                <View  style={styles.inputContainer}>
                    <PasswordInput placeholder="Enter new password..."></PasswordInput>
                    <PasswordInput placeholder="Confirm password..."></PasswordInput>
                </View>
                <CustomButton title="Reset password" onPress={() => {}}></CustomButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 10,
        backgroundColor: "white",
    },
    title:{
        fontFamily: "Poppins_700Bold",
        fontSize: 36,
        width: "100%",
        textAlign: "center",
        marginTop: 80,
    },
    instruction:{
        color: "gray",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    inputContainer:{
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        gap: 20,
        width: "100%",
        marginBottom: 20,
    },
    body:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 10,
    },
});