import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Stats } from "./Screens";
import { Pomodoro } from "./Pomodoro";
// import { Pomodoro } from "./Pomodoro_tmp";

const BotStack = createBottomTabNavigator();

export const HomeStack = () => {
  return (
    <BotStack.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#FD6B51",
        inactiveTintColor: "#959090",
        style: {
          height: 60,
          paddingRight: "10%",
          paddingLeft: "10%",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <BotStack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="home" size={24} color={color} />
              {/* <Text style={(color = { color })}>Home</Text> */}
            </View>
          ),
        }}
      ></BotStack.Screen>
      <BotStack.Screen
        name="Pomodoro"
        component={Pomodoro}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="hourglass-half" size={24} color={color} />
              {/* <Text style={(color = { color })}>Pomodoro</Text> */}
            </View>
          ),
        }}
      ></BotStack.Screen>
      <BotStack.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="chart-bar" size={24} color={color} />
              {/* <Text style={(color = { color })}>Stats</Text> */}
            </View>
          ),
        }}
      ></BotStack.Screen>
    </BotStack.Navigator>
  );
};
