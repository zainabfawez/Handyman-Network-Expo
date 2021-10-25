import React from 'react';
import { Text, View } from 'react-native';
import styles from "../../constants/styles";
import MyButton from "../../components/MyButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

 const logout = async() => {
      AsyncStorage.clear();
      navigation.navigate('Login');
   
  }

export default function settingSp() {
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