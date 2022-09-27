import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const WIDTH = Dimensions.get("window").width;

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersReducer.orders);
  const loading = useSelector((state) => state.ordersReducer.loading);

  const showOrders = loading ? (
    <ActivityIndicator size="large" />
  ) : (
    Object.values(orders).map((value, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.orderContainer}
          onPress={() => navigation.navigate("SingleOrder", { value })}
        >
          <Text style={styles.title}>Ordine effettuato il</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{value.fullDate}</Text>
            <Text style={styles.data}>Totale: {value.totalPrice} €</Text>
          </View>
        </TouchableOpacity>
      );
    })
  );

  return <ScrollView style={styles.container}>{showOrders}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: "#f6f6f6",
  },
  orderContainer: {
    width: WIDTH,
    backgroundColor: "#fff",
    height: WIDTH / 3,
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingHorizontal: 25,
    marginVertical: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
  },
  dataContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  data: {
    fontSize: 24,
  },
});

export default OrdersScreen;
