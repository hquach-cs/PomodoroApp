import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "./../../assets/theme";

export class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      hour: 0,
      min: 30, //Default: 30 = Pomodoro, 0, 0
      sec: 0,
      msec: 0,
      breaks_done: 1,
      breaks_total: 3,
      habits: [
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
        {
          id: 3,
          text: "Stretch",
          time: "10:00",
          state: true,
        },
      ],
    };

    this.interval = null;
    this.navigation = this.props.navigation;
    this.route = this.props.route;
  }

  padToTwo = (number) => (number <= 9 ? `0${number}` : number);

  handleToggle = () => {
    this.setState(
      {
        start: !this.state.start,
      },
      () => {
        this.handlePomodoroStart();
      }
    );
  };

  handlePomodoroStart = () => {
    if (this.state.start) {
      this.interval = setInterval(() => {
        if (this.state.msec !== 0) {
          this.setState({
            msec: this.state.msec - 1,
          });
        } else if (this.state.sec !== 0) {
          this.setState({
            msec: 59,
            sec: --this.state.sec,
          });
        } else if (this.state.min !== 0) {
          this.setState({
            msec: 59,
            sec: 59,
            min: --this.state.min,
          });
        } else {
          this.setState({
            msec: 59,
            sec: 59,
            min: 59,
            hour: --this.state.hour,
          });
        }
      }, 1);
    } else {
      clearInterval(this.interval);
    }
  };

  handlePomodoroReset = () => {
    this.setState({
      start: false,
      hour: 0,
      min: 30,
      sec: 0,
      msec: 0,
    });

    clearInterval(this.interval);
  };

  getBreaks = () => {
    var breaks_list = [];
    for (let i = 0; i < this.state.breaks_done; i++) {
      breaks_list.push(
        <View key={i} style={timer_styles.timer_breaks_circle_done}></View>
      );
    }
    for (let i = this.state.breaks_done; i < this.state.breaks_total; i++) {
      breaks_list.push(
        <View key={i} style={timer_styles.timer_breaks_circle}></View>
      );
    }
    return breaks_list;
  };

  toggleHabit = (id) => {
    var temp_habits = this.state.habits;
    temp_habits[id].state = !temp_habits[id].state;
    this.setState({
      habits: temp_habits,
    });
  };

  createHabits = () => {
    var habit_list = [];
    for (let i = 0; i < this.state.habits.length; i++) {
      habit_list.push(
        <Habit
          key={i}
          habit={this.state.habits[i].text}
          time={this.state.habits[i].time}
          toggle={() => this.toggleHabit(i)}
          state={this.state.habits[i].state}
        />
      );
    }
    return habit_list;
  };

  render() {
    return (
      <View style={styles.container}>
        <Title navigation={this.navigation} />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={timer_styles.timer_text}>
              {this.padToTwo(this.state.hour) +
                ":" +
                this.padToTwo(this.state.min) +
                ":" +
                this.padToTwo(this.state.sec)}
            </Text>
            <View style={timer_styles.timer_breaks_container}>
              {/* {this.getBreaks()} */}
            </View>
            <Text>Hydrate in 10 min</Text>
            <View style={timer_styles.timer_button_container}>
              <TouchableHighlight
                style={timer_styles.timer_button}
                onPress={this.handlePomodoroReset}
              >
                <Text style={timer_styles.timer_button_text}>Reset</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={timer_styles.timer_button}
                onPress={this.handleToggle}
              >
                <Text style={timer_styles.timer_button_text}>
                  {this.state.start ? "Stop" : "Start"}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          {this.createHabits()}
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
  }
}

const Title = (props) => {
  return (
    <View style={styles.title_container}>
      <View style={styles.circle_bg}></View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.navigation.goBack();
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
