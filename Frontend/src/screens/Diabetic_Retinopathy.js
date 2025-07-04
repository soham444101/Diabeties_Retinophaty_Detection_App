import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { makePredictionRequest } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Diabetic_Retinopathy = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [precaution, setPrecaution] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          setImageUri(response.assets[0].uri);
          setPrecaution(null);
        }
      }
    );
  };

  const predictDisease = async () => {
    if (!imageUri) {
      Alert.alert('No Image Selected', 'Please select a retina image first.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Sending image from URI:', imageUri);
      console.log('Sending image from URI:', token);
      if (!token) {
        Alert.alert('Session Expired', 'Please log in again.');
        return;
      }

      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      

      setLoading(true);
      const response = await makePredictionRequest(formData, token);
      setPrecaution(response);
    } catch (error) {
      Alert.alert('Prediction Failed', error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient 
      colors={['#e0f7fa', '#b2ebf2', '#4dd0e1']} 
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#006064" />
        </TouchableOpacity>
        <Text style={styles.title}>Diabetic Retinopathy Detection</Text>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Select Retina Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#00796b" style={styles.loader} />
      ) : (
        <TouchableOpacity
          style={[styles.button, !imageUri && styles.disabledButton]}
          onPress={predictDisease}
          disabled={!imageUri}
        >
          <Text style={styles.buttonText}>Predict Condition</Text>
        </TouchableOpacity>
      )}

      {precaution && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Prediction Level: {precaution.result}</Text>
          <Text style={styles.resultText}>Precaution: {precaution.precaution}</Text>
          <Text style={styles.resultText}>Confidence: {(precaution.confidence * 100).toFixed(2)}%</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    padding: 15,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#ffffffcc',
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006064',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    backgroundColor: '#00796b',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#b2ebf2',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16,
    fontWeight: '600' 
  },
  image: { 
    width: 300, 
    height: 300, 
    alignSelf: 'center', 
    marginVertical: 20, 
    borderRadius: 10,
    borderColor: '#4dd0e1',
    borderWidth: 2
  },
  loader: { 
    margin: 20 
  },
  resultContainer: { 
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffffcc',
    borderRadius: 8,
    borderColor: '#4dd0e1',
    borderWidth: 1
  },
  resultText: { 
    fontSize: 16, 
    marginBottom: 10,
    color: '#006064' 
  },
});

export default Diabetic_Retinopathy;