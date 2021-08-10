import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  ScrollView,
  FlatList,
  TouchableOpacityComponent,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "./../../assets/theme";

export const Home = () => {
  const [tasks, setTasks] = useState([
    { key: "1", task: "Temp Task", hour: "0", min: "40", sec: "0", total: "3" },
    {
      key: "2",
      task: "Project Intro",
      hour: "0",
      min: "40",
      sec: "0",
      total: "3",
    },
  ]);

  const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.header_text}>Pomodoro</Text>
        <View style={styles.header_button_container}>
          <TouchableHighlight style={styles.header_button}>
            <Text style={styles.header_button_text}>Newest</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.header_button_active}
            onPress={() => console.log("Menu Pressed")}
          >
            <Text style={styles.header_button_text_active}>Recent</Text>
          </TouchableHighlight>
          <TouchableHighlight tyle={styles.header_button}>
            <Text style={styles.header_button_text}>Order A-Z</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={styles.header_menu}
          onPress={() => console.log("Menu Pressed")}
        >
          <FontAwesome5 name="cog" size={20} color={theme.colors.white} />
        </TouchableHighlight>
      </View>
      <View style={styles.content_container}>
        <FlatList
          style={styles.flatlist}
          data={tasks}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor={theme.colors.primary}
              onPress={() => console.log(item.task)}
              style={styles.task_wrapper}
            >
              <View style={styles.task_container}>
                <FontAwesome5
                  name="hourglass-half"
                  size={22}
                  color={theme.colors.white}
                />
                <Text style={styles.task_text}>{item.task}</Text>
                <Text style={styles.task_text}>
                  {padToTwo(item.hour) + ":" + padToTwo(item.min)}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
        <View style={styles.scrollView}>
          <TouchableHighlight
            style={styles.task_button_container}
            underlayColor={theme.colors.primary}
            onPress={() => console.log("Add Task Pressed")}
          >
            <View style={styles.task_button}>
              <FontAwesome5 name="plus" size={18} color={theme.colors.white} />
              <Text style={styles.task_button_text}>Add New Task</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
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
  },
  content_container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  header_text: {
    fontSize: 24,
    color: theme.colors.white,
  },
  header_menu: {
    position: "absolute",
    top: StatusBar.currentHeight,
    right: StatusBar.currentHeight,
  },
  header_button_container: {
    width: 240,
    backgroundColor: "#fff",
    height: 25,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 25,
    elevation: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  header_button_text: {
    color: theme.colors.primary,
    fontSize: 12,
  },
  header_button_text_active: {
    color: theme.colors.white,
    fontSize: 12,
  },
  header_button_active: {
    backgroundColor: theme.colors.primary,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 21,
  },
  scrollView: {
    height: 200,
  },
  task_button_container: {
    width: 200,
    height: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 10, height: 10 },
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
  task_wrapper: {
    borderRadius: 10,
    marginBottom: 10,
  },
  task_container: {
    minWidth: 220,
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  task_text: {
    color: theme.colors.white,
    fontSize: 18,
  },
  flatlist: {
    marginTop: 20,
  },
});
