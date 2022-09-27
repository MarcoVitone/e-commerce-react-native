import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { fetchRemoveObject } from "../store/actions/handleCart";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartProduct = ({ id, image, productName, amount, price, goTo }) => {
  const [userID, setUserID] = useState("");
  const dispatch = useDispatch();

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

  const removeProduct = () => {
    dispatch(fetchRemoveObject(productName, userID));
  };

  return (
    <View key={id} style={styles.container}>
      <Image
        source={{ uri: image ? image : null }}
        style={{ width: 100, height: 100 }}
      />
      <View style={{ justifyContent: "space-around" }}>
        <View>
          <TouchableOpacity onPress={goTo}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>
              {productName.slice(0, 20)}...
            </Text>
          </TouchableOpacity>

          <Text>{id}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            <Text>Quantità</Text>
            <Text>{amount}</Text>
          </View>
          <Text style={{ fontSize: 22 }}>{price}€</Text>
          <MaterialCommunityIcons
            name="delete-forever"
            size={32}
            color="red"
            onPress={removeProduct}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#b6b6b6",
    marginVertical: 10,
  },
});

export default CartProduct;
