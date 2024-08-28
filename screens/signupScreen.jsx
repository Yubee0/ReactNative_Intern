import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { saveCustomLoginData } from '../components/registration/customLoginData';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      await saveCustomLoginData(email, password);
      setLoading(false);

      Alert.alert('Signup Successful', JSON.stringify({ email, password }));

      navigation.replace('Login');
    } catch (err) {
      setLoading(false);
      setError('Signup failed');
      console.error('Signup error:', err);
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
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  signupText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});
