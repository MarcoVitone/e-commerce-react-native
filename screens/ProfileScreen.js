import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/handleAuth";
import { fetchOrders } from "../store/actions/handleOrders";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const WIDTH = Dimensions.get("window").width;

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const myData = JSON.parse(data);
      setUserName(myData.userName);
      setUserID(myData.userID);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const clearData = () => {
    dispatch(logout());
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Ciao {userName}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("CartStackNavigation", { screen: "Cart" })
            }
          >
            <Text style={styles.buttonTitle}>Il tuo carrello</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch(fetchOrders(userID));
              navigation.navigate("Orders");
            }}
          >
            <Text style={styles.buttonTitle}>I tuoi ordini</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearData}>
            <Text style={styles.buttonTitle}>logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 50,
    marginBottom: 80,
  },
  buttonContainer: {
    alignItems: "center",
    width: "70%",
  },
  button: {
    width: "100%",
    backgroundColor: "#0057B8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 40,
  },
  buttonTitle: {
    fontSize: 26,
    paddingVertical: 10,
    color: "#fff",
  },
});

export default ProfileScreen;
