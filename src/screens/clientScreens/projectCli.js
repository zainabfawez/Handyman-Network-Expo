import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons';
import styles from "../../constants/styles";
import { colors, shadows } from '../../constants/palette';
import Swiper from "react-native-web-swiper";
import Loading from '../../components/loading';
import axios from 'axios';
import BASE_API_URL from '../../services/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function projectCli({route}) {

  const project_id = route.params.project_id;
  const [projectDetails, setProjectDetails] = useState(false);

  const getProjectDetails = async () => {
    const responseProjectDetails = await  axios.get(`${BASE_API_URL}/api/get-project-details?project_id=${project_id}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }}
    );
    setProjectDetails(responseProjectDetails.data);  
  }

  useEffect(() => {
    getProjectDetails();
  }, [])

  if (!(projectDetails)){
    return (
     <Loading/>
    );
  }else{
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <Swiper
            from={1}
            minDistanceForAction={0.1}
            controlsProps={{
              dotsTouchable: true,
              prevPos: 'left',
              nextPos: 'right',
              nextTitle: '>',
              nextTitleStyle: {  fontSize: 24, fontWeight: '500' },
              PrevComponent: ({ onPress }) => (
                <TouchableOpacity onPress={onPress}>
                  <Text style={{ color: 'white', fontSize: 24, fontWeight: '500' }}>
                    {'<'}
                  </Text>
                </TouchableOpacity>
              ),
            }}
          >
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
              <Image source={require( '../../../assets/profilePic.png')}/>
            </View>
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
              <Image source={require( '../../../assets/profilePic.png')}/>  
            </View>
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
              <Image source={require( '../../../assets/profilePic.png')}/>
            </View>
          </Swiper>
        </View>
        
            <View>
              <ScrollView>
                <View style={styles.HorizontalLine}></View>
                <View style={{padding : 15}}>
                  <Text style={{fontSize:20}}>{projectDetails[0].name}:</Text>
                  <Text style={{paddingLeft : 10, fontSize : 16,flexWrap: 'wrap'}}>{projectDetails[0].description}</Text>
                </View>
                <View style={styles.HorizontalLine}></View>
                <View style={style.row}>
                  <Icon name="money-bill-wave" color={colors.primary} size={25}/> 
                  <Text style={{fontSize:18, textAlign:'justify'}}>
                    {projectDetails[0].total_cost} {projectDetails[0].currency=='USD' ? '$' : 'L.L.'}
                  </Text>
                  <View style={styles.VerticleLine}></View>

                  <Icons name="pending-actions" color={colors.primary} size={30}/>
                  <Text style={{fontSize:18}}>
                    {projectDetails[0].is_done ? 'Done' : 'In Progress' }
                  </Text>
                </View>
              </ScrollView>
            </View>
    </View>
        

    );
  }
}

  const style = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: "center",
      marginBottom: 10,
      justifyContent: "space-around",
      paddingTop: 10
  },
  });
  