import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "./../../assets/theme";

export const Task = ({ navigation }) => {
  const [taskTitle, onChangeTask] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [items, setItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
  ]);
  return (
    <View style={styles.container}>
      <View>
        <Text>Task:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTask}
          value={taskTitle}
          placeholder="Task"
        />
        <FontAwesome5 name="pencil-ruler" />
      </View>
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{ width: 70 }}
          dropDownContainerStyle={{ width: 70 }}
          textStyle={{ color: theme.colors.primary }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
});
