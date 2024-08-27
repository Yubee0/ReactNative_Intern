import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from "../screens/SettingScreen";

const Stack = createStackNavigator();

function SettingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="settings" component={SettingScreen}
          options={{ headerShown: false }
        }
          />
    </Stack.Navigator>
  );
}

export default SettingNavigator;