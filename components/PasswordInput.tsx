import { useState } from "react";
import { View, TextInput, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from '@expo/vector-icons';

interface PasswordInputPros{
    style?: ViewStyle;
}

export default function PasswordInput({style}:PasswordInputPros){
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={[styles.container,style]}>
            <TextInput
                placeholder="Enter your password..."
                style={styles.input}
                secureTextEntry={!isPasswordVisible}>
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                {!isPasswordVisible && <FontAwesome name="eye-slash" size={22} color="black"/> || <FontAwesome name="eye" size={22} color="black"/>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent:"flex-start",
        alignContent:"center",
        backgroundColor: Colors.gray,
        borderRadius: 10,
        paddingVertical:5,
        paddingHorizontal:10,
        width:"100%"
    },
    input:{
        flex: 1,
        marginRight: 5,
    },
    button:{
        opacity: 0.8
    },
});