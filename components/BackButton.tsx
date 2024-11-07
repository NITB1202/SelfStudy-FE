import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function BackButton(){
    return (
        <TouchableOpacity onPress={()=> router.back()}>
            <Feather name="arrow-left-circle" size={30} color="black"></Feather>
        </TouchableOpacity>
    );
}