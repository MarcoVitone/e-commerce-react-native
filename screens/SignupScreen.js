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
import { useDispatch } from "react-redux";
import { uploadUser } from "../store/actions/handleAuth";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const WIDTH = Dimensions.get("window").width;

const SignupScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const signup = () => {
    dispatch(uploadUser(userName, email, password));
    setUserName("");
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
        <Text style={styles.welcome}>Benvenuto</Text>
        <TextInput
          placeholder="Inserisci user name"
          style={styles.input}
          value={userName}
          onChangeText={(value) => setUserName(value)}
        />
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
        <Button title=" Registrati " onPress={signup} />
        <Text style={styles.text}>Sei già registrato?</Text>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textLink}>Vai al login</Text>
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

export default SignupScreen;
