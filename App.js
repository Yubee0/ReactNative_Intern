import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import profile from "./screens/profileScreen";
import CheckIn from "./screens/CheckInScreen";
import Blog from "./screens/blogScreen";
import LoginScreen from "./screens/loginScreen";
import SignupScreen from "./screens/signupScreen";

import { HomeNavigator, SettingNavigator } from "./navigations";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerTitleAlign: "center",
          title: "HOME",
        }}
      />
      <Tab.Screen
        name="SETTINGS"
        component={SettingNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#e0e0e0",
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>

        <Stack.Screen name="Login"
         component={LoginScreen}
          />
        <Stack.Screen name="Signup" 
        component={SignupScreen} 
        />
        <Stack.Screen
            name="MyTabs"
            component={MyTabs}
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
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
