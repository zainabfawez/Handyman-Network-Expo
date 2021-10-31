import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ImageBackground, Alert, ScrollView, Modal, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButtonDark from '../../components/MyButtonDark';
import MyButtonGray from '../../components/MyButtonGray';
import { colors } from '../../constants/palette';
import styles from "../../constants/styles";
import { Rating } from 'react-native-ratings';
import call from 'react-native-phone-call';
import axios from 'axios';
import BASE_API_URL from '../../services/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';
import Loading from '../../components/loading';


export default function profileSp({navigation, route}) {

  const specialist_id = route.params.specialist_id;
  const speciality = route.params.speciality;
  const [modalRateVisible, setModalRateVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [profile, setProfile] = useState(null);
  const [info, setInfo] = useState(null);
  const [rating, setRating] = useState(null);
  const [projects, setProjects] = useState(null);

  const triggerCall = () => {
    // Check for perfect 12 digit length
    if (phoneNumber.length != 12) {
      alert('The number is incorrect');
      return;
    }
    const args = {
      number: phoneNumber,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  const getSpecialistInfo = async () => {
    const responseInfo = await  axios.get(`${BASE_API_URL}/api/get-user?id=${specialist_id}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }}
    );
    setInfo(responseInfo.data);  
    

  }

  const getSpecialistProfile = async () => {
    const responseProfile = await  axios.get(`${BASE_API_URL}/api/get-profile?specialist_id=${specialist_id}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }}
    );
    
    setProfile(responseProfile.data);
    setPhoneNumber(responseProfile.data[0].phone);

  }

  const getAverageRate = async () => {
    const responseRating = await  axios.get(`${BASE_API_URL}/api/get-average-rate?specialist_id=${specialist_id}`, 
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

  const getProjects = async () => {
    const responseProjects = await  axios.get(`${BASE_API_URL}/api/get-projects?specialist_id=${specialist_id}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }}
    );
    //console.log(responseProjects.data);
    setProjects(responseProjects.data);  

  }

  useEffect(() => {
    getSpecialistProfile();
    getSpecialistInfo();
    getAverageRate();
    getProjects();
  }, [])

  
    if (!(profile && info && projects && rating)){
      return (
       <Loading/>
      );
    }else{
      return (
        <View style={styles.container}>
          <View >
            <View style={{flexDirection: 'row'}}>
              <Image
                  style={styles.ProfileImg} 
                  source={require( '../../../assets/profilePic.png')}
              />
                  {/* Full name and Speciality and Info*/}
              <View style={{marginLeft: 15}}>
                <View style={style.nameContainer}>
                    <Text style={styles.FullName}>{info.first_name} {info.last_name}</Text> 
                </View>
                <View style={style.nameContainer}>
                    <Text style={styles.SpName}> {speciality} </Text> 
                </View>
                <View style={styles.row}>
                  <Icon name="flag" color={colors.primary_dark} size={30} />
                  <Text>    {profile[0].price} $/hr    </Text>
                  <Text>{rating}</Text>
                  <Icon name="star" color={colors.gold} size={20} />
                </View>
              </View>
            </View>

            <View style={[{justifyContent:"space-around", paddingLeft: 15, paddingRight: 15, paddingVertical:15},styles.row]}>
              {/* allow calling from react native */}
              <TouchableOpacity>
                  <View>
                    <Icon name="star" color={colors.gold} size={35} onPress = {() => setModalRateVisible(true)} />
                  </View>
              </TouchableOpacity>
              <View style={styles.VerticleLine}></View>
              <TouchableOpacity>
                  <View >
                    <Icon name="phone" color={colors.primary} size={30} onPress={triggerCall} />
                  </View>
              </TouchableOpacity>
              <View style={styles.VerticleLine}></View>
              <TouchableOpacity>
                  <View >
                    <Icon name="chat" color={colors.primary} size={30} />
                  </View>
              </TouchableOpacity>
            </View>

          </View>
          
          <View  style={style.proj}>
            <Text style={style.projText}>Projects</Text>
          </View>
          
        <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} >

          <Card>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.FullName, {fontSize:18, marginRight:30}]}>Project name</Text>
              <TouchableOpacity  onPress ={() => {navigation.navigate('projectCli'); }}>
                <Icon  name="chevron-double-right" color={colors.text} size={50} />
              </TouchableOpacity>
            </View>
          </Card>

          
        

        </ScrollView>

        <View  style={style.proj}>
            <Text style={style.projText}>Reviews from other Clients</Text>
          </View>

          {/* add bottom sheet instead */}
          <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}>
            <Card>
              <View >
                <Text style={{flexWrap:'wrap'}}>
                  It was amazing to work with him, he is so talented, bla bla bla bla bla
                </Text>
              </View>
            </Card>

          
        </ScrollView>



          {/* Modal to rate a specilist  */}
          <View style={style. centeredView}>
              <Modal
                  animationType='slide'
                  transparent={true}
                  visible={modalRateVisible}
              >
              
                  <View style={[style.centeredView, { marginTop: -200 }]}>
                      {/* title */}
                      <View style={style.modalView}>
                          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
                              <Text> Rating and Reviews </Text>
                              <View style={styles.HorizontalLine}></View>
                              <TouchableOpacity
                                  style={{ paddingHorizontal: 4 }}
                                  onPress={() => setModalRateVisible(false)}
                              >
                                  <Icon name='close'/>
                              </TouchableOpacity>
                          </View>
                          <View>
                              {/* rating */}
                              <View>
                                <Rating
                                  onFinishRating={(rating) => {
                                    Alert.alert('Star Rating: ' + JSON.stringify(rating));
                                  }}
                                  style={{ paddingVertical: 10 }}
                                />
                              </View>
                              {/* adding a review */}
                              <Text> Add a review:</Text>
                              <TextInput 
                                  style={[style.input,{height:100, paddingVertical: 10, textAlignVertical: 'top'}]} 
                                  multiline={true}
                                  placeholder={"You're review goes here"}
                                  placeholderTextColor= {colors.disabled_text}
                                    // onChangeText={(projectName) => setFirstName(projectName)}
                              />
                              <View style={{flexDirection: "row", justifyContent : "space-around"}}>
                                  <MyButtonGray
                                      text = "cancel"
                                      onPressFunction = {() => setModalRateVisible(false)}
                                  />
                                  <MyButtonDark
                                      text = "save"
                                      onPressFunction = {() => setModalRateVisible(false)}
                                  />
            
                              </View>
                            
                          </View>
                      </View>
                  </View>
              </Modal>
          </View>

          
        </View>
      );
  }
}
const style = StyleSheet.create({
  nameContainer:{
    flexDirection:'row'
  },

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
    },
  },

  proj:{
    padding: 10,
    borderWidth:1,
    marginBottom:20,
    marginTop:10,
    marginHorizontal:5,
    borderColor: colors.disabled_text,
    borderRadius:6,
    backgroundColor: colors.disabled_text,
  },

  projText:{
    fontSize: 20,
    fontWeight: 'bold',

  },
 
});