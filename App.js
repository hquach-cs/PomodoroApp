import "react-native-gesture-handler";

import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeStack } from "./src/screens/HomeStack";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
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
