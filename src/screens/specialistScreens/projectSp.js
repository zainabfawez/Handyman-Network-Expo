import React, {useEffect, useState, useRef} from 'react';
import { Text, View, Image, ScrollView, Platform, Button, Alert, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButtonDark from '../../components/MyButtonDark';
import MyButtonGray from '../../components/MyButtonGray';
import styles from "../../constants/styles";
import { colors } from '../../constants/palette';
import DisplayProjects from '../../components/DisplayProjects';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import Loading from '../../components/loading';
import {sendPushNotification} from './notifications'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function projectSp({navigation}) {

  const [modalTipVisible, setModalTipVisible] = useState(false);
  const [fullName, setFullName] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [id, setId] = useState(null);
  const [rating, setRating] = useState(null);
  

  //for push notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const getName = async () => {
    try {
      setFullName( await AsyncStorage.getItem('fullName'));
      await AsyncStorage.getItem('user_id')
      .then((id) => {
        console.log(id)
        setId(Number(id))})
     
    } catch(e) {
      console.log(e);
    }
  }

  const getSpeciality = async () => {
    const responseSpeciality = await  axios.get(`${BASE_API_URL}/api/get-specialist-specialities?specialist_id=1`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }} 
    );
    setSpeciality(responseSpeciality.data);  
  }

  const getAverageRate = async () => {
    const responseRating = await  axios.get(`${BASE_API_URL}/api/get-average-rate?specialist_id=1`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }}
    );
    if (responseRating.data == "no rates yet"){
      setRating("No Rating");  
    }else{
      setRating(responseRating.data);  
    }
  }


  useEffect(() => {
    getName();
    getSpeciality();
    getAverageRate();
  }, []);

  if (!(fullName && speciality && rating )){
    return (
     <Loading/>
    );
  }else{

    return (
      console.log(fullName, id, speciality, rating),
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image
                style={styles.ProfileImg} 
                source={require( '../../../assets/profilePic.png')}
          />
          <View >
            <Text style={styles.FullName}>  {fullName} </Text> 
            <Text style={styles.SpName}>  {speciality[0].name} </Text> 
            <Text style={{marginLeft: 25, fontSize: 16}}> 
              3.5 
              <Icon 
                name="star" 
                color={colors.gold} 
                size={30}
              /> 
            </Text> 
          </View>
        </View>
        <View style={{marginTop: 20}}>

        <View  style={style.proj}>
          <Text style={style.projText}>Projects</Text>
        </View>
         
          <ScrollView >
            {/* //call Api to display projects and their Photos */}
            <DisplayProjects 
              name = "project 1" 
              description = "Project about carpenting" 
              onPressFunction = {() =>{ navigation.navigate('Photos'); }}
              />
          </ScrollView>

        </View>
        
      

        {/* Modal to add a tip */}
        <View style={style. centeredView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalTipVisible}
            >
              
                <View style={[style.centeredView, { marginTop: -200, }]}>
                    <View style={style.modalView}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
                            <Text> Add a Tip About Your speciality </Text>
                            <View style={styles.HorizontalLine}></View>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 4 }}
                                onPress={() => setModalTipVisible(false)}
                            >
                                <Icon name='close'/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TextInput 
                                style={[style.input,{height:100, paddingVertical: 10, textAlignVertical: 'top'},]} 
                                multiline={true}
                                placeholder={"You're tip goes here"}
                                placeholderTextColor= {colors.disabled_text}
                                  // onChangeText={(projectName) => setFirstName(projectName)}
                            />
                            <View style={{flexDirection: "row", justifyContent : "space-around"}}>
                                <MyButtonGray
                                    text = "cancel"
                                    onPressFunction = {() => setModalTipVisible(false)}
                                />
                                <MyButtonDark
                                    text = "save"
                                    onPressFunction = {() =>  setModalTipVisible(false)}
                                    onPressFunction = {async () => {
                                      await sendPushNotification(expoPushToken, "body goes here", "tite goes here");
                                    }}
                                />
                                {/* {async () => {tokens.map(async (token)=> await...) */}
          
                            </View>
                          
                           
                        </View>
                    </View>
                </View>
              
            </Modal>
        </View>

        <View style={{flexDirection: "row", justifyContent : "space-around",}}>
          <View style={{"flex":0.5, margin :15}}>
            <MyButtonDark
                text = "new Project"
                onPressFunction = {() =>{ navigation.navigate('AddNewProject'); }}
            />
          </View>
          <View  style={{"flex":0.5, margin:15}}>
            <MyButtonDark
              text = "new Tip"
              onPressFunction = {() => setModalTipVisible(true)}
            />
          </View>
         
          
        </View>
        {/* // move this function to when the user add a tip
        // you need an api that gets all the token pf the clients and 
        //then you loop over the token and call sendPushNotification in the loop */}
        {/* <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        /> */}
      </View>
    );
  }
}


const style = StyleSheet.create({
  input:{
    width:'100%',
    height: 44,
    backgroundColor: '#f1f3f6',
    borderRadius:6,
    paddingHorizontal: 10,
  },

  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(252,252,252,0.8)',

  },

  
 

  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius:10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20, 
    shadowColor: '#000',
    shadowOffset: {
      width:0,
      height: 5,
    }
  },

  
  proj:{
    padding: 10,
    borderWidth:1,
    marginBottom:20,
    marginTop:10,
    borderColor: colors.disabled_text,
    borderRadius:6,
    marginHorizontal:5,
    backgroundColor: colors.disabled_text,
  },

  projText:{
    fontSize: 20,
    fontWeight: 'bold',

  },



})
