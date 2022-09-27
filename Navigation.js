import * as React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { fetchCartAmount } from "./store/actions/handleCart";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import ArticleScreen from "./screens/ArticleScreen";
import OrdersScreen from "./screens/OrderScreen";
import SingleOrderScreen from "./screens/SingleOrderScreen";
import LoaderScreen from "./screens/LoaderScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigation() {
  const productName = useSelector(
    (state) => state.productsReducer.singleProduct?.Name
  );
  const article = useSelector((state) => state.productsReducer.sectionName);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0057B8",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "ITALIA SHOP",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          title: productName,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 15,
          },
        }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          title: article.toUpperCase(),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 15,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function CartStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0057B8",
        },
      }}
    >
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "CARRELLO",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStackNavigation() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const userToken = useSelector((state) => state.authReducer.token);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem("userData");
      if (!data) {
        setLoading(false);
      }
      const myData = JSON.parse(data);
      setToken(myData.token);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0057B8",
        },
      }}
    >
      {loading ? (
        <Stack.Screen
          name="Loader"
          component={LoaderScreen}
          options={{
            title: "",
          }}
        />
      ) : token ? (
        <>
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "PROFILO",
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
          />
          <Stack.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
              title: "I TUOI ORDINI",
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
          />
          <Stack.Screen
            name="SingleOrder"
            component={SingleOrderScreen}
            options={{
              title: "IL TUO ORDINE",
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
              },
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStackNavigation}
          options={{
            headerTitle: "AUTENTICAZIONE",
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
          }}
        />
      )}
    </Stack.Navigator>
  );
}

function AuthStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function TabNavigation() {
  let cartAmount = useSelector((state) => state.cartReducer.cartAmount);
  const [userID, setUserID] = useState("");
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem("userData");
      if (!data) {
        setLoading(false);
      }
      const myData = JSON.parse(data);
      setUserID(myData.userID);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    dispatch(fetchCartAmount(userID));
  }, [userID]);

  const badge = cartAmount ? cartAmount : null;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "StackNavigation") {
            iconName = "home";
          } else if (route.name === "CartStackNavigation") {
            iconName = "shopping-cart";
          } else if (route.name === "ProfileStackNavigation") {
            iconName = "user";
          }
          return <FontAwesome name={iconName} size={32} color={color} />;
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#0057B8",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{ title: "" }}
        name="StackNavigation"
        component={StackNavigation}
      />
      <Tab.Screen
        options={{ title: "Carrello", tabBarBadge: badge }}
        name="CartStackNavigation"
        component={CartStackNavigation}
      />
      <Tab.Screen
        options={{ title: "Profilo" }}
        name="ProfileStackNavigation"
        component={ProfileStackNavigation}
      />
    </Tab.Navigator>
  );
}

function MainNavigation() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}

export default MainNavigation;
