import  React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";
import {colors, shadows} from "../../constants/palette";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';


export default function login({ navigation }) {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [bad_credentials, setidBadCredentials] = useState(null);

  const pressLogin = async () => {
    try {
      const res = await  axios.post(`${BASE_API_URL}/api/login`, {
        "email" : email,
        "password":password
      });
      await AsyncStorage.setItem('token', res.data['access_token']);
      await AsyncStorage.setItem('fullName', res.data['user']['first_name'] + ' ' + res.data['user']['last_name']);
      await AsyncStorage.setItem('longitude', res.data['user']['longitude']);
      await AsyncStorage.setItem('latitude', res.data['user']['latitude']);
      await AsyncStorage.setItem('role', res.data['user']['is_specialist']?"specialist":"client");
      setidBadCredentials(null);
      if (res.data['user']['is_specialist']){
        //request api get profile
        //if empty got to add profile else :
        navigation.navigate('BottomTabSp');
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabSp' }],
          });
      }else{
        navigation.navigate('BottomTabCli');
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabCli' }],
          });
      }   
    } catch(err) {
      setidBadCredentials(1);
      console.log(err);
    }
  };

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={style.bigCircle}></View>
        <View style={style.smallCircle}></View>
        <View style={style.centerizedView}>
          <View style={style.authBox}>
            <View style={style.logoBox}>
              <Icon
                color='#fff'
                name='tools'
                size={50}
              />
            </View>
            <Text style={style.loginTitleText}>Login</Text>
            <View style={style.hr}></View>
            <Text>{bad_credentials && "Invalid Credentials"}</Text>
            <View style={style.inputBox}>
              <Text style={style.inputLabel}>Email</Text>
              <TextInput
                style={style.input}
                //autoCapitalize={false}
                keyboardType='email-address'
                textContentType='emailAddress'
                placeholder='example@mail.com'
                placeholderTextColor= {colors.disabled_text}
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={style.inputBox}>
              <Text style={style.inputLabel}>Password</Text>
              <TextInput
                style={style.input}
                //autoCapitalize={false}
                secureTextEntry={true}
                textContentType='password'
                placeholder='Must have at  least 6 characters'
                placeholderTextColor= {colors.disabled_text}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity style={style.loginButton}  onPress = {pressLogin} >
              <Text style={style.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Register'); }}>
              <Text style={style.registerText}>
                Don't have an account? Register Now
              </Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
    }
    
    const style = StyleSheet.create({
    
      bigCircle: {
        width: Dimensions.get('window').height * 0.7,
        height: Dimensions.get('window').height * 0.7,
        backgroundColor: colors.primary,
        borderRadius: 1000,
        position: 'absolute',
        right: Dimensions.get('window').width * 0.25,
        top: -50,
      },
      smallCircle: {
        width: Dimensions.get('window').height * 0.4,
        height: Dimensions.get('window').height * 0.4,
        backgroundColor: colors.primary_dark,
        borderRadius: 1000,
        position: 'absolute',
        bottom: Dimensions.get('window').width * -0.2,
        right: Dimensions.get('window').width * -0.3,
      },
      centerizedView: {
        width: '100%',
        top: '15%',
      },
      authBox: {
        width: '80%',
        backgroundColor: '#fafafa',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      logoBox: {
        width: 100,
        height: 100,
        backgroundColor: colors.primary_dark,
        borderRadius: 1000,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: -50,
        marginBottom: -50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      },
      loginTitleText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
      },
      hr: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#444',
        marginTop: 6,
      },
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
      loginButton: {
        backgroundColor: colors.primary_dark,
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
      },
      loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
      registerText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
      },
  
    });