import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import profile from "./screens/profileScreen";
import CheckIn from "./screens/CheckInScreen";
import Blog from "./screens/blogScreen";
import LoginScreen from "./screens/loginScreen";
import SignupScreen from "./screens/signupScreen";

import {
  AuthNavigator,
  HomeNavigator,
  SettingNavigator,
  TabsNavigator,
} from "./navigations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="homeTab"
//         component={HomeNavigator}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" color={color} size={size} />
//           ),
//           headerTitleAlign: "center",
//           title: "HOME",
//           headerRight: () => (
//             <TouchableOpacity style={styles.button} onPress={handleLogout}>
//               <Text style={styles.buttonText}>LogOut</Text>
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="SETTINGS"
//         component={SettingNavigator}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="settings" color={color} size={size} />
//           ),
//           headerTitleAlign: "center",
//           headerStyle: {
//             backgroundColor: "#e0e0e0",
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Antonio",
    fontWeight: "bold",
  },
});
