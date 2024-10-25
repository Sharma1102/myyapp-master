import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RegistrationButton from './RegistrationButton'; // Assuming this is your custom button component
import HomeStyle from '../styles/HomeStyle';
import Button from './Button';

const Home = (props: {navigation: {navigate: (screen: string) => void}}) => {
  return (
    <View style={HomeStyle.container}>
      <Text style={HomeStyle.title}>Home Component</Text>

      <View style={HomeStyle.navbar}>
        <RegistrationButton
          title="Add User"
          onPress={() => props.navigation.navigate('AddUser')}
        />
        <TouchableOpacity
          style={HomeStyle.navButton}
          onPress={() => props.navigation.navigate('Data')}>
          <Text style={HomeStyle.navButtonText}>Data</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity 
          style={HomeStyle.navButton} 
          onPress={() => props.navigation.navigate('FileUpload')}>
          <Text style={HomeStyle.navButtonText}>Upload File</Text>
        </TouchableOpacity> */}
        <View style={HomeStyle.navButton}>
          <Button
            title="Upoad File"
            onPress={() => props.navigation.navigate('FileUpload')}
          />
        </View>
        <TouchableOpacity
          style={HomeStyle.navButton}
          onPress={() => props.navigation.navigate('FileDownload')}>
          <Text style={HomeStyle.navButtonText}>Dwonload File</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
