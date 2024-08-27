import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} 
      options={{
        headerShown: false,
      }
      }/>
    </Stack.Navigator>
  );
}

export default HomeNavigator;