import React from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';

const AuthForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  loading, 
  error, 
  onSubmit, 
  buttonTitle 
}) => (
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
      <Button title={buttonTitle} onPress={onSubmit} />
    )}
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AuthForm;
