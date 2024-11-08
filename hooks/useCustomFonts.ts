import { Poppins_700Bold, Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function useCustomFonts() {
  const [loaded, error] = useFonts({
    Poppins_700Bold,
    Roboto_400Regular,
    Poppins_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
}
