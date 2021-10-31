import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, FlatList } from 'react-native';
import MapView ,{Callout, Marker} from 'react-native-maps';
import {colors} from "../../constants/palette";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import Loading from '../../components/loading';


export default function homeCli({navigation}) {

  const [client, setClient] = useState(null);
  const[specialists,setSpecialists]= useState(null);

  const goToProfile = (specialist_id, speciality)=>{
    navigation.navigate('ProfileSp',{specialist_id:specialist_id, speciality:speciality})
  }

  const getUserProfile = async () =>{
    try {
      const responseProfile = await  axios.get(`${BASE_API_URL}/api/user-profile`, 
        {headers:{
          'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
        }}
      );
      setClient(responseProfile.data);
    }catch(e) {
      //console.log(responseProfile.data);
          console.log("error");         
      }
  }

  const getAllSpecialists = async () => {

    const responseSpecialists = await  axios.get(`${BASE_API_URL}/api/get-specialist-map-info`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }} 
    );
    //console.log(responseSpecialists.data);
    setSpecialists(responseSpecialists.data);  
  }

  useEffect(() => {
      getUserProfile();
      getAllSpecialists();
      }, [])


  if (!specialists){
    return (
     <Loading/>
    );
  }else{

    return (
      //console.log(specialists),
      <View style={style.container}> 
        <MapView
          showsUserLocation
          style={style.map}
          region={{ 
            latitude : 33.898427, 
            longitude :  35.598832,
            latitudeDelta: 0.022, 
            longitudeDelta: 0.0421 }}
        >
           
          {/* {specialists && <FlatList
               data = {specialists}
               keyExtractor={item => item.id}
               renderItem={({item}) => ( */}
                 
                  <Marker 
                    coordinate={{
                      latitude:33.898427,  
                      longitude: 35.598832,     
                  }}> 
                    <Callout onPress = {() => {goToProfile(1,'electrician')}}>
                      <View>
                        {/* <Text>`${item.first_name} ${item.last_name}`</Text>
                        <Text>{item.speciality}</Text>
                         */}
                         <Text>Hiiii</Text>
                      </View>
                    </Callout>
 
                  </Marker>
                {/* )}   
               
          />} 
                */}
            
        </MapView>
        <View style={{ position: 'absolute', top: 10, width: '100%' }}>
          <TextInput
            style={style.SearchInput}
            placeholder={'Search for a specialty'}
            placeholderTextColor={colors.disabled_text}
            
        />
       </View>
      
      </View>

    );
  }
}
const style = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex : 1,
  },

  SearchInput:{
    borderRadius: 10,
    margin: 10,
    color: '#000',
    borderColor: '#666',
    backgroundColor: colors.white,
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  }
});