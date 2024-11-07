import { StyleSheet, Text, ImageBackground, TouchableOpacity, View, Alert } from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";

export default function Index() {

  const { loaded } = useCustomFonts();

  if (!loaded) {
    return null;
  }

  const handlePress = () => {
    Alert.alert('Button Pressed!', 'You pressed the custom button.');
  };

  return (
    <ImageBackground 
      source={require("../assets/images/intro-bg.jpeg")}
      style={styles.background}>

      <Text style={styles.title}>StudyPal</Text>
      <Text style={styles.slogan}>Learn anywhere, anytime</Text>
      
      <View style={styles.buttonContainer}>
       <CustomButton title="Login" style={styles.loginButoon} onPress={handlePress}/>
       <CustomButton title="Register" style={styles.registerButton} onPress={handlePress}></CustomButton>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title:{
    fontFamily: "Poppins_700Bold",
    fontSize: 36,
    color: Colors.black,
    marginTop: 100,
  },
  slogan:{
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: Colors.green,
    marginBottom:50,
  },
  buttonContainer:{
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 100,
    width: "100%",
  },
  loginButoon:{
    marginBottom:20,
  },
  registerButton:{
    backgroundColor: Colors.green,
  },
});
