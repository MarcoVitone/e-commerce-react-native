import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoaderScreen;
