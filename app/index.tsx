import { StyleSheet, Text, View } from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";

export default function Index() {

  const { loaded } = useCustomFonts();

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test font</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  title:{
    fontFamily: 'Poppins_700Bold',
  },
});
