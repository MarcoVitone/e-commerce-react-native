import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Button = ({ postOnCart }) => {
  return (
    <Pressable style={styles.button} onPress={postOnCart}>
      <Text style={styles.text}>Aggiungi al carrello</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#1BC269",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    letterSpacing: 0.5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 21,
  },
});

export default Button;
