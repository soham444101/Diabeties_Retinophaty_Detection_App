import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const diseases = [
    { name: 'Diabetic Retinopathy', key: 'diabetic-retinopathy' },
  
  ];

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const goToDiseaseInfo = () => {
    navigation.navigate('Diabetic_Retinopathy'); 
  };


  

  return (
    <LinearGradient 
      colors={['#e0f7fa', '#b2ebf2', '#4dd0e1']} 
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Eye Disease Detection</Text>
        <TouchableOpacity onPress={goToProfile}>
          <Text style={styles.headerButton}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.headerButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {diseases.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            onPress={() => goToDiseaseInfo()}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffffcc', // From login input background
    borderRadius: 10,
    padding: 5,
  },
  headerButton: {
    fontSize: 16,
    color: '#00796b', // Primary button color from login
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#006064', // Login title color
    textAlign: 'center',
  },
  cardContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffffcc', // Semi-transparent white from login inputs
    borderColor: '#4dd0e1', // Input border color from login
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#004d40', // Dark text color from login
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    color: '#006064', // Matching title color
    fontWeight: '500',
  },
});

export default HomeScreen;