import "react-native-gesture-handler";

import React from "react";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeStack } from "./src/screens/HomeStack";

const AuthStack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    RussoOne: require("./assets/fonts/RussoOne.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Main" component={HomeStack} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
