import React, { useEffect, useState } from 'react';
import { Text, View, ToastAndroid, Image, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native';
import styles from "../../constants/styles";
import MyButtonDark from "../../components/MyButtonDark";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_API_URL from '../../services/BaseUrl';
import * as ImagePicker from 'expo-image-picker';
import {colors} from "../../constants/palette";
import Loading from '../../components/loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function settingSp({navigation}) {

  const [str, setStr] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [info, setInfo] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  

  const getProfilePic = async () => {
    try{
      const  responseImageSource = await  axios.get(`${BASE_API_URL}/api/get-profile-pic?specialist_id=${ await AsyncStorage.getItem('user_id')}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }}); 
      if (responseImageSource.data.profile_picture_url == "nothing"){
        setImageSource('../../../assets/profilePic.png')
      }else{
        setImageSource(responseImageSource.data.profile_picture_url);  
      }
    }catch(error){
      console.log(error);
    }
  }

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
        }});
      getProfilePic();
      await AsyncStorage.setItem('profilePic', responsePhoto.data);
    } catch(error) {
      console.log(error); 
    }
  }


  const getUser = async () => {
    try{
      const responseInfo = await  axios.get(`${BASE_API_URL}/api/user-profile`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      setInfo(responseInfo.data); 
    }catch(error){
      console.log(error);
    } 
  }

  const editChanges = async () => {
    try{
      const responseEdit = await  axios.post(`${BASE_API_URL}/api/edit-info`,  
      {
        "first_name" : firstName,
        "last_name" : lastName,
        "email" : email,
      },
      {headers:{
        'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
      }});
    }catch(error){
      console.log(error);
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
    getProfilePic();
    getUser();
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

  if(!(imageSource && info)){
    return(<Loading/>);
  }else{

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/Background.jpeg')} resizeMode="cover" style={style.image}>
        <View style={{flexDirection:'row'}}>
          <Image
              style={[styles.ProfileImg,{marginRight:1}]} 
              source={{uri: `${BASE_API_URL}${imageSource}`}}
          />
          <Icon 
            name="image-edit-outline" 
            size={25} 
            color={colors.link} 
            style={{marginTop: 110}} 
            onPress = {pickImage}
          />
          <View style={{margin:60}}>
            <TouchableOpacity onPress={uploadPhoto}>
              <AntDesign name="upload" size={30}  color={colors.link}   />
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.inputBox}>
            <Text style={style.inputLabel}>First Name</Text>
            <TextInput
              value = {info.first_name}
              style={style.input}
              placeholder={info.first_name}
              placeholderTextColor= {colors.text}
              onChangeText={(firstName) => setFirstName(firstName)}
            />
        </View>
        <View style={styles.HorizontalLine}></View>

        <View style={style.inputBox}>
            <Text style={style.inputLabel}>Last Name</Text>
            <TextInput
              value = {info.last_name}
              style={style.input}
              placeholder={info.last_name}
              placeholderTextColor= {colors.text}
              onChangeText={(lastName) => setLastName(lastName)}
            />
        </View>
        <View style={styles.HorizontalLine}></View>

        <View style={style.inputBox}>
            <Text style={style.inputLabel}>E-mail</Text>
            <TextInput
              value = {info.email}
              style={style.input}
              keyboardType='email-address'
              textContentType='emailAddress'
              placeholder={info.email}
              placeholderTextColor= {colors.text}
              onChangeText={(email) => setEmail(email)}
            />
        </View>
        <View style={styles.HorizontalLine}></View>

        <MyButtonDark 
          text =" Edit Changes"
          onPressFunction = {editChanges}
        />
         
       
          <TouchableOpacity onPress = {logout}>
            <View style={{flexDirection: 'row', marginTop:120}}>
              <Icon name="logout" size={40} color={colors.primary_dark}  />
              <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.primary_dark, marginTop:8}}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
      
          </ImageBackground>
        </View>
    );
  }
}

const style = StyleSheet.create({

  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

});

