import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/actions/handleProducts";
import {
  fetchUploadCart,
  closeModal,
  openModal,
} from "../store/actions/handleCart";
import { Entypo } from "@expo/vector-icons";
import Slider from "../componets/Slider";
import Button from "../componets/Button";
import ModalPopup from "../componets/ModalPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = WIDTH * 0.6;
const ProductScreen = ({ route }) => {
  const [counter, setCounter] = useState(1);
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [modal, setModal] = useState(false);

  const product = route.params.suggestion;
  const products = useSelector((state) => state.productsReducer.singleProduct);
  const loading = useSelector((state) => state.productsReducer.loading);
  const isInCart = useSelector((state) => state.cartReducer.isInCart);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const myData = JSON.parse(data);
      setToken(myData.token);
      setUserID(myData.userID);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(product));
    getData();
    setModal(isInCart);
  }, [product, isInCart]);

  const postOnCart = () => {
    token
      ? (dispatch(
          fetchUploadCart(
            counter,
            products.Name,
            products.ID,
            products.Price,
            products.FirstImage,
            userID
          )
        ),
        setModal(false))
      : setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
    dispatch(closeModal());
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView
            style={styles.scroll}
            snapToInterval={WIDTH}
            horizontal
            pagingEnabled={true}
          >
            {products?.Images?.map((image, index) => {
              return <Slider key={index} image={image} />;
            })}
          </ScrollView>
        )}
      </View>
      <View>
        <Text>{products?.Name}</Text>
      </View>
      <View>
        <Text>{products?.ID}</Text>
      </View>
      <View>
        <Text>{products?.Price} €</Text>
      </View>
      <View style={styles.counter}>
        <TouchableOpacity
          onPress={() => {
            if (counter > 1) {
              setCounter(counter - 1);
            }
          }}
        >
          <Entypo name="minus" size={22} />
        </TouchableOpacity>
        <Text style={styles.number}>{counter}</Text>
        <TouchableOpacity onPress={() => setCounter(counter + 1)}>
          <Entypo name="plus" size={22} />
        </TouchableOpacity>
      </View>
      <Button postOnCart={postOnCart} />
      <ModalPopup
        isVisible={modal}
        closeModal={onCloseModal}
        text={
          token
            ? "Oggetto già aggiunto al carrello!"
            : "Effettua il login per fare acquisti"
        }
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
  imageContainer: {
    width: WIDTH,
    height: HEIGHT,
  },
  scroll: {
    width: WIDTH,
    height: HEIGHT,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 26,
    marginHorizontal: 10,
  },
});

export default ProductScreen;
