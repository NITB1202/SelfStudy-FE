import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import Header from "@/components/Header";

export default function Document(){
    return(
        <SafeAreaView>
            <Header/>
            <Text>This is document page</Text>
        </SafeAreaView>
    );
}