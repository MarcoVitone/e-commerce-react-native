import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = WIDTH / 2;

const SingleOrderScreen = ({ navigation, route }) => {
  const loading = useSelector((state) => state.ordersReducer.loading);
  const dataOrder = route.params.value;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const myData = JSON.parse(data);
      setUserID(myData.userID);
    } catch (e) {
      console.log(e);
    }
  };

  const showOrder = loading ? (
    <ActivityIndicator size="large" />
  ) : (
    Object.values(dataOrder.order).map((value, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.productContainer}
          onPress={() =>
            navigation.navigate("Product", { suggestion: value.product })
          }
        >
          <Image source={{ uri: value.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{value.product}</Text>
            <Text style={styles.price}>Quantità: {value.amount}</Text>
            <Text style={styles.price}>{value.price} €</Text>
          </View>
        </TouchableOpacity>
      );
    })
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {loading ? <ActivityIndicator size="large" /> : showOrder}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
  },
  productContainer: {
    width: WIDTH * 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  image: {
    width: WIDTH / 2,
    height: HEIGHT,
  },
  textContainer: {
    justifyContent: "space-around",
  },
  title: {
    fontSize: 22,
    width: WIDTH / 2,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  price: {
    fontSize: 16,
  },
});

export default SingleOrderScreen;
