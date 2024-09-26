import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; 

import profile from "./screens/profileScreen";
import CheckIn from "./screens/CheckInScreen";
import Blog from "./screens/blogScreen";
import OrderScreen from "./screens/orderScreen";
import OrderListScreen from "./screens/orderList";
import driverScreen from "./screens/driverScreen"; 

import { AuthNavigator, TabsNavigator } from "./navigations";
import DriverScreen from "./screens/driverScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
            <Stack.Screen
              name="Tabs"
              component={TabsNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile"
              component={profile}
              options={{
                title: "PROFILE",
                headerStyle: {
                  backgroundColor: "#e0e0e0",
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontSize: 18,
                  fontFamily: "Antonio",
                  letterSpacing: 0.3,
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="check_in"
              component={CheckIn}
              options={{
                title: "Preferences",
                headerStyle: {
                  backgroundColor: "#e0e0e0",
                },
                headerTitleStyle: {
                  fontWeight: "600",
                  fontSize: 18,
                  fontFamily: "Antonio",
                  letterSpacing: 0.3,
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="blog"
              component={Blog}
              options={{
                title: "BLOG",
                headerStyle: {
                  backgroundColor: "#e0e0e0",
                },
                headerTitleStyle: {
                  fontWeight: "800",
                  fontSize: 18,
                  fontFamily: "Antonio",
                  letterSpacing: 0.3,
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="order"
              component={OrderScreen}
              options={{
                title: "Order",
                headerStyle: {
                  backgroundColor: "#e0e0e0",
                },
                headerTitleStyle: {
                  fontWeight: "800",
                  fontSize: 18,
                  fontFamily: "Antonio",
                  letterSpacing: 0.3,
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="orderlist"
              component={OrderListScreen}
              options={{
                title: "Order",
                headerStyle: {
                  backgroundColor: "#e0e0e0",
                },
                headerTitleStyle: {
                  fontWeight: "800",
                  fontSize: 18,
                  fontFamily: "Antonio",
                  letterSpacing: 0.3,
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="driver"
              component={ DriverScreen}
              options={{
                title: "Pending Order",
                headerStyle: {
                  backgroundColor: "#e0e0e0",
                },
                headerTitleStyle: {
                  fontWeight: "800",
                  fontSize: 18,
                  fontFamily: "Antonio",
                  letterSpacing: 0.3,
                },
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}
