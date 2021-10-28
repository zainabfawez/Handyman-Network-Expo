import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, ActivityIndicator } from 'react-native';
//import MapboxGL from '@react-native-mapbox-gl/maps';
import MapView ,{Callout, Marker} from 'react-native-maps';
import DisplayProjects from '../../components/DisplayProjects';
import styles from "../../constants/styles";
import {colors} from "../../constants/palette";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function homeCli({navigation}) {

 
  const [data, setData] = useState(null);
  const [emptyData, setEmptyData] = useState(null);


  const getUserProfile = async () =>{
   
    try {
    
      const response = await  axios.get(`${BASE_API_URL}/api/user-profile`, 
      {headers:{
        'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
      }}
      );
      //console.log(response.data['latitude']);
      if(!response.data){
        setEmptyData("1");
        setData(null);
        //console.log(data.latitude);
      }else{
        setData(response.data);
        setEmptyData(null);
        //console.log(response.data);
      }
    }catch(e) {
          console.log("error");
          
      }
  }
  useEffect(() => {
      getUserProfile();
      }, [data])

  if (!data){
    return (
      <View  style={{
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
      }}>
          
          <ActivityIndicator size='large' color={colors.primary}/>
      </View>
    

    );
  }else{
    return (
        
      <View style={style.container}> 
        <MapView
          style={style.map}
          initialRegion={{
            latitude: 33.895020,
            longitude: 35.501835,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          
          <Marker        
            coordinate={{ 
              latitude :   33.895020 , 
              longitude : 35.501835
            }}        
          >
            <Callout onPress = {() => {navigation.navigate('ProfileSp');}}>
              <View>
                <Text>ahla zooooz</Text>
                <Text>description</Text>
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