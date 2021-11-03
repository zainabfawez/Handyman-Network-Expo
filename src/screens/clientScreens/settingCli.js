import React from 'react';
import { Text, View, ToastAndroid, Image } from 'react-native';
import styles from "../../constants/styles";
import MyButton from "../../components/MyButton";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';

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
        <Text>setting Sp screen</Text>

      
      
          
        <MyButton
          text="logout"
          onPressFunction={() => logoutHandler()}
        />
        </View>
    );
  }