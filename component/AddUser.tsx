import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';
import AddUserStyle from '../styles/AddUserStyle';

interface RegistrationProps {
  navigation: NavigationProp<any>;
  route: {
    params: {
      name?: string;
      email?: string;
      password?: string;
      id?: number;
    };
  };
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

const AddUser: React.FC<RegistrationProps> = ({navigation, route}) => {
  const {
    name: initialName = '',
    email: initialEmail = '',
    password: initialPassword = '',
    id,
  } = route.params || {};

  const [name, setName] = useState<string>(initialName);
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>(initialPassword);
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    validateForm();
  }, [name, email, password]);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const newUserData = {name, email, password, id: id || Date.now()};
        const existingDataString = await AsyncStorage.getItem('userData');
        let existingData = existingDataString
          ? JSON.parse(existingDataString)
          : [];

        if (id) {
          existingData = existingData.map((user: {id: number}) =>
            user.id === id ? newUserData : user,
          );
        } else {
          existingData.push(newUserData);
        }

        await AsyncStorage.setItem('userData', JSON.stringify(existingData));
        Alert.alert('Data saved successfully!');
        navigation.navigate('Data');
      } catch (error) {
        console.error('Error saving data', error);
        Alert.alert('Failed to save data.');
      }
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <View style={AddUserStyle.container}>
      <ImageBackground source={require('../src/background5.jpg')}
      style={AddUserStyle.background}
      resizeMode="cover">
        <Text style={AddUserStyle.title}>Register User</Text>
        <TextInput
          style={AddUserStyle.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={AddUserStyle.error}>{errors.name}</Text>}

        <TextInput
          style={AddUserStyle.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={AddUserStyle.error}>{errors.email}</Text>}

        <TextInput
          style={AddUserStyle.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && (
          <Text style={AddUserStyle.error}>{errors.password}</Text>
        )}

        <TouchableOpacity
          style={AddUserStyle.button}
          disabled={!isFormValid}
          onPress={handleSubmit}>
          <Text style={AddUserStyle.buttonText}>Submit</Text>
        </TouchableOpacity>
        <View style={AddUserStyle.backButtonContainer}>
          <TouchableOpacity
            style={AddUserStyle.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={AddUserStyle.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AddUser;
