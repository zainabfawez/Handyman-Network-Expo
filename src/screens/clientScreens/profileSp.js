import React, {useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ImageBackground, Alert,  Modal, TextInput, ToastAndroid } from 'react-native';
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
import EmptyState from '../../components/EmptyState';
import BottomSheet from 'reanimated-bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';


export default function profileSp({navigation, route}) {

  const specialist_id = route.params.specialist_id;
  const speciality = route.params.speciality;
  const [modalRateVisible, setModalRateVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [profile, setProfile] = useState(null);
  const [info, setInfo] = useState(null);
  const [rating, setRating] = useState(null);
  const [projects, setProjects] = useState(null);
  const [comments, setComments] = useState(null);
  const sheetRef = React.useRef(null);
  const [newRating, setNewRating] = useState(null);
  const [newReview, setNewReview] = useState(null);

  const goToProject = (project_id)=>{
    navigation.navigate('projectCli',{project_id:project_id})
  }


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

  const addNewRate = async () => {
    const responseNewRate = await  axios.post(`${BASE_API_URL}/api/rate-specialist`,{  
      "rate": newRating,
      "specialist_id" : `${specialist_id}`,
    },
    {headers:{
      'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
    }}
    );
  }

  const addNewReview = async () => {
    const responseNewReview = await  axios.post(`${BASE_API_URL}/api/comment-specialist`,{  
      "comment": newReview,
      "specialist_id" : `${specialist_id}`,
    },
    {headers:{
      'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
    }}
    );
  }

  const saveHandler = ()=>{
    addNewRate();
    addNewReview();
    setModalRateVisible(false);
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
    if (responseRating.data.status){
      setRating("No Rating");  
    }else{
      setRating(JSON.stringify(responseRating.data));  
    }
  }

  const getProjects = async () => {
    const responseProjects = await  axios.get(`${BASE_API_URL}/api/get-projects?specialist_id=${specialist_id}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }}
    );
    if (responseProjects.data.status){
      setProjects('No Projects found');
    }else{
      setProjects(responseProjects.data);  
    }
   
  }

  const getComments = async () => {
    const responseComments = await  axios.get(`${BASE_API_URL}/api/get-comments?specialist_id=${specialist_id}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }}
    );
    if (responseComments.data.status){
      setComments('No Reviews yet');
    }else{
      setComments(responseComments.data); 
    }
  }

  const renderComments = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>  
      {comments.map((comment, key) => {
        return(
          <Card  key={key}>
            <View>
              <Text  style={{fontWeight: 'bold', fontSize: 12}}> {comment.first_name} {comment.last_name}</Text>
              <Text>{comment.comment}</Text>
            </View>
          </Card>
        )})}
    </View>
  );
  
  // useFocusEffect( React.useCallback(() => {
  //   getSpecialistProfile();
  //   }, []))

  useEffect(() => {
    getSpecialistProfile();
    getSpecialistInfo();
    getAverageRate();
    getProjects();
    getComments();
  }, [profile])

  
    if (!(profile && info && projects && rating && comments)){
      return (
       <Loading/>
      );
    }else{    
      return (
        //console.log(profile[0]),
        <View style={styles.container}>
          <View >
            <View style={{flexDirection: 'row'}}>
              <Image
                  style={styles.ProfileImg} 
                  source={{uri:`${BASE_API_URL}${profile[0].profile_picture_url}`}}
              />
                  {/* Full name and Speciality and Info*/}
              <View style={{marginLeft: 15}}>
                <View style={style.nameContainer}>
                    <Text style={styles.FullName}>{info.first_name} {info.last_name}</Text> 
                </View>
                <View style={style.nameContainer}>
                    <Text style={styles.SpName}> {speciality} </Text> 
                </View>
                <View style={styles.row }>
                  <Icon name="flag" color={colors.primary_dark} size={30} />
                  <Text>    {profile[0].price} {profile[0].currency=='USD' ? '$' : 'L.L.'}/hr    </Text>
                  <Text>{rating}</Text>
                 <Text> {rating == 'No Rating'? '': <Icon name="star" color={colors.gold} size={20} />} </Text>
                </View>
              </View>
            </View>

            <View style={[{justifyContent:"space-around", paddingLeft: 15, paddingRight: 15, paddingVertical:15},styles.row]}>
             
              <TouchableOpacity>
                  <View>
                    <Icon name="star" color={colors.gold} size={35} onPress = {() => setModalRateVisible(true)} />
                  </View>
              </TouchableOpacity>
              <View style={styles.VerticleLine}></View>

               {/* allow calling from react native */}
              <TouchableOpacity>
                  <View >
                    <Icon name="phone" color={colors.primary} size={30} onPress={triggerCall} />
                  </View>
              </TouchableOpacity>
              <View style={styles.VerticleLine}></View>
              <TouchableOpacity>
                  <View >
                    <Icon name="calendar" color={colors.primary} size={30} />
                  </View>
              </TouchableOpacity>
            </View>
          </View>

       
          <View >
            <TouchableOpacity  onPress={() => sheetRef.current.snapTo(0)}>
              <Text style={{fontSize:18, color:'blue'}}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {/*  Specialist's projects */}
          
          <View  style={style.proj}>
            <Text style={style.projText}>Projects</Text>
          </View>
          <ScrollView>
            {projects.map((project, key) => {
              return(
                <View key={key}>
                  <View style={{flexDirection:'row', marginLeft:15, justifyContent:'space-evenly'}}> 
                    <Text style={[styles.FullName, {fontSize:18, marginRight:25}]}>{project.name}</Text>
                    <TouchableOpacity  onPress ={() => goToProject(project.id)}>
                      <Icon  name="chevron-double-right" color={colors.text} size={50} />
                    </TouchableOpacity> 
                  </View> 
                </View>
          )})}
        </ScrollView>

        {/*  Specialist's Reviews */}
        <BottomSheet
          ref={sheetRef}
          snapPoints={[450, 300, 0]}
          initialSnap={2}
          borderRadius={10}
          renderContent={renderComments}
        />

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
                                  ToastAndroid.show("You're rate is: "+JSON.stringify(rating), 2000);
                                  setNewRating(rating);
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
                                onChangeText={(review) => setNewReview(review)}
                            />
                            <View style={{flexDirection: "row", justifyContent : "space-around"}}>
                                <MyButtonGray
                                    text = "cancel"
                                    onPressFunction = {() => setModalRateVisible(false)}
                                />
                                <MyButtonDark
                                    text = "save"
                                    onPressFunction = {saveHandler}
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