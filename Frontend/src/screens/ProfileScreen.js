import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        if (userProfile) {
          setUser(JSON.parse(userProfile)); // Parse and set user data
        } else {
          Alert.alert('Error', 'No user profile found.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user profile.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userProfile');
      navigation.navigate('Login'); // Redirect to Login screen
    } catch (error) {
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>User Profile</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>Name: {user.name}</Text>
            <Text style={styles.profileText}>Age: {user.age}</Text>
            <Text style={styles.profileText}>Email: {user.email}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading profile...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  profileText: { fontSize: 18, marginBottom: 10 },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
  loadingText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
