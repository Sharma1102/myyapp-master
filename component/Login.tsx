import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import Welcome from './Welcome';
import LoginStyle from '../styles/LoginStyle';


type RootStackParamList = {
  Home: undefined;
  Registration: undefined;
};


interface LoginProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; password?: string }>({});

  const validateLogin = async () => {
    const newErrors: { name?: string; password?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!password) newErrors.password = 'Password is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const storedDataString = await AsyncStorage.getItem('userData');
        if (storedDataString) {
          const storedData = JSON.parse(storedDataString);
          const user = storedData.find(
            (user: { name: string; password: string }) =>
              user.name === name && user.password === password,
          );

          if (user) {
            Alert.alert('Login successful!');
            navigation.navigate('Home');
          } else {
            Alert.alert('Invalid credentials. Please try again.');
          }
        } else {
          Alert.alert('No user data found.');
        }
      } catch (error) {
        console.error('Error during login', error);
        Alert.alert('Failed to login.');
      }
    }
  };

  return (
    <View style={LoginStyle.container}>
      <ImageBackground
        source={require('../src/background.jpg')}
        style={LoginStyle.background}
        resizeMode="cover"
      >
        <Welcome />
        <View style={LoginStyle.innerContainer}>
          <TextInput
            style={LoginStyle.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={LoginStyle.error}>{errors.name}</Text>}

          <TextInput
            style={LoginStyle.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password && <Text style={LoginStyle.error}>{errors.password}</Text>}

          <TouchableOpacity style={LoginStyle.button} onPress={validateLogin}>
            <Text style={LoginStyle.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={LoginStyle.registerButton}
            onPress={() => navigation.navigate('Registration')}
          >
            <Text style={LoginStyle.registerButtonText}>Go to Registration</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
