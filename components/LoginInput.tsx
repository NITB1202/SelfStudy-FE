import { View, TextInput, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

interface LoginInputPros {
  placeholder: string;
  style?: ViewStyle;
  onChangeText?: (text:string) => void;
}

export default function LoginInput({ placeholder, style, onChangeText}: LoginInputPros) {
  return (
    <View style={[styles.container, style]}>
      <TextInput 
        placeholder={placeholder}
        onChangeText={onChangeText}>
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "flex-start",
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    height: 40,
  },
});
