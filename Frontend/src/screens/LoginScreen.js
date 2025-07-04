import React, { useState } from 'react';
import {
  View, TextInput, Button, StyleSheet, Alert,
  Text, TouchableOpacity, ActivityIndicator
} from 'react-native';
import api from '../services/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    mobile: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!credentials.mobile || !credentials.password) {
      return Alert.alert('Error', 'Please enter both mobile and password');
    }

    setLoading(true);
    try {
      const response = await api.post('/login', credentials);
      console.log("Responce Login", response);
      
      await AsyncStorage.setItem('token', response.data.access_token)
      await AsyncStorage.setItem('userProfile', JSON.stringify(response.data.user)); 
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error.response?.data?.error || error.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#e0f7fa', '#b2ebf2', '#4dd0e1']} style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Eye Disease Detection</Text>

        <TextInput
          placeholder="Mobile Number"
          value={credentials.mobile}
          onChangeText={(text) => setCredentials({ ...credentials, mobile: text })}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          secureTextEntry
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator size="small" color="#00796b" />
        ) : (
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.siginview}>
              <Text style={styles.sigintext}>Login</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 30,
    color: '#006064',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#4dd0e1',
    backgroundColor: '#ffffffcc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  link: {
    color: '#004d40',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
  siginview: {
    backgroundColor: '#00796b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  sigintext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
