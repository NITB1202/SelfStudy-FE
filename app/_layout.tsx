import { Stack } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProvider } from "@/context/NavigationContext";
import { AuthProvider } from "@/context/AuthContext";

const Navigation = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
        </Stack>
      </NavigationProvider>
    </AuthProvider>
  );
}
