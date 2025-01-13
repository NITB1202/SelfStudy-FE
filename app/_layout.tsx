import { Stack } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProvider } from "@/context/NavigationContext";

const Navigation = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NavigationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
      </Stack>
    </NavigationProvider>
  );
}
