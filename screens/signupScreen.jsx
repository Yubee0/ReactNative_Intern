import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGNUP_MUTATION } from '../components/Api/mutations';
import { gql } from '@apollo/client';


export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleSignup = async () => {
    try {
      const response = await signup({ variables: { email, password } });

      if (response?.data?.signup?.errors?.length > 0) {
        console.log("Errors:", response.data.signup.errors);
      } else if (response?.data?.signup?.message) {
        console.log("Message:", response.data.signup.message);
        await AsyncStorage.setItem('userToken', response.data.signup.token);
        navigation.replace('MyTabs', {
          userId: response.data.signup.user.id,
        });
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Sign Up" onPress={handleSignup} />
      )}
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      {data && data.signup.errors && (
        <Text style={styles.errorText}>Errors: {data.signup.errors.join(", ")}</Text>
      )}
      {data && data.signup.message && (
        <Text style={styles.successText}>{data.signup.message}</Text>
      )}
      <Text style={styles.signupText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginTop: 10,
    marginBottom: 10,
  },
  signupText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});
