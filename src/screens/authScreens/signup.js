import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, CheckBox, View, TextInput, Image, SafeAreaView, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, } from 'react-native';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";
import {colors, shadows} from "../../constants/palette";
import BASE_API_URL from '../../services/BaseUrl';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  {registerForPushNotificationsAsync} from '../specialistScreens/notifications'
import * as Location from 'expo-location';


export default function signup({ navigation }) {

  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCPassword] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [is_specialist, setIsSpecialist] = useState(0);
  const [pushNotificationToken, setPushNotificationToken] = useState(null);
  const [bad_credentials, setidBadCredentials] = useState(null);

   //for getting th current location
  const [location, setLocation] = useState(null);
 
  const onGetLocationPress = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      await Location.getCurrentPositionAsync({})
      .then((location)=>{
        setLocation(location)
        Alert.alert("You're location is sent")});
     ;
    })();
  }
  
  const pressRegister = async() => {
    if(firstName && lastName && email && password && cpassword && location){
      if(isSelected){
        setIsSpecialist(1);
      }else{
        setIsSpecialist(0)
      }
      await registerForPushNotificationsAsync().then(async (token)=> {
        setPushNotificationToken(token)

        try {

          const res = await axios.post(`${BASE_API_URL}/api/register`, {
            "first_name" : firstName,
            "last_name" : lastName,
            "email" : email,
            "password" :password,
            "password_confirmation": cpassword,
            "is_specialist": isSelected,
            "longitude" : location.coords.longitude,
            "latitude" : location.coords.latitude,
            "expoPushNotificationToken" : token,
            
          }).then((response)=> {
              if(response.data['user']['is_specialist']){
                navigation.navigate('AddProfile');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'AddProfile' }],
                  });
              }else{
                navigation.navigate('BottomTabCli');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'BottomTabCli' }],
                  });
              }  
          }) 
        } catch(err) {
          setidBadCredentials("Check your informations");
        }
      })
      
    }else{
      setidBadCredentials("Please fill every required field!");
      
    }
  };

  return (
   
    <ScrollView>

   
    <View style={styles.container}>
      <View style={style.bigCircle}></View>
      <View style={style.smallCircle}></View>
      <View style={style.centerizedView}>
        <View style={style.authBox}>
          <View style={style.logoBox}>
            <Icon
              color='#fff'
              name='tools'
              size={35}
            />
          </View>
          <Text style={style.loginTitleText}>Register</Text>
          <View style={style.hr}></View>
          <ScrollView>
          <View style={style.inputBox}>
            <Text style={style.inputLabel}>First Name</Text>
            <TextInput
              style={style.input}
              placeholder='First Name'
              placeholderTextColor= {colors.disabled_text}
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>

          
          <View style={style.inputBox}>
            <Text style={style.inputLabel}>Last name</Text>
            <TextInput
              style={style.input}
              placeholder='Last Name'
              placeholderTextColor= {colors.disabled_text}
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          
          <View style={style.inputBox}>
            <Text style={style.inputLabel}>Email</Text>
            <TextInput
              style={style.input}
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
              secureTextEntry={true}
              textContentType='password'
              placeholder='Must have at  least 6 characters'
              placeholderTextColor= {colors.disabled_text}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View style={style.inputBox}>
            <Text style={style.inputLabel}>Confirm Password</Text>
            <TextInput
              style={style.input}
              secureTextEntry={true}
              textContentType='password'
              placeholder='Confirm Password'
              placeholderTextColor= {colors.disabled_text}
              onChangeText={(cPassword) => setCPassword(cPassword)}
            />
          </View>

          <MyButton
            text = "Get current Location"
            onPressFunction={() => onGetLocationPress()}
          />
          <View style={style.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={(isSelected) => setSelection(isSelected)}
            style={style.checkbox}
          />
          <Text style={style.label}>Register as Specialist?</Text>
          </View>
        </ScrollView>
          <TouchableOpacity style={style.loginButton} onPress = {pressRegister}>
            <Text style={style.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('Login'); }}>
            <Text style={style.registerText}>
              Have an account? Login Now
            </Text>
          </TouchableOpacity>
        
        </View>
      </View>
    </View>
    

  </ScrollView>

   

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
      top: '5%',
    },

    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },

    checkbox: {
      alignSelf: "center",
    },

    label: {
      margin: 8,
    },
    authBox: {
      width: '80%',
      backgroundColor: '#fafafa',
      borderRadius: 20,
      alignSelf: 'center',
      paddingHorizontal: 14,
      paddingBottom: 20,
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
      width: 70,
      height: 70,
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