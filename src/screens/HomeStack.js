import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Screens";
import { Pomodoro } from "./Pomodoro";
import { Task } from "./Task";
// import { Pomodoro } from "./Pomodoro_tmp";

const NavStack = createStackNavigator();

export const HomeStack = () => {
  return (
    <NavStack.Navigator screenOptions={{ headerShown: false }}>
      <NavStack.Screen name="Home" component={Home} />
      <NavStack.Screen name="Task" component={Task} />
      <NavStack.Screen name="Pomodoro" component={Pomodoro} />
    </NavStack.Navigator>
  );
};
