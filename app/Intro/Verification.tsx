import CustomButton from "@/components/CustomButton";
import NumberInput from "@/components/NumberInput";
import { Text, StyleSheet, View, TextInput, TouchableHighlight} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import BackButton from "@/components/BackButton";
import { useRef } from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function VerificationScreen(){
    const inputs = Array.from({ length: 4 }, () => useRef<TextInput>(null));
    const loaded = useCustomFonts();
    const handleTextChange = (text: string, index: number) =>{
        if(text.length === 1 && index < inputs.length -1)
            inputs[index+1]?.current?.focus();
    };

    if (!loaded) {
        return null;
      }

    return (
        <SafeAreaView style={styles.container}>
            <BackButton></BackButton>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Verification</Text>
                    <Text style={styles.instruction}>Enter the verification code we just sent on your email address.</Text>
                    <View style={styles.numberContainer}>
                        {
                            inputs.map((inputRef, index) =>
                            (
                                <NumberInput
                                    key={index}
                                    ref={inputRef}
                                    onChangeText={(text: string) => handleTextChange(text, index)}>
                                </NumberInput>
                            )
                        )}
                    </View>
                    <Text style={styles.countdown}>00:00</Text>
                    <CustomButton title="Verify" onPress={()=>{router.push("/Intro/ResetPassword")}}></CustomButton>
                    <View style={styles.linkContainer}>
                        <Text>Didn't receive a code? </Text>
                        <TouchableHighlight>
                            <Text style={styles.highlight}>Resend</Text>
                        </TouchableHighlight>
                    </View>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding:10,
        backgroundColor: "white",
    },
    numberContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    title:{
        fontSize: 36,
        fontFamily: "Poppins_700Bold",
        marginTop: 80,
    },
    instruction:{
        color: "gray",
    },
    inputContainer:{
        justifyContent:"center",
        alignItems: "center",
        width: "100%",
        padding: 10,
    },
    linkContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    highlight:{
        color: Colors.highlightgreen,
        fontWeight: "700",
    },
    countdown:{
        fontSize: 22,
        fontWeight: "500",
        marginBottom: 10,
    }
});