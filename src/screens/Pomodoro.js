import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "./../../assets/theme";

export const Pomodoro = () => {
  const habit_data = [
    {
      id: 0,
      text: "Hydrate",
      time: "15:00",
      state: true,
    },
    {
      id: 1,
      text: "Bathroom",
      time: "20:00",
      state: false,
    },
  ];
  const [habits, setHabits] = useState(habit_data);

  const toggleHabit = (id) => {
    habits[id].state = !habits[id].state;
    setHabits([...habits]);
  };

  var habit_list = [];
  for (let i = 0; i < habits.length; i++) {
    console.log(habits[i].text);
    habit_list.push(
      <Habit
        key={i}
        habit={habits[i].text}
        time={habits[i].time}
        toggle={() => toggleHabit(i)}
        state={habits[i].state}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Title />
      {habit_list}
    </View>
  );
};

const Title = () => {
  return (
    <View style={styles.title_container}>
      <View style={styles.circle_bg}></View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          console.log("Go Back");
        }}
      >
        <FontAwesome5 name="arrow-left" size={24} color={theme.colors.white} />
      </TouchableOpacity>
      <Text style={styles.title_text}>Pomodoro's Task</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          console.log("Menu");
        }}
      >
        <FontAwesome5 name="bars" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const Habit = (props) => {
  return (
    <View style={styles.habit_container}>
      <Text style={styles.habit_text}>{props.habit}</Text>
      <Switch
        trackColor={{ false: "#959090", true: theme.colors.primary }}
        thumbColor={props.state ? theme.colors.primary : "#FFF"}
        onValueChange={props.toggle}
        value={props.state}
        style={({ transform: [{ scaleX: 1.2 }] }, styles.switch)}
      ></Switch>
      <Text style={styles.habit_text}>{props.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    paddingLeft: StatusBar.currentHeight,
    paddingRight: StatusBar.currentHeight,
  },
  title_container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title_text: {
    color: theme.colors.primary,
    fontSize: 24,
  },
  circle_bg: {
    backgroundColor: theme.colors.primary,
    width: 85,
    height: 85,
    position: "absolute",
    left: -StatusBar.currentHeight,
    top: -StatusBar.currentHeight,
    borderBottomRightRadius: 140,
  },
  habit_container: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-around",
    alignItems: "center",
  },
  habit_text: {
    fontSize: 16,
    width: 75,
  },
  switch: {},
});
