import React from 'react';
import { Text, View, ToastAndroid } from 'react-native';
import styles from "../../constants/styles";
import MyButton from "../../components/MyButton";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';

export default function settingSp({navigation}) {

  const logoutHandler = async () => {
    // const responseLogout = await  axios.post(`${BASE_API_URL}/api/logout`,  
    // {headers:{
    //   'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
    // }}
    // );
    //if (responseLogout.message){
      AsyncStorage.clear();
      //ToastAndroid.show('You logged out successfully', 2000);
      navigation.navigate('Login');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
        });
    //}
  }







   //logout
//    const logoutHandler = async() => {
  
//     await db.collection('users')
//         .doc(user.user_id.toString())
//         .update({
//             pushToken : null
//     }).then(async () => {
//       const responseLogout = await  axios.post(`${BASE_API_URL}/api/logout`,  
//       {headers:{
//         'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
//       }}
//       );

//     }).then( () => {
//         navigation.navigate("Login")
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//           });
//     })
// }

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