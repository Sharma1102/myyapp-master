import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FileUpload from './FIleUpload'; // Ensure the FileUpload component is linked properly

const FileDwonload: React.FC = () => {
  const [fileURL, setFileURL] = useState<string>(''); // State to store the input file URL
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]); // State to hold uploaded files

  // Fetch uploaded files from AsyncStorage
  const fetchUploadedFiles = async () => {
    try {
      const storedFiles = await AsyncStorage.getItem('uploadedFiles');
      if (storedFiles) {
        setUploadedFiles(JSON.parse(storedFiles));
      } else {
        setUploadedFiles([]);
      }
    } catch (error) {
      console.error('Error fetching uploaded files: ', error);
    }
  };

  useEffect(() => {
    // Fetch uploaded files when component mounts
    fetchUploadedFiles();
  }, []);

  // Request for permission to access external storage on Android
  const checkPermission = async (): Promise<void> => {
    if (!fileURL) {
      Alert.alert('Please enter a file URL');
      return;
    }

    if (Platform.OS === 'ios') {
      downloadFile(); // For iOS, no permission is required
    } else {
      try {
        const platformVersion = Number(Platform.Version); // Ensure Platform.Version is a number
        // Check Android version to handle permissions correctly
        if (platformVersion >= 29) {
          // For Android 10 (API level 29) and above, use scoped storage
          downloadFile();
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'App needs access to your storage to download files',
              buttonPositive: 'OK', // Required field for newer versions of React Native
              buttonNegative: 'Cancel', // Optional but recommended
              buttonNeutral: 'Ask Me Later', // Optional
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage Permission Granted.');
            downloadFile();
          } else {
            Alert.alert('Storage Permission Not Granted');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Function to download the file
  const downloadFile = (): void => {
    let date = new Date();
    let file_URL = fileURL; // Use the input URL for download
    let ext = getExtension(file_URL);

    if (!ext) {
      Alert.alert('Error', 'Unable to determine file extension');
      return;
    }

    ext = '.' + ext; // Add '.' to the file extension

    const { config, fs } = RNFetchBlob;
    const FileDir = fs.dirs.DownloadDir; // Use DownloadDir for Android downloads

    const mimeType = getMimeType(ext); // Get MIME type based on the file extension
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          FileDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Downloading file...',
        mime: mimeType, // Set appropriate MIME type based on the file
        mediaScannable: true, // Make sure it shows up in the file manager/gallery
      },
    };

    config(options)
      .fetch('GET', file_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        Alert.alert('File Downloaded Successfully.');
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error downloading file');
      });
  };

  // Function to extract file extension
  const getExtension = (filename: string): string | null => {
    const match = /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : null;
    return match ? match[0] : null; // Return the first element of the match array or null
  };

  // Function to determine MIME type based on file extension
  const getMimeType = (ext: string): string => {
    switch (ext) {
      case '.pdf':
        return 'application/pdf';
      case '.doc':
      case '.docx':
        return 'application/msword';
      case '.xls':
      case '.xlsx':
        return 'application/vnd.ms-excel';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.mp4':
        return 'video/mp4';
      case '.mp3':
        return 'audio/mpeg';
      default:
        return 'application/octet-stream'; // Default for unknown file types
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          React Native File Download Example
        </Text>
        {/* Text input for URL */}
        <TextInput
          style={styles.input}
          placeholder="Enter file URL"
          value={fileURL}
          onChangeText={setFileURL} // Update the state when text changes
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={checkPermission}>
        <Text style={styles.text}>Download File</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 20, marginVertical: 20 }}>Uploaded Files:</Text>
      <ScrollView style={{ marginBottom: 20 }}>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <Text>{file.name}</Text>
              <TouchableOpacity
                style={styles.buttonSmall}
                onPress={() => {
                  // Logic to download or open file URL
                  Alert.alert('File URL', file.url);
                }}
              >
                <Text style={styles.text}>View File</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No uploaded files available</Text>
        )}
      </ScrollView>

      
    </View>
  );
};

export default FileDwonload;

const styles = StyleSheet.create({
  container: {
    paddingTop:150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'orange',
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  fileItem: {
    marginVertical: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  buttonSmall: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
});
