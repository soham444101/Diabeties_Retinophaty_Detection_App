import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const EyeHospitalList = ({ hospitals }) => {
  return (
    <FlatList
      data={hospitals}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  address: {
    color: '#555',
  },
});

export default EyeHospitalList;
