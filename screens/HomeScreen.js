import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestion } from "../store/actions/handleSuggestion";
import { fetchCartAmount, fetchCart } from "../store/actions/handleCart";
import { fetchImage } from "../store/actions/handleProducts";
import { FontAwesome } from "@expo/vector-icons";
import Suggestions from "../componets/Suggestions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [suggenstions, setSuggestions] = useState([]);
  const [arraySuggestions, setArraySuggestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userID, setUserID] = useState("");

  const dispatch = useDispatch();
  const fetchedSuggestion = useSelector(
    (state) => state.suggestionsReducer.suggestions
  );
  const giaccheUri = useSelector((state) => state.productsReducer.giacche);
  const maglieUri = useSelector((state) => state.productsReducer.maglie);
  const pantaloniUri = useSelector((state) => state.productsReducer.pantaloni);
  const loading = useSelector((state) => state.productsReducer.loading);
  const suggError = useSelector((state) => state.suggestionsReducer.error);
  const imageError = useSelector((state) => state.productsReducer.error);

  const giacche = { uri: giaccheUri ? giaccheUri : null };
  const maglie = { uri: maglieUri ? maglieUri : null };
  const pantaloni = { uri: pantaloniUri ? pantaloniUri : null };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const myData = JSON.parse(data);
      setUserID(myData.userID);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    dispatch(fetchSuggestion());
    dispatch(fetchCartAmount(userID));
    dispatch(fetchImage());
  }, [userID]);

  //handle suggestion from input
  const onChangeHandler = (value) => {
    setInput(value);
    setSuggestions(Object.keys(fetchedSuggestion));
    if (input.length >= 2) {
      setArraySuggestions(
        suggenstions.filter((value) => {
          return value
            .toLocaleLowerCase()
            .startsWith(input.toLocaleLowerCase());
        })
      );
    } else {
      setArraySuggestions([]);
    }
  };

  const viewSuggestion = arraySuggestions?.map((value, index) => {
    const navigateToSingleProduct = () => {
      navigation.navigate("Product", { suggestion: value });
      setInput("");
      setArraySuggestions([]);
    };
    return arraySuggestions ? (
      <Suggestions
        key={index}
        suggestion={value}
        goTo={navigateToSingleProduct}
      />
    ) : null;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            enabled={true}
            onRefresh={onRefresh}
          />
        }
      >
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={onChangeHandler}
          placeholder="Cerca..."
          importantForAutofill="no"
        />
        {suggError ? (
          <Text style={styles.title}>Problema di Network...</Text>
        ) : (
          viewSuggestion
        )}
        <View style={styles.productsContainer}>
          {loading ? (
            <ActivityIndicator size="large" style={styles.product} />
          ) : (
            <TouchableOpacity
              style={styles.product}
              onPress={() =>
                navigation.navigate("Article", { article: "Maglie" })
              }
            >
              <Text style={styles.title}>MAGLIE</Text>
              {imageError ? (
                <FontAwesome name={"picture-o"} size={32} color={"grey"} />
              ) : (
                <Image source={maglie} style={styles.image} />
              )}
            </TouchableOpacity>
          )}
          {loading ? (
            <ActivityIndicator size="large" style={styles.product} />
          ) : (
            <TouchableOpacity
              style={styles.product}
              onPress={() =>
                navigation.navigate("Article", { article: "Pantaloni" })
              }
            >
              <Text style={styles.title}>PANTALONI</Text>
              {imageError ? (
                <FontAwesome name={"picture-o"} size={32} color={"grey"} />
              ) : (
                <Image source={pantaloni} style={styles.image} />
              )}
            </TouchableOpacity>
          )}
          {loading ? (
            <ActivityIndicator size="large" style={styles.product} />
          ) : (
            <TouchableOpacity
              style={styles.product}
              onPress={() =>
                navigation.navigate("Article", { article: "Giacche" })
              }
            >
              <Text style={styles.title}>GIACCHE</Text>
              {imageError ? (
                <FontAwesome name={"picture-o"} size={32} color={"grey"} />
              ) : (
                <Image source={giacche} style={styles.image} />
              )}
            </TouchableOpacity>
          )}
        </View>
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
  scrollView: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    marginTop: 25,
    width: "90%",
    padding: 5,
    paddingLeft: 10,
    borderBottomWidth: 1,
    fontSize: 25,
  },
  productsContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  product: {
    flex: 0.3,
    flexDirection: "row",
    width: "100%",
    marginVertical: 5,
    paddingVertical: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#0057B8",
  },
  image: {
    height: "100%",
    width: "40%",
  },
});

export default HomeScreen;
