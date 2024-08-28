import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { getCustomLoginData } from '../components/registration/customLoginData';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const loginData = await getCustomLoginData();

      if (loginData && loginData.email === email && loginData.password === password) {
        await AsyncStorage.setItem('userToken', 'some-token');
        setLoading(false);
        Alert.alert('Login Successful', JSON.stringify({ email, password }));
        navigation.replace('Tabs'); 
      } else {
        setLoading(false);
        setError('Invalid email or password');
      }
    } catch (err) {
      setLoading(false);
      setError('Login failed');
      console.error('Login error:', err);
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
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  signupText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});
