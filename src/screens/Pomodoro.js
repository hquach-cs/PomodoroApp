import React, { Component, useState, useEffect } from "react";
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
  var interval = null;
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

  const timer_data = {
    hour: 0,
    min: 39,
    sec: 57,
    msec: 0,
    start: false,
    breaks_total: 3,
    breaks_done: 1,
    habits: 2,
  };

  const handleToggle = () => {
    timer.start = !timer.start;
    setTimer(timer);
    handlePomodoro();
  };

  const handlePomodoro = () => {
    if (timer.start) {
      interval = setInterval(() => {
        if (timer.msec !== 0) {
          timer.msec -= 1;
          setTimer(timer);
        } else if (timer.sec !== 0) {
          timer.msec = 59;
          timer.sec -= 1;
          setTimer(timer);
        } else if (timer.min !== 0) {
          timer.msec = 59;
          timer.sec = 59;
          timer.min -= 1;
          setTimer(timer);
        } else {
          timer.msec = 59;
          timer.sec = 59;
          timer.min = 59;
          timer.hour -= 1;
          setTimer(timer);
        }
      }, 1);
    } else {
      clearInterval(interval);
    }
  };

  const [habits, setHabits] = useState(habit_data);
  const [timer, setTimer] = useState(timer_data);

  const toggleHabit = (id) => {
    habits[id].state = !habits[id].state;
    setHabits([...habits]);
  };

  var habit_list = [];
  for (let i = 0; i < habits.length; i++) {
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

  var breaks_list = [];
  for (let i = 0; i < timer.breaks_done; i++) {
    breaks_list.push(
      <View key={i} style={timer_styles.timer_breaks_circle_done}></View>
    );
  }
  for (let i = timer.breaks_done; i < timer.breaks_total; i++) {
    breaks_list.push(
      <View key={i} style={timer_styles.timer_breaks_circle}></View>
    );
  }

  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.content_container}>
        <Header timer={timer} breaks={breaks_list} toggle={handleToggle} />

        {habit_list}
        <TouchableOpacity
          style={styles.habit_button}
          activeOpacity={1}
          onPress={() => {
            console.log("Habit's Button");
          }}
        >
          <FontAwesome5
            name="plus"
            size={20}
            color={theme.colors.white}
          ></FontAwesome5>
        </TouchableOpacity>
      </View>
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

const Header = (props) => {
  const padToTwo = (number) => (number <= 9 ? `0${number}` : number);
  var time =
    padToTwo(props.timer.hour) +
    ":" +
    padToTwo(props.timer.min) +
    ":" +
    padToTwo(props.timer.sec);
  return (
    <View style={styles.header_container}>
      <Text style={timer_styles.timer_text}>{time}</Text>
      <View style={timer_styles.timer_breaks_container}>{props.breaks}</View>
      <Text>Hydrate in 10 min</Text>
      <View style={timer_styles.timer_button_container}>
        <TouchableOpacity
          style={timer_styles.timer_button}
          activeOpacity={1}
          onPress={() => {
            console.log("Timer Reset");
          }}
        >
          <Text style={timer_styles.timer_button_text}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={timer_styles.timer_button}
          activeOpacity={1}
          onPress={() => {
            console.log("Timer Toggle");
            props.toggle();
          }}
        >
          <Text style={timer_styles.timer_button_text}>
            {props.timer.start ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>
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
  content_container: {
    alignItems: "center",
    marginTop: 50,
    width: "100%",
    height: "100%",
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
  habit_button: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 25,
  },
  header_container: {
    height: "30%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

// text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.75)

// {
//   textShadowColor: 'rgba(0, 0, 0, 0.75)',
//   textShadowOffset: {width: -1, height: 1},
//   textShadowRadius: 10
// }

const timer_styles = StyleSheet.create({
  timer_text: {
    fontFamily: "RussoOne",
    textAlign: "center",
    fontSize: 50,
    letterSpacing: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  timer_button_container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  timer_button: {
    height: 42,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  timer_button_text: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  timer_breaks_container: {
    height: 15,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  timer_breaks_circle_done: {
    width: 12,
    height: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  timer_breaks_circle: {
    width: 12,
    height: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: theme.colors.foreground,
  },
});
