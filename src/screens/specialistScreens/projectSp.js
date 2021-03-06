import React, {useEffect, useState, useRef} from 'react';
import { Text, View, Image, ScrollView, Modal, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButtonDark from '../../components/MyButtonDark';
import MyButtonGray from '../../components/MyButtonGray';
import styles from "../../constants/styles";
import { colors } from '../../constants/palette';
import DisplayProjects from '../../components/DisplayProjects';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import Loading from '../../components/loading';
import {sendPushNotification} from './notifications';

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
  const [rating, setRating] = useState(null);
  const [pushTokens, setPushTokens] = useState(null);
  const [newTip, setNewTip] = useState(null);
  const [projects, setProjects] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  
  const getName = async () => {
    try {
      setFullName( await AsyncStorage.getItem('fullName'));
      await AsyncStorage.getItem('user_id')
    } catch(error) {
      console.log(error);
    }
  }

  const getSpeciality = async () => {
    try{
      const responseSpeciality = await  axios.get(`${BASE_API_URL}/api/get-specialist-specialities?specialist_id=${ await AsyncStorage.getItem('user_id')}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }} 
      );
      setSpeciality(responseSpeciality.data);
    }catch(error){
      console.log(error);
    }    
  }

  const getPhoto = async () => {
    try {
      setImageSource( await AsyncStorage.getItem('profilePic'));
    } catch(e) {
      console.log(e);
    }
  }

  
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


  const addNewTip = async () => {
    try{
      const responseTip = await  axios.post(`${BASE_API_URL}/api/add-tip`,{  
        "tip" : newTip
      },
      {headers:{
        'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
      }});
      {pushTokens.map(async(pushToken) =>  {
          await sendPushNotification(pushToken.expoPushNotificationToken, "A new Tip has been added", "newTip")
      })}
        setModalTipVisible(false)
    }catch(error){
      console.log(error);
    } 
  }

  const getProjects = async () => {
    try{
      const responseProjects = await  axios.get(`${BASE_API_URL}/api/get-specialist-projects?specialist_id=${ await AsyncStorage.getItem('user_id')}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      if (responseProjects.data.status){
        setProjects('No Projects found');
      }else{
        setProjects(responseProjects.data);  
      }
    }catch(error){
      console.log(error);
    }
  }
   
  const getPushTokens = async () => {
    try{
      const responsePushTokens = await  axios.get(`${BASE_API_URL}/api/get-push-tokens`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      setPushTokens(responsePushTokens.data); 
    }catch(error){
      console.log(error);
    } 
  }

  const getAverageRate = async () => {
    try{
      const responseRating = await  axios.get(`${BASE_API_URL}/api/get-average-rate?specialist_id=${ await AsyncStorage.getItem('user_id')}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      if (responseRating.data.status){
        setRating("No Rating");  
      }else{
        setRating(responseRating.data);  
      }
    }catch(error){
      console.log(error);
    }  
  }

  const goToPhotos = (project_id)=>{
    navigation.navigate('Photos',{project_id:project_id})
  }

  useEffect(() => {
    getName();
    getSpeciality();
    getAverageRate();
    getPushTokens();
    getProjects();
    getProfilePic();
    getPhoto();
  }, []);

  if (!(fullName && speciality && rating && pushTokens && projects && imageSource)){
    return (
     <Loading/>
    );
  }else{
    return (
      <ScrollView style={styles.container}>
         <ImageBackground source={require('../../../assets/Background.jpeg')} resizeMode="cover" style={styles.backImage}>
      <View >
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.ProfileImg} 
            source={{uri: `${BASE_API_URL}${imageSource}`}}
          />
          <View >
            <Text style={styles.FullName}>  {fullName} </Text> 
            <Text style={styles.SpName}>  {speciality[0].name} </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text style={{marginLeft: 25, fontSize: 16}}> {rating} </Text>
              <Text> {rating == 'No Rating'? '': <Icon name="star" color={colors.gold} size={20} />} </Text>
            </View>  
          </View>
        </View>
        <View style={{marginTop: 20}}>
       
          <View  style={style.proj}>
            <Text style={style.projText}>Projects</Text>
          </View>
        
        
            {projects.map((project, key) => {
              return(
                <DisplayProjects 
                  key={key}
                  name = {project.name} 
                  description = {project.description} 
                  onPressFunction = {() =>{ goToPhotos(project.id) }}
                />
              )})}     


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
                            <Text>Add a tip about your specialty </Text>
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
                                placeholder={"Your tip goes here."}
                                placeholderTextColor= {colors.disabled_text}
                                onChangeText={(newTip) => setNewTip(newTip)}
                            />
                            <View style={{flexDirection: "row", justifyContent : "space-around"}}>
                                <MyButtonGray
                                    text = "Cancel"
                                    onPressFunction = {() => setModalTipVisible(false)}
                                />
                                <MyButtonDark
                                    text = "Save"
                                    onPressFunction = {addNewTip}  
                                />
                            </View>   
                        </View>
                    </View>
                </View>
              
            </Modal>
        </View>

        <View style={{flexDirection: "row", justifyContent : "space-around"}}>
          <View style={{"flex":0.5, margin :15}}>
            <MyButtonDark
                text = "New Project"
                onPressFunction = {() =>{ navigation.navigate('AddNewProject'); }}
            />
          </View>
          <View  style={{"flex":0.5, margin:15}}>
            <MyButtonDark
              text = "New Tip"
              onPressFunction = {() => setModalTipVisible(true)}
            />
        </View>
         
          
        </View>
     
      </View>
      </ImageBackground>
      </ScrollView>
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
