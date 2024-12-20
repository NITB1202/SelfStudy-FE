import { Stack } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Navigation = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Intro/Login" />
      <Stack.Screen name="Intro/Register" />
      <Stack.Screen name="Intro/Verification" />
      <Stack.Screen name="MainPage/MePlan" />
    </Stack>
  );
}
