import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, ScrollView,  } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FileUpload: React.FC = () => {
  const [fileResponses, setFileResponses] = useState<DocumentPickerResponse[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string; type: string }[]>([]);

  const handleDocumentSelection = async () => {
    try {
      
      const results: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true, 
      });
      console.log('Selected files:', results); 
      setFileResponses(results); 
    } catch (err: unknown) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled', 'File selection was canceled');
      } else {
        const errorMessage = (err as Error).message || 'An unknown error occurred';
        Alert.alert('Error', errorMessage);
        console.error('Document picker error: ', err);
      }
    }
  };

  
  const uploadFiles = async () => {
    if (fileResponses.length === 0) {
      Alert.alert('Please select at least one file');
      return;
    }

    try {
      
      const uploadedFileData = fileResponses.map((fileResponse) => ({
        name: fileResponse.name,
        url: fileResponse.uri, // Use local URI for demonstration
        type: fileResponse.type || 'unknown', // Include file type or set as 'unknown'
      }));

      // Store files in local storage
      await AsyncStorage.setItem('uploadedFiles', JSON.stringify(uploadedFileData));
      Alert.alert('Files uploaded successfully');

      // Fetch uploaded files after saving
      fetchUploadedFiles();
    } catch (error) {
      console.error('Upload error: ', error);
      Alert.alert('Upload error', 'Something went wrong');
    }
  };

  // Retrieve uploaded files from AsyncStorage
  const fetchUploadedFiles = async () => {
    const storedFiles = await AsyncStorage.getItem('uploadedFiles');
    if (storedFiles) {
      setUploadedFiles(JSON.parse(storedFiles));
    } else {
      Alert.alert('No uploaded files found');
    }
  };

  // Open the file using its URI
  // const downloadFile = (url: string) => {
  //   Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  // };

  useEffect(() => {
    // Fetch files from local storage when the component mounts
    fetchUploadedFiles();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button title="Select Files" onPress={handleDocumentSelection} />
      <ScrollView>
        {fileResponses.length > 0 ? (
          fileResponses.map((fileResponse, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text>File: {fileResponse.name}</Text>
              <Text>Type: {fileResponse.type || 'unknown'}</Text>
            </View>
          ))
        ) : (
          <Text>No files selected</Text>
        )}
      </ScrollView>
      <Button title="Upload Files" onPress={uploadFiles} disabled={fileResponses.length === 0} />
      
      {/* Display uploaded files and their download links */}
      <ScrollView style={{ marginTop: 20 }}>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text>File Name: {file.name}</Text>
              <Text>File Type: {file.type}</Text>
              {/* <Button title="Download" onPress={() => downloadFile(file.url)} /> */}
            </View>
          ))
        ) : (
          <Text>No uploaded files available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FileUpload;
