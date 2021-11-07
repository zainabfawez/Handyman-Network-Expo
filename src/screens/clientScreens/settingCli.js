import React, {useEffect, useState} from 'react';
import { Text, View, ToastAndroid, ImageBackground, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import styles from "../../constants/styles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/palette';
import Loading from '../../components/loading';
import MyButtonDark from '../../components/MyButtonDark';

export default function settingCli({navigation}) {

  const [info, setInfo] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

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

  const logoutHandler = async () => {
      AsyncStorage.clear();
      ToastAndroid.show('You logged out successfully', 2000);
      navigation.navigate('Login');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
        });
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!info){
    return(<Loading/>);
  }else{
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/Background.jpeg')} resizeMode="cover" style={style.image}>
        
          <View style={{marginVertical:10}}>
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

            <TouchableOpacity onPress = {logoutHandler}>
              <View style={{flexDirection: 'row', marginTop:250}}>
                <Icon name="logout" size={40} color={colors.primary_dark}  />
                <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.primary_dark, marginTop:8}}>LOGOUT</Text>
              </View>
            </TouchableOpacity>
          </View>
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
