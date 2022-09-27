import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/actions/handleAuth";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const WIDTH = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.authReducer.error);

  const login = () => {
    dispatch(userLogin(email, password));
    setEmail("");
    setPassword("");
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
        <Text style={styles.welcome}>Bentornato</Text>
        <TextInput
          placeholder="Inserisci email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholder="Inserisci password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        {error ? (
          <Text style={styles.errorMessage}>email o password sbagliata</Text>
        ) : null}
        <Button title=" Login " on onPress={login} />
        <Text style={styles.text}>Non sei ancora già registrato?</Text>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.textLink}>Vai alla registrazione</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: WIDTH,
    alignItems: "center",
  },
  welcome: {
    fontSize: 26,
    marginVertical: 30,
  },
  input: {
    width: "60%",
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  errorMessage: {
    fontSize: 20,
    color: "red",
    fontWeight: "500",
  },
  text: {
    marginTop: 15,
  },
  link: {
    marginTop: 5,
  },
  textLink: {
    color: "#0057B8",
  },
});

export default LoginScreen;
