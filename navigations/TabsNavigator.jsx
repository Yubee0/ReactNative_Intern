import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeNavigator from "./HomeNavigator";
import SettingNavigator from "./SettingNavigator";

const Stack = createStackNavigator();

function TabsNavigator() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  async function handleLogout() {
    // const customLoginData = await AsyncStorage.getItem("customLoginData");
    // if (customLoginData) {
    //   await AsyncStorage.removeItem("customLoginData");
    // }
    navigation.navigate("AuthNavigator");
  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="homeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{ color: "black" }}>LogOut</Text>
            </TouchableOpacity>
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

export default TabsNavigator;
