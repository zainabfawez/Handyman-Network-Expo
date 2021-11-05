import React from 'react';
import { Text, View, ToastAndroid, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import styles from "../../constants/styles";
import MyButton from "../../components/MyButton";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/palette';

export default function settingSp({navigation}) {

  const logoutHandler = async () => {
   
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
        <ImageBackground source={require('../../../assets/Background.jpeg')} resizeMode="cover" style={style.image}>
        
          <TouchableOpacity onPress = {logoutHandler}>
            <View style={{flexDirection: 'row', marginTop:550}}>
              <Icon name="logout" size={40} color={colors.primary_dark}  />
              <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.primary_dark, marginTop:8}}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
       
        </ImageBackground>
        </View>
    );
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
