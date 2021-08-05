import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      type: 0, //0 = Pomodoro, 1 = Stopwatch, 2 = Regular Timer
      hour: 0,
      min: 30, //Default: 30 = Pomodoro, 0, 0
      sec: 0,
      msec: 0,
    };

    this.interval = null;
  }

  padToTwo = (number) => (number <= 9 ? `0${number}` : number);

  handleToggle = () => {
    this.setState(
      {
        start: !this.state.start,
      },
      () => {
        if (this.state.type == 0) {
          this.handlePomodoroStart();
        } else if (this.state.type == 1) {
          this.handleStopwatchStart();
        }
      }
    );
  };

  handleStopwatchStart = () => {
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

  handleStopwatchReset = () => {
    this.setState({
      start: false,
      hour: 0,
      min: 0,
      sec: 0,
      msec: 0,
    });

    clearInterval(this.interval);
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.stopwatch_text_wrapper}>
            <Text style={styles.stopwatch_text}>
              {this.state.hour > 0
                ? this.padToTwo(this.state.hour) +
                  ":" +
                  this.padToTwo(this.state.min) +
                  ":" +
                  this.padToTwo(this.state.sec)
                : this.padToTwo(this.state.min) +
                  ":" +
                  this.padToTwo(this.state.sec)}
            </Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  stopwatch_text_wrapper: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  stopwatch_button: {
    width: 100,
    height: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stopwatch_text: {
    fontFamily: "RussoOne",
    textAlign: "center",
    fontSize: 50,
    letterSpacing: 5,
  },
});
