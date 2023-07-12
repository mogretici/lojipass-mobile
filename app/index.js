import { useCallback } from "react";
import React from "react";
import LoginPage from "./LoginPage";
import { useFonts } from "expo-font";
import {
  RobotoMono_700Bold,
  RobotoMono_400Regular,
} from "@expo-google-fonts/roboto-mono";
import * as SplashScreen from "expo-splash-screen";

const Home = () => {
  const [fontsLoaded] = useFonts({
    Play: require("../assets/fonts/Play-Bold.ttf"),
    RobotoMono_700Bold,
    RobotoMono_400Regular,
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <LoginPage onLayout={onLayoutRootView} />;
};

export default Home;
