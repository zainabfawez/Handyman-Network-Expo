import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity } from 'react-native';
import MyButtonDark from '../../components/MyButtonDark';
import styles from "../../constants/styles";
import {colors} from "../../constants/palette";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BASE_API_URL from '../../services/BaseUrl';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function uploadPhotos({navigation, route}) {

    const project_id = route.params.projectId;
    const [str, setStr] = useState(null);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        base64: true
      });
      if (!result.cancelled) {
        setStr(result.base64); 
        setImage(result.uri); 
      }
    };

    const uploadPhoto = async () => {
      try {
        const responsePhoto = await  axios.post(`${BASE_API_URL}/api/add-project-photo`, {
            "image" :str,
            "project_id" : project_id
        },
        {headers:{
          'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
        }});
      } catch(err) {
        console.log(err); 
      }
    }
    
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const saveHandler = ()=>{        
      navigation.navigate('Projects');
    }
   
    return(
        <View style={styles.container}>
            
            <View style={{'flexDirection': 'row'}}>
              <TouchableOpacity onPress={pickImage}>
                  <Icon name="add-photo-alternate" size={100} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={uploadPhoto}>
                  <Icon name="file-upload" size={100} color={colors.black} />
              </TouchableOpacity>
              
            </View>
           
            <View style = {{ width: '100%', marginLeft: 8 }}>
                <MyButtonDark
                    text = "save"
                    onPressFunction =  {saveHandler}
                />
            </View>
        </View>
    );

}
