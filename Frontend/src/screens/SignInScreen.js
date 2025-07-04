import React, { useState } from 'react';
import {
  View, TextInput, Alert, Text, ActivityIndicator, TouchableOpacity, StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../services/api.js';

const SignupScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    mobile: '',
    name: '',
    gender: '',
    age: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!user.mobile || !user.name || !user.gender || !user.age || !user.password) {
      return Alert.alert('Error', 'All fields are required');
    }

    setLoading(true);
    const payload = {
      ...user,
      age: parseInt(user.age, 10) || 0
    };

    try {
      const response = await api.post('/register', payload);
      Alert.alert('Success', 'Registration successful. Please login.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error.response?.data?.message || 'Registration error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#e0f7fa', '#80deea', '#26c6da']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        {['mobile', 'name', 'age', 'password'].map((field) => (
          <TextInput
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={user[field]}
            onChangeText={(text) => setUser({ ...user, [field]: text })}
            secureTextEntry={field === 'password'}
            keyboardType={field === 'mobile' || field === 'age' ? 'numeric' : 'default'}
            style={styles.input}
            placeholderTextColor="#666"
          />
        ))}

        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {['Male', 'Female', 'Other'].map((option) => (
            <View key={option} style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => setUser({ ...user, gender: option })}
              >
                {user.gender === option && <View style={styles.selectedRb} />}
              </TouchableOpacity>
              <Text style={styles.radioText}>{option}</Text>
            </View>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <TouchableOpacity onPress={handleSignup}>
            <View style={styles.siginview}>
              <Text style={styles.sigintext}>Signup</Text>
            </View>
          </TouchableOpacity>
        )}

        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Already have an account? Login
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#003c5c',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#ffffffcc',
    color: '#000'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#003c5c',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0077b6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0077b6',
  },
  radioText: {
    fontSize: 14,
    color: '#003c5c',
  },
  siginview: {
    backgroundColor: '#0077b6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  sigintext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#003c5c',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});

export default SignupScreen;
