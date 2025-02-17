import {
  Text,
  StyleSheet,
  View,
  Image,
  Linking,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomFonts from "@/hooks/useCustomFonts";
import LoginInput from "@/components/LoginInput";
import CustomButton from "@/components/CustomButton";
import PasswordInput from "@/components/PasswordInput";
import { Link, router } from "expo-router";
import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { isValidEmail } from "@/util/validator";
import { useAuth } from "@/context/AuthContext";
import authApi from "@/api/authApi";
import Error from "@/components/Message/Error";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoginScreen() {
  const { fontsLoaded } = useCustomFonts();
  const [loginRequest, setLoginRequest] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    description: "",
  });
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // if (!fontsLoaded) {
  //   return null;
  // }

  const handleLogin = async () => {
    if (loginRequest.email == "" || loginRequest.password == "") {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "The email or password is empty.",
      });

      return;
    }
    console.log(loginRequest.password);

    if (!isValidEmail(loginRequest.email)) {
      setShowError(true);
      setMessage({
        title: "Error",
        description: "Invalid email format.",
      });
      return;
    }

    try {
      setLoading(true);
      const response: any = await authApi.login(
        loginRequest.email,
        loginRequest.password
      );

      const accessToken = response.accessToken;

      await login(accessToken);

      // const decodedToken = decodeToken(accessToken);
      // if(decodedToken.role === "USER")
      router.push("/Me/Plan");
    } catch (error: any) {
      let errorDes = "";
      switch (error.status) {
        case 400:
          errorDes = "Incorrect password.";
          break;
        case 404:
          errorDes = "This email hasn't been registered yet.";
          break;
        case 500:
          errorDes = "Error connecting to the server. Please try again.";
          break;
      }

      setShowError(true);
      setMessage({
        title: "Error",
        description: errorDes,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Linking.openURL(
      "http://selfstudy.up.railway.app/oauth2/authorization/google"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <BackButton />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Login</Text>
        <LoginInput
          placeholder="Enter your email"
          style={styles.inputEmail}
          onChangeText={(text) => {
            setLoginRequest((prev) => ({
              ...prev,
              email: text,
            }));
          }}
        />
        <PasswordInput
          placeholder="Enter your password"
          onChangeText={(text) => {
            setLoginRequest((prev) => ({
              ...prev,
              password: text,
            }));
          }}
        />
        <Link style={styles.link} href="/Authentication/ForgotPassword">
          Forgot password?
        </Link>
        <CustomButton
          title="Login"
          style={styles.loginButton}
          onPress={handleLogin}
        />
        <View style={styles.divideContainer}>
          <View style={styles.divideLine}></View>
          <Text style={styles.option}>Or</Text>
          <View style={styles.divideLine}></View>
        </View>
        <Pressable style={styles.googleButton} onPress={handleGoogleLogin}>
          <Image source={require("../../assets/images/google-icon.png")} />
          <Text style={styles.googleText}>Login with Google</Text>
        </Pressable>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Link style={styles.signUpLink} href="/Authentication/Register">
            Sign up here
          </Link>
        </Text>
      </View>
      {showError && (
        <Error
          title={message.title}
          description={message.description}
          visible={showError}
          onClose={() => setShowError(false)}
          onOkPress={() => setShowError(false)}
        ></Error>
      )}
      {
        // loading && <LoadingScreen/>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  backButton: {
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 0,
  },

  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    marginTop: 20,
    marginBottom: 40,
    color: "#7AB2D3",
    textAlign: "center",
    width: "100%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    paddingVertical: 60,
    paddingHorizontal: 10,
  },
  inputEmail: {
    marginBottom: 10,
    width: "100%",
  },
  link: {
    width: "100%",
    textAlign: "right",
    marginTop: 10,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#7AB2D3",
    fontSize: 15,
    fontFamily: "Roboto_700Bold",
  },
  loginButton: {
    backgroundColor: "#7AB2D3",
    width: "100%",
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: "center",
  },
  divideLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  divideContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  option: {
    marginHorizontal: 5,
    color: "gray",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    width: "100%",
  },
  googleText: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 5,
    color: "gray",
    fontSize: 20,
  },
  footerText: {
    marginTop: 40,
    fontFamily: "Roboto_400Regular",
    color: "black",
    textAlign: "center",
    fontSize: 16,
  },
  signUpLink: {
    color: "#7AB2D3",
    fontFamily: "Roboto_700Bold",
    fontWeight: "bold",
  },
});
