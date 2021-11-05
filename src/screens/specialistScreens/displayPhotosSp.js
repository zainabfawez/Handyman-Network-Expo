import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Swiper from "react-native-web-swiper";
import BASE_API_URL from '../../services/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/loading';
import EmptyState from '../../components/EmptyState';

export default function projectCli({route}) {

  const project_id = route.params.project_id;
  const [photos, setPhotos] = useState(null);

  const getProjectPhotos = async () => {
    try{
      const responseProjectphotos = await  axios.get(`${BASE_API_URL}/api/get-project-photos?project_id=${project_id}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      if(responseProjectphotos.data.status){
        setPhotos("empty State");
      }else{
        setPhotos(responseProjectphotos.data); 
      }
    }catch(error){
      console.log(error);
    } 
  }

  useEffect(() => {
   getProjectPhotos();
  }, [])

  if(!photos){
    return(<Loading/>);
  }else{
    if (photos == "empty State"){
      return(
      console.log("empty",photos),
      <EmptyState/>
      );
    }else{
      console.log("not empty",photos)
      return(
        
          <View style={{flex:1}}>
            <ImageBackground source={require('../../../assets/Background.jpeg')}  resizeMode="cover"  style={styles.backImage}>
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
              { photos && photos.map((photo, key) => {
                return(
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}} key={key}>
                  <Image source={{uri:`${BASE_API_URL}${photo.photo_url}`}} style = {{height: '100%', width: '100%'}}/>
                </View>
              )})}
            </Swiper>
          </ImageBackground>
        </View>
      );
    }
  }
}
