import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Data: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userData, setUserData] = useState<{ name: string; email: string; password: string; id: number }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('userData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Error loading data', error);
        Alert.alert('Failed to load data.');
      }
    };
    loadData();
  }, []);

  const handleEdit = (item: { name: string; email: string; password: string; id: number }) => {
    navigation.navigate('Registration', {
      name: item.name,
      email: item.email,
      password: item.password,
      id: item.id,
    });
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            const updatedData = userData.filter(user => user.id !== id);
            setUserData(updatedData);
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
            Alert.alert('Data deleted successfully!');
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: { name: string; email: string; password: string; id: number } }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Name: {item.name}</Text>
      <Text style={styles.itemText}>Email: {item.email}</Text>
      <Text style={styles.itemText}>Password: {item.password}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users</Text>
      {userData.length > 0 ? (
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()} // Fallback for undefined id
        />
      ) : (
        <Text>No data available.</Text>
      )}
      <View>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#7d7d7d' }, 
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#555555', 
    borderRadius: 5,
  },
  itemText: {
    color: '#ffffff', 
  },
  backButton: {
    padding: 10,
    backgroundColor: '#777777', 
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: '#ffffff', 
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Data;
