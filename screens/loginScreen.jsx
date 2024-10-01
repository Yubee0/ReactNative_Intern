import React, { useState } from 'react';
import { ImageBackground, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet, Alert, View } from 'react-native';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { USER_SESSION_MUTATION } from '../components/Api/userMutation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userSession] = useMutation(USER_SESSION_MUTATION);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await userSession({
        variables: {
          sessionInfo: { email, password },
        },
      });

      if (data.userSession.errors.length > 0) {
        setError(data.userSession.errors.join(', '));
      } else {
        await AsyncStorage.setItem('userToken', data.userSession.token);
        setLoading(false);
        Alert.alert('Login Successful', `Welcome, ${data.userSession.user.name}!`);
        navigation.replace('Tabs');
        console.log(data.userSession.token);
      }
    } catch (err) {
      setLoading(false);
      setError('Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fuel.png")}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.6)', 'transparent']}
        style={styles.overlay}
      />
      <View style={styles.container}>
        <Ionicons name="person-circle" size={100} color="#fff" style={styles.icon} />

        <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="lock" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>
          Don't have an account? Sign Up
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'rgba(245, 245, 245, 0.3)', 
    width: '100%',
    height: '100%',
    
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    border: 5,
    borderColor: '#fff',
  },
  input: {
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    
  },
  inputIcon: {
    marginRight: 10,
  },
  customButton: {
    backgroundColor: '#00ccdd',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14, 
    textAlign: 'center',
  },
  signupText: {
    marginTop: 20,
    color: '#000', 
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  icon: {
    marginBottom: 30,
  },
});

export default LoginScreen;
