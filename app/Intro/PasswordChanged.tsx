import CustomButton from "@/components/CustomButton";
import { Text,Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import { router } from "expo-router";

export default function PasswordChangedScreen(){
    const { loaded } = useCustomFonts();

    if (!loaded) {
      return null;
    }

    return(
        <SafeAreaView style={styles.container}>
            <Image source={require("../../assets/images/success-icon.png")} style={styles.image}></Image>
            <Text style={styles.title}>Password changed!</Text>
            <Text style={styles.instruction}>You password has changed successfully</Text>
            <View style={styles.buttonContainer}>
                <CustomButton title="Back to login" onPress={()=>{router.push("/Intro/Login")}}></CustomButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    image:{
        width: 150,
        height: 150,
    },
    title:{
        fontFamily: "Poppins_700Bold",
        fontSize: 24,
        marginTop: 30,
    },
    instruction:{
        color: "gray",
    },
    buttonContainer:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 40,
    },
});