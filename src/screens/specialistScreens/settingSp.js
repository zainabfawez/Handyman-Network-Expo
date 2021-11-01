import React from 'react';
import { Text, View } from 'react-native';
import styles from "../../constants/styles";
import MyButton from "../../components/MyButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

 

export default function settingSp({navigation}) {

  const logout = async() => {
    AsyncStorage.clear();
    // api call to set the expo tokento null
    // api call to logout and navigate in the .then
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
          onPressFunction={() => logout()}
        />
        </View>
    );
  }