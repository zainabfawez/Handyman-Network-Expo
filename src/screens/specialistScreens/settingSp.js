import React, { useEffect, useState } from 'react';
import { Text, View, ToastAndroid, Image, TouchableOpacity } from 'react-native';
import styles from "../../constants/styles";
import MyButton from "../../components/MyButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_API_URL from '../../services/BaseUrl';
import * as ImagePicker from 'expo-image-picker';
import {colors} from "../../constants/palette";

export default function settingSp({navigation}) {

  const [image, setImage] = useState(null);
  const [str, setStr] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      setStr(result.base64);
      setImage(result.uri); 
    }
  };

  const uploadPhoto = async () => {
    try {
      const responsePhoto = await  axios.post(`${BASE_API_URL}/api/add-profile-pic`, {
          "image" :str
        },
        {headers:{
          'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
          }}
      );
      await AsyncStorage.setItem('profilePic', responsePhoto.data);
    } catch(err) {
      console.log(err); 
    }
  }
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const logout = async() => {
    AsyncStorage.clear();
    ToastAndroid.show('You logged out successfully', 2000);
    navigation.navigate('Login');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
      });
  }

    return (
      <View style={styles.container}>

        <Text>setting Sp screen</Text>

        <View style ={[styles.row, {justifyContent: "space-between"}]}>
            <Text style={{fontSize: 15}}> Add Profile Picture</Text>
            <TouchableOpacity onPress={pickImage}>
             <Text>choose pic</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress = {uploadPhoto} >
              <Text style={{color : colors.green}}>Upload Image</Text>
            </TouchableOpacity>
          </View>
          { image && <Image source={{ uri: image }} style={styles.ProfileImg}/>}

        <MyButton
          text="logout"
          onPressFunction={() => logout()}
        />
        </View>
    );
  }