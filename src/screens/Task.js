import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "./../../assets/theme";

function num() {
  var arr = [];
  for (let i = 0; i <= 60; i++) {
    arr.push({ label: i.toString(), value: i.toString() });
  }
  return arr;
}

function num_breaks() {
  var arr = [];
  for (let i = 0; i <= 10; i++) {
    arr.push({ label: i.toString(), value: i.toString() });
  }
  return arr;
}

export const Task = ({ navigation }) => {
  const [taskTitle, onChangeTask] = React.useState(null);
  const [hr_open, setHrOpen] = useState(false);
  const [hr_value, setHrValue] = useState("0");
  const [min_open, setMinOpen] = useState(false);
  const [min_value, setMinValue] = useState("0");
  const [breaks_open, setBreaksOpen] = useState(false);
  const [breaks_value, setBreaksValue] = useState("0");
  const [breaks_timer_open, setBreaksTimerOpen] = useState(false);
  const [breaks_timer_value, setBreaksTimerValue] = useState("0");
  const [items, setItems] = useState(num());
  const [breaks, setBreaks] = useState(num_breaks());
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <TouchableHighlight
        style={styles.cancel_button}
        underlayColor={theme.colors.primary}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.cancel_text}>X</Text>
      </TouchableHighlight>
      <Image
        style={styles.logo}
        source={require("./../../assets/images/Logo.png")}
      />
      <View style={styles.task_container}>
        <Text style={styles.text}>Task:</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTask}
            value={taskTitle}
            placeholder="Project's Header"
          />
          <FontAwesome5 name="pencil-ruler" color={theme.colors.primary} />
        </View>
      </View>
      <View style={styles.picker_container}>
        <View style={styles.time_container}>
          <Text style={styles.text}>Hour:</Text>
          <DropDownPicker
            open={hr_open}
            value={hr_value}
            items={items}
            setOpen={setHrOpen}
            setValue={setHrValue}
            setItems={setItems}
            style={styles.dropdown}
            dropDownContainerStyle={{
              width: 70,
              borderWidth: 1,
              borderColor: theme.colors.primary,
              zIndex: 1,
            }}
            textStyle={styles.dropdown_text}
          />
        </View>
        <View style={styles.time_container}>
          <Text style={styles.text}>Min:</Text>
          <DropDownPicker
            open={min_open}
            value={min_value}
            items={items}
            setOpen={setMinOpen}
            setValue={setMinValue}
            setItems={setItems}
            placeholder={"00"}
            style={styles.dropdown}
            dropDownContainerStyle={{
              width: 70,
              borderWidth: 1,
              borderColor: theme.colors.primary,
            }}
            textStyle={styles.dropdown_text}
          />
        </View>
      </View>
      <View style={styles.picker_container}>
        <View style={styles.time_container}>
          <Text style={styles.text_break}>Breaks:</Text>
          <DropDownPicker
            open={breaks_open}
            value={breaks_value}
            items={breaks}
            setOpen={setBreaksOpen}
            setValue={setBreaksValue}
            setItems={setBreaks}
            style={styles.dropdown}
            dropDownContainerStyle={{
              width: 70,
              borderWidth: 1,
              borderColor: theme.colors.primary,
              zIndex: 1,
            }}
            textStyle={styles.dropdown_text}
          />
        </View>
        <View style={styles.time_container}>
          <Text style={styles.text_break}>Breaks Min:</Text>
          <DropDownPicker
            open={breaks_timer_open}
            value={breaks_timer_value}
            items={items}
            setOpen={setBreaksTimerOpen}
            setValue={setBreaksTimerValue}
            setItems={setItems}
            placeholder={"00"}
            style={styles.dropdown}
            dropDownContainerStyle={{
              width: 70,
              borderWidth: 1,
              borderColor: theme.colors.primary,
            }}
            textStyle={styles.dropdown_text}
          />
        </View>
      </View>
      <TouchableHighlight
        style={styles.task_button_container}
        underlayColor={theme.colors.primary}
        onPress={() =>
          navigation.navigate("Pomodoro", {
            task: taskTitle,
            hour: hr_value,
            min: min_value,
            breaks: breaks_value,
            breaksTimer: breaks_timer_value,
          })
        }
      >
        <View style={styles.task_button}>
          <Text style={styles.task_button_text}>Pomodoro </Text>
          <FontAwesome5
            name="arrow-right"
            size={18}
            color={theme.colors.white}
          />
        </View>
      </TouchableHighlight>
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
  },
  logo: { marginTop: 40, marginBottom: 40 },
  task_container: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    width: "90%",
  },
  input_container: {
    width: "80%",
    height: 40,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: "#000",
    elevation: 5,
  },
  text: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 20,
    width: 50,
    marginRight: 15,
  },
  text_break: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 20,
    width: 70,
    marginRight: 15,
  },
  time_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
  },
  dropdown: {
    width: 70,
    height: 40,
    borderWidth: 2,
    shadowColor: "#000",
    elevation: 5,
    borderColor: theme.colors.primary,
  },
  dropdown_text: { fontSize: 16, color: theme.colors.primary },
  picker_container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  task_button_container: {
    position: "absolute",
    bottom: 100,
    width: 200,
    height: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 50,
    elevation: 5,
  },
  task_button: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  task_button_text: {
    color: theme.colors.white,
    fontSize: 20,
    textAlign: "center",
  },
  cancel_button: {
    position: "absolute",
    left: StatusBar.currentHeight,
    top: StatusBar.currentHeight * 1.5,
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cancel_text: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
});
