// import {
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ImageBackground,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {NavigationProp} from '@react-navigation/native';

// interface RegistrationProps {
//   navigation: NavigationProp<any>;
//   route: {
//     params: {
//       name?: string;
//       email?: string;
//       password?: string;
//       id?: number;
//     };
//   };
// }

// interface Errors {
//   name?: string;
//   email?: string;
//   password?: string;
// }

// const Registration: React.FC<RegistrationProps> = ({navigation, route}) => {
//   const {
//     name: initialName = '',
//     email: initialEmail = '',
//     password: initialPassword = '',
//     id,
//   } = route.params || {};

//   const [name, setName] = useState<string>(initialName);
//   const [email, setEmail] = useState<string>(initialEmail);
//   const [password, setPassword] = useState<string>(initialPassword);
//   const [errors, setErrors] = useState<Errors>({});
//   const [isFormValid, setIsFormValid] = useState<boolean>(false);

//   useEffect(() => {
//     validateForm();
//   }, [name, email, password]);

//   const validateForm = () => {
//     const newErrors: Errors = {};

//     if (!name.trim()) newErrors.name = 'Name is required.';
//     if (!email.trim()) newErrors.email = 'Email is required.';
//     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';
//     if (!password) newErrors.password = 'Password is required.';
//     else if (password.length < 6)
//       newErrors.password = 'Password must be at least 6 characters.';

//     setErrors(newErrors);
//     setIsFormValid(Object.keys(newErrors).length === 0);
//   };

//   const handleSubmit = async () => {
//     if (isFormValid) {
//       try {
//         const newUserData = {name, email, password, id: id || Date.now()};
//         const existingDataString = await AsyncStorage.getItem('userData');
//         let existingData = existingDataString
//           ? JSON.parse(existingDataString)
//           : [];

//         if (id) {
//           existingData = existingData.map((user: {id: number}) =>
//             user.id === id ? newUserData : user,
//           );
//         } else {
//           existingData.push(newUserData);
//         }

//         await AsyncStorage.setItem('userData', JSON.stringify(existingData));
//         Alert.alert('Data saved successfully!');
//         navigation.navigate('Login');
//       } catch (error) {
//         console.error('Error saving data', error);
//         Alert.alert('Failed to save data.');
//       }
//     } else {
//       console.log('Form has errors. Please correct them.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={require('../src/background3.jpg')}>
//         <Text style={styles.title}>Register User</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//         />
//         {errors.name && <Text style={styles.error}>{errors.name}</Text>}

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />
//         {errors.email && <Text style={styles.error}>{errors.email}</Text>}

//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         {errors.password && <Text style={styles.error}>{errors.password}</Text>}

//         <TouchableOpacity
//           style={styles.button}
//           disabled={!isFormValid}
//           onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Submit</Text>
//         </TouchableOpacity>
//         <View style={styles.backButtonContainer}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.backButtonText}>Back</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {padding: 40, backgroundColor: '#7d7d7d'},
//   input: {
//     height: 60,
//     borderColor: '#000000',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     fontSize: 16,
//     backgroundColor: '#d9d9d9',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#ffffff',
//   },
//   button: {
//     backgroundColor: '#555555',
//     borderColor: '#ffffff',
//     borderRadius: 5,
//     paddingVertical: 10,
//     alignItems: 'center',
//     marginTop: 16,
//     marginBottom: 12,
//   },
//   buttonText: {color: '#ffffff', fontWeight: 'bold', fontSize: 16},
//   error: {color: 'red', fontSize: 14, marginBottom: 12},
//   backButtonContainer: {
//     marginTop: 20,
//   },
//   backButton: {
//     backgroundColor: '#777777',
//     borderRadius: 5,
//     padding: 10,
//   },
//   backButtonText: {
//     color: '#ffffff',
//     textAlign: 'center',
//   },
// });

// export default Registration;




import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import RegistrationStyle from '../styles/RegistrationStyle';

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

const Registration: React.FC<RegistrationProps> = ({ navigation, route }) => {
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
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const newUserData = { name, email, password, id: id || Date.now() };
        const existingDataString = await AsyncStorage.getItem('userData');
        let existingData = existingDataString ? JSON.parse(existingDataString) : [];

        if (id) {
          existingData = existingData.map((user: { id: number }) =>
            user.id === id ? newUserData : user,
          );
        } else {
          existingData.push(newUserData);
        }

        await AsyncStorage.setItem('userData', JSON.stringify(existingData));
        Alert.alert('Data saved successfully!');
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error saving data', error);
        Alert.alert('Failed to save data.');
      }
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <View style={RegistrationStyle.container}>
      <ImageBackground
        source={require('../src/background5.jpg')}
        style={RegistrationStyle.background}
        resizeMode="cover"
      >
        <Text style={RegistrationStyle.title}>Register User</Text>
        <View style={RegistrationStyle.formContainer}>
          <TextInput
            style={RegistrationStyle.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#aaaaaa"
          />
          {errors.name && <Text style={RegistrationStyle.error}>{errors.name}</Text>}

          <TextInput
            style={RegistrationStyle.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#aaaaaa"
          />
          {errors.email && <Text style={RegistrationStyle.error}>{errors.email}</Text>}

          <TextInput
            style={RegistrationStyle.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#aaaaaa"
          />
          {errors.password && <Text style={RegistrationStyle.error}>{errors.password}</Text>}

          <TouchableOpacity
            style={[RegistrationStyle.button, ]}
            disabled={!isFormValid}
            onPress={handleSubmit}
          >
            <Text style={RegistrationStyle.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={RegistrationStyle.backButtonContainer}>
          <TouchableOpacity
            style={RegistrationStyle.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={RegistrationStyle.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};


export default Registration;
