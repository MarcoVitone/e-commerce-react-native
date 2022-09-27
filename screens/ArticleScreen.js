import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticle } from "../store/actions/handleProducts";

const WIDTH = Dimensions.get("window").width / 2;
const HEIGHT = WIDTH;
const ArticleScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const article = route.params.article;
  const allArticle = useSelector((state) => state.productsReducer.dataProducts);
  const loading = useSelector((state) => state.cartReducer.loading);
  const error = useSelector((state) => state.productsReducer.error);

  useEffect(() => {
    dispatch(fetchArticle(article));
  }, [dispatch]);

  const renderProducts = Object.values(allArticle).map((value, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.productContainer}
        onPress={() =>
          navigation.navigate("Product", { suggestion: value.Name })
        }
      >
        <Image source={{ uri: value.FirstImage }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{value.Name}</Text>
          <Text style={styles.price}>{value.Price} €</Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {error ? null : loading ? (
          <ActivityIndicator size="large" />
        ) : (
          renderProducts
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f6f6f6",
    alignItems: "center",
  },
  productContainer: {
    width: WIDTH * 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
  },
  textContainer: {
    justifyContent: "space-around",
  },
  title: {
    fontSize: 28,
    width: WIDTH,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  price: {
    fontSize: 26,
  },
});

export default ArticleScreen;
