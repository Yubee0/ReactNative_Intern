import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_MUTATION } from '../components/Api/mutations';
import { gql } from '@apollo/client';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const response = await login({ variables: { email, password } });

      if (response?.data?.login?.errors?.length > 0) {
        console.log("Errors:", response.data.login.errors);
      } else if (response?.data?.login?.message) {
        console.log("Message:", response.data.login.message);
        await AsyncStorage.setItem('userToken', response.data.login.token);
        navigation.replace('MyTabs', {
          userId: response.data.login.user.id,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
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
        <Button title="Login" onPress={handleLogin} />
      )}
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      {data && data.login.errors && (
        <Text style={styles.errorText}>Errors: {data.login.errors.join(", ")}</Text>
      )}
      {data && data.login.message && (
        <Text style={styles.successText}>{data.login.message}</Text>
      )}
      <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign Up
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
