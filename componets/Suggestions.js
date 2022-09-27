import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const Suggestions = ({ suggestion, goTo }) => {
  return (
    <TouchableOpacity style={styles.text} onPress={goTo}>
      <Text style={styles.text}>{suggestion}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    width: "90%",
    paddingTop: 5,
    paddingLeft: 5,
  },
});

export default Suggestions;
