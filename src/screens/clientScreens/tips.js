import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import styles from "../../constants/styles";
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import { colors } from '../../constants/palette';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import Loading from '../../components/loading';


export default function tips() {

  const [tips, setTips] = useState(null);

  const getTips = async () =>{
    const responseTips = await  axios.get(`${BASE_API_URL}/api/get-tips`, 
      {headers:{
        'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
      }} );
    if (responseTips.data.status){
      setTips("No Tips");  
    }else{
      setTips(responseTips.data);  
    }
  
  }


    useEffect(() => {
      getTips();
    }, []);
  

    if (!tips){
      return (
       <Loading/>
      );
    }else{
      return (
      
        <ScrollView style={style.container}>
        <View >

           {tips.map((tip, key) => {
              return(
                <Card key={key} style={{paddingLeft: 5}}>
                
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 100 }}
                      source={require( '../../../assets/profilePic.png')}
                    />
                    <View style={{  marginLeft:5 }}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}  >{tip.first_name} {tip.last_name}</Text>
                      <Text style={{fontSize:15, flexWrap:'wrap', textAlign: "left"}} numberOfLines={5}>{tip.tip}</Text>
                    </View>
                  </View>
                  </Card>
              )})}
             
        </View>
        </ScrollView>
    );
  }
}

  const style = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: 'white',
      paddingVertical: 10

    },
  
  });