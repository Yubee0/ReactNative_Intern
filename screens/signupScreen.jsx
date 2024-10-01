import React, { useState } from 'react';
import { ImageBackground, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet, Alert, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../components/Api/userMutation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [roles, setRoles] = useState('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const handleSignup = async () => {
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await createUser({
        variables: {
          userInfo: {
            name,
            email,
            password,
            passwordConfirmation,
            organizationId: parseInt(organizationId),
          },
        },
      });

      if (data.createUser.errors && data.createUser.errors.length > 0) {
        setError(data.createUser.errors.join(', '));
      } else {
        Alert.alert('Signup Successful', 'Please log in.');
        navigation.replace('Login');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed, please try again.');
    } finally {
      setLoading(false);
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
          <MaterialIcons name="person" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>

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

        <View style={styles.inputWrapper}>
          <MaterialIcons name="lock-outline" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="business" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Organization ID"
            value={organizationId}
            onChangeText={setOrganizationId}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="work" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Role"
            value={roles}
            onChangeText={setRoles}
            placeholderTextColor="#999"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.customButton} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
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
  loginText: {
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

export default SignupScreen;
