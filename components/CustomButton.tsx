import { StyleSheet, TouchableOpacity, GestureResponderEvent, ViewStyle, TextStyle, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import useCustomFonts from "@/hooks/useCustomFonts";

interface CustomButtonPros {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function CustomButton({ title, onPress, style, textStyle }: CustomButtonPros){
    const { loaded } = useCustomFonts();

    if (!loaded) {
      return null;
    }

    return(
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.text,textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.black,
        paddingVertical:5,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",

        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 5,
    },
    text:{
        fontFamily: "Poppins_700Bold",
        color: Colors.white,
    },
});