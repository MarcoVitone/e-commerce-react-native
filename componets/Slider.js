import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = WIDTH * 0.6;

const Slider = ({ image }) => {
  return <Image source={{ uri: image ? image : null }} style={styles.image} />;
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
  scroll: {
    width: WIDTH,
    height: HEIGHT,
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: "contain",
  },
});

export default Slider;
