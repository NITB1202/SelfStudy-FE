import { StyleSheet, TouchableOpacity, GestureResponderEvent, ViewStyle, TextStyle, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import useCustomFonts from "@/hooks/useCustomFonts";

interface CustomButtonPros {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonPros> = ({ title, onPress, style, textStyle }) => {

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
        width: "100%"
    },
    text:{
        fontFamily: "Poppins_700Bold",
        color: Colors.white,
    },
});

export default CustomButton;