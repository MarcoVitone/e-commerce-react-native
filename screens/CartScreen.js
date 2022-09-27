import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { fetchCart } from "../store/actions/handleCart";
import { fetchDeleteCart, closeModal } from "../store/actions/handleCart";
import { fetchUploadOrders } from "../store/actions/handleOrders";
import CartProduct from "../componets/CartProduct";
import ModalPopup from "../componets/ModalPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);

  const cart = useSelector((state) => state.cartReducer.cart);
  let totalPrice = 0;
  const loading = useSelector((state) => state.cartReducer.loading);
  const error = useSelector((state) => state.cartReducer.error);
  const emptyCart = useSelector((state) => state.cartReducer.emptyCart);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const myData = JSON.parse(data);
      setToken(myData?.token);
      setUserID(myData.userID);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(fetchCart(userID));
    getData();
  }, [userID]);

  const showCart = loading ? (
    <ActivityIndicator size="large" />
  ) : cart ? (
    Object.values(cart).map((value) => {
      const navigateToSingleProduct = () => {
        navigation.navigate("Product", { suggestion: value.product });
      };
      totalPrice = totalPrice + value.price;
      return (
        <CartProduct
          key={value.id}
          id={value.id}
          image={value.image}
          productName={value.product}
          amount={value.amount}
          price={value.price}
          goTo={navigateToSingleProduct}
        />
      );
    })
  ) : token ? (
    <Text style={styles.text}>Aggiungi qualcosa al carrello...</Text>
  ) : (
    <Text style={styles.text}>
      Effettua l'accesso per aggiungere qualcosa al carrello...
    </Text>
  );

  const date = new Date();
  const dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yy = date.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const fullDate = `${dd} / ${mm} / ${yy}`;

  const removeCart = () => {
    setModal(true);
    dispatch(fetchDeleteCart(userID));
    dispatch(fetchUploadOrders(cart, userID, fullDate, totalPrice));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onCloseModal = () => {
    setModal(false);
    dispatch(closeModal());
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error ? (
          <Text style={styles.totalText}>Problema di network..</Text>
        ) : (
          <>
            <View style={styles.total}>
              <Text style={styles.totalText}>Totale dell'ordine:</Text>
              <Text style={styles.totalText}>{totalPrice}€</Text>
            </View>
            <View style={styles.buttonContainer}>
              {!cart ? null : (
                <TouchableOpacity>
                  <Pressable style={styles.button} onPress={removeCart}>
                    <Text style={styles.buttonText}>Procedi all'acquisto</Text>
                  </Pressable>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView>{showCart}</ScrollView>
          </>
        )}
      </ScrollView>
      <ModalPopup
        isVisible={modal}
        closeModal={onCloseModal}
        text={"Grazie per aver effettuato gli acquisti!"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  totalText: {
    fontSize: 22,
    fontWeight: "500",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#0057B8",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#e6e6e6",
  },
  text: {
    fontSize: 18,
    marginTop: 40,
  },
});

export default CartScreen;
