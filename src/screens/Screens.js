import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export const Home = () => {
  return <View></View>;
};

export const Pomodoro = () => {
  return (
    <View style={styles.container}>
      <StopWatch />
    </View>
  );
};

export const Stats = () => {
  return <View></View>;
};

class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      hour: 0,
      min: 0,
      sec: 0,
      msec: 0,
    };

    this.interval = null;
  }

  handleToggle = () => {
    this.setState(
      {
        start: !this.state.start,
      },
      () => this.handleStart()
    );
  };

  handleStart = () => {
    if (this.state.start) {
      this.interval = setInterval(() => {
        if (this.state.msec !== 59) {
          this.setState({
            msec: this.state.msec + 1,
          });
        } else if (this.state.sec !== 59) {
          this.setState({
            msec: 0,
            sec: ++this.state.sec,
          });
        } else if (this.state.min !== 59) {
          this.setState({
            msec: 0,
            sec: 0,
            min: ++this.state.min,
          });
        } else {
          this.setState({
            msec: 0,
            sec: 0,
            min: ++this.state.hour,
          });
        }
      }, 1);
    } else {
      clearInterval(this.interval);
    }
  };

  handleReset = () => {
    this.setState({
      start: false,
      hour: 0,
      min: 0,
      sec: 0,
      msec: 0,
    });

    clearInterval(this.interval);
  };

  padToTwo = (number) => (number <= 9 ? `0${number}` : number);

  render() {
    return (
      <View>
        <View style={styles.stopwatch_text_wrapper}>
          <Text>{this.padToTwo(this.state.hour) + ":"}</Text>
          <Text>{this.padToTwo(this.state.min) + ":"}</Text>
          <Text>{this.padToTwo(this.state.sec)}</Text>
        </View>
        <TouchableHighlight
          style={styles.stopwatch_button}
          onPress={this.handleToggle}
        >
          <Text>{this.state.start ? "Stop" : "Start"}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.stopwatch_button}
          onPress={this.handleReset}
        >
          <Text>Reset</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stopwatch_text_wrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  stopwatch_button: {
    width: 100,
    height: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
