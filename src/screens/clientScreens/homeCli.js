import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, ActivityIndicator, FlatList } from 'react-native';
import MapView ,{Callout, Marker} from 'react-native-maps';
import {colors} from "../../constants/palette";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';


export default function homeCli({navigation}) {

  const [profile, setProfile] = useState(null);
  const[pins,setPin]= useState(null);




  const getUserProfile = async () =>{
    try {
      const responseProfile = await  axios.get(`${BASE_API_URL}/api/user-profile`, 
        {headers:{
          'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
        }}
      );
      setProfile(responseProfile.data);
    }catch(e) {
      //console.log(responseProfile.data);
          console.log("error");         
      }
  }

  const getAllSpecialists = async () => {

    const responseSpecialists = await  axios.get(`${BASE_API_URL}/api/get-all-specialists`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }} 
    );
    //console.log(responseSpecialists.data);
    setPin(responseSpecialists.data);  
  }

  useEffect(() => {
      getUserProfile();
      getAllSpecialists();
      }, [])


  // if (!profile){
  //   return (
  //     <View  style={{
  //       flex: 1, 
  //       alignItems: 'center',
  //       justifyContent: 'center', 
  //     }}>
          
  //         <ActivityIndicator size='large' color={colors.primary}/>
  //     </View>
    

  //   );
  // }else{
    return (
      //console.log(profile.first_name),
      //console.log(pins),
      <View style={style.container}> 
        <MapView
          showsUserLocation
          style={style.map}
          region={{ 
            latitude : 33.868427, 
            longitude : 35.538832,
            latitudeDelta: 0.022, 
            longitudeDelta: 0.0421 }}
        >
          
         
          <Marker 
            color = "pink"
            coordinate={{
              latitude:33.868427,  
              longitude:35.538832,     
          }}> 
            <Callout onPress = {() => {navigation.navigate('ProfileSp');}}>
              <View>
                <Text>Specialist</Text>
                
              </View>
            </Callout>

          </Marker>
     
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
  //}
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