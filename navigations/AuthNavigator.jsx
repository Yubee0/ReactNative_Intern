import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/loginScreen";
import SignupScreen from "../screens/signupScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}
          options={{ headerShown: false }
        }
          />
          <Stack.Screen name="Signup" component={SignupScreen}
          options={{ headerShown: false }
        }
          />
    </Stack.Navigator>
  );
}

export default AuthNavigator;