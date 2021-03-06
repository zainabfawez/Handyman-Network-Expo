import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, Alert, RefreshControl, ScrollView} from 'react-native';
import MapView ,{ Callout, Marker } from 'react-native-maps';
import { colors } from "../../constants/palette";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import Loading from '../../components/loading';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function homeCli({navigation}) {

  const [client, setClient] = useState(null);
  const [specialists,setSpecialists] = useState(null);
  const [searchedSpecialists, setSearchedSpecialists] = useState(null);
  const [searchSpeciality, setSearchSpeciality] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude :  33.848427, 
    longitude :  35.518832 ,
    latitudeDelta: 0.022, 
    longitudeDelta: 0.0421 });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
    }catch(error) {
          console.log(error);         
      }
  }

  const getAllSpecialists = async () => {
    try{
      const responseSpecialists = await  axios.get(`${BASE_API_URL}/api/get-specialist-map-info`,  
      {headers:{
        'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
      }}
      );
      setSpecialists(responseSpecialists.data);  
    }catch(error){
      console.log(error);
    }  
  }
  
  const getSearchedSpecialists = async () => {
    try{
      const responseSearch = await  axios.post(`${BASE_API_URL}/api/search-speciality`,  
      {
        "speciality" : searchSpeciality
      },
      {headers:{
        'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
      }});
      if (responseSearch.data.status){
        Alert.alert('No Search Results');
      }else{
        setSearchedSpecialists(responseSearch.data); 
        setSpecialists(null);
      }
    }catch(error){
      console.log(error);
    } 
  }
  
  useEffect(() => {
    getUserProfile();
    getAllSpecialists();
  }, [])


  if (!( client)){
    return (
     <Loading/>
    );
  }else{
      return (
        <View style={style.container}> 
            <ScrollView
              contentContainerStyle={style.scrollView}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <MapView
            showsUserLocation
            style={style.map}
            region={coordinates}   
          >
              {specialists && !searchedSpecialists && specialists.map((specialist, key) => {
                return(
                  <Marker 
                    key={key}
                    coordinate={{
                      latitude: parseFloat(specialist.latitude),  
                      longitude: parseFloat(specialist.longitude),     
                    }}> 
                      <Callout onPress = {() => {goToProfile(specialist.id, specialist.speciality)}}>
                        <View>
                          <Text style={{fontWeight:'bold'}}>{specialist.first_name} {specialist.last_name}</Text>
                          <Text>{specialist.speciality}</Text>
                        </View>
                      </Callout>
                  </Marker>
              )})}

            {!specialists && searchedSpecialists && searchedSpecialists.map((specialist, key) => {
              return(
                <Marker 
                key={key}
                coordinate={{
                  latitude: parseFloat(specialist.latitude),  
                  longitude: parseFloat(specialist.longitude),     
                }}> 
                  <Callout onPress = {() => {goToProfile(specialist.id, specialist.speciality)}}>
                    <View>
                      <Text style={{fontWeight:'bold'}}>{specialist.first_name} {specialist.last_name}</Text>
                      <Text>{specialist.speciality}</Text>
                    </View>
                  </Callout>
              </Marker>
              )})}
  
          </MapView>
  
          <View style={style.searchBox}>
  
            <TextInput 
              placeholder="Search here"
              placeholderTextColor={colors.disabled_text}
              autoCapitalize="none" 
              style={{flex:1,padding:0}}
              onChangeText = {(searchSpeciality) => setSearchSpeciality(searchSpeciality)}
            />


            <TouchableOpacity onPress={getSearchedSpecialists}>
              <Icon name="ios-search" size={25}  color={colors.primary_dark}/>
            </TouchableOpacity> 
         </View>
      </ScrollView>
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

  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBox: {
    position:'absolute', 
    flexDirection:"row",
    top:10,
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  

  // SearchInput:{
  //   borderRadius: 10,
  //   margin: 10,
  //   color: '#000',
  //   borderColor: '#666',
  //   backgroundColor: colors.white,
  //   borderWidth: 1,
  //   height: 45,
  //   paddingLeft: 10,
  //   width: '80%',
  //   fontSize: 18,
  // }
});