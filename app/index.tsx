import { StyleSheet, Text, ImageBackground, View} from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Index() {

  const { loaded } = useCustomFonts();

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground 
      source={require("../assets/images/intro-bg.jpeg")}
      style={styles.background}>

      <Text style={styles.title}>StudyPal</Text>
      <Text style={styles.slogan}>Learn anywhere, anytime</Text>
      
      <View style={styles.buttonContainer}>
       <CustomButton title="Login" style={styles.loginButoon} onPress={() =>{router.push("/Intro/Login")}}/>
       <CustomButton title="Register" style={styles.registerButton} onPress={() => {router.push("/Intro/Register")}}></CustomButton>
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
    marginTop: 200,
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
