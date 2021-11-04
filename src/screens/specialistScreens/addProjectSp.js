import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, CheckBox, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MyButtonDark from '../../components/MyButtonDark';
import styles from "../../constants/styles";
import {colors} from "../../constants/palette";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BASE_API_URL from '../../services/BaseUrl';
import axios from 'axios';
import Loading from '../../components/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


export default function addProjectSp({navigation}) {

    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [isDone, setIsDone] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [totalCost, setTotalCost] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [image, setImage] = useState(null);
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

    const goToUploadPhotos = ()=>{
      addNewProject();
      navigation.navigate('UploadPhotos');
    }

    const addNewProject = async () => {
      try{
        const responseNewProject = await  axios.post(`${BASE_API_URL}/api/add-project`,{  
          "name": projectName,
          "description" : description,
          "total_cost" : totalCost,
          "is_done" : isDone, 
          "currency" : selectedCurrency,
          "image" : str
        },
        {headers:{
          'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
        }});
        navigation.navigate('UploadPhotos', {projectId: responseNewProject.data});
      }catch(error){
        console.log(error);
      }    
    }

   
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container,{marginHorizontal:10}]}>
       
        <View style={{'flexDirection': 'row'}}>
          <TouchableOpacity onPress={pickImage}>
              <Icon name="add-photo-alternate" size={100} color={colors.text} />
          </TouchableOpacity>
          {/* { image && <Image source={{ uri: image }} style={styles.ProfileImg}/>} */}
        </View>

        <View>
         
          <View style={[style.inputBox, {marginTop:10}]}>
            <Text style={style.inputLabel}>Project's Name</Text>
            <TextInput
              style={style.input}
              placeholder="Project's Name"
              returnKeyType="next" 
              placeholderTextColor= {colors.disabled_text}
              onChangeText={(projectName) => setProjectName(projectName)}
            />
          </View>

          <View style={{marginTop:20}}>
            <Text style={style.inputLabel}>Description</Text>
            <TextInput
              style={[style.input,{height:100, paddingVertical: 10, textAlignVertical: 'top'},]} 
              multiline={true}
              placeholder={"Describe your project"}
              returnKeyType="next" 
              placeholderTextColor= {colors.disabled_text}
              onChangeText={(description) => setDescription(description)}
            />
          </View>

          <View style={{flexDirection: "row", justifyContent : "space-between", marginTop:20}}>
            <View style={[style.inputBox,{"flex":0.5, marginRight:12}]}>
              <Text style={style.inputLabel}>Total Cost</Text>
              <TextInput
                style={style.input}
                placeholder="TotalCost"
                returnKeyType="next" 
                placeholderTextColor= {colors.disabled_text}
                onChangeText={(totalCost) => setTotalCost(totalCost)}
              />
          </View>
            
            <View style={{"flex":0.5, marginLeft:12}}>
              <Text style={[style.inputLabel,{paddingTop:10}]}>Currency</Text>
              <Picker 
                style = {{ marginVertical: 10}}
                placeholderTextColor = {colors.text}
                selectedValue = {selectedCurrency}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCurrency(itemValue)}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="LBP" value="LBP" />
              </Picker>
            </View>
          </View>

          <View style={style.checkboxContainer}>
          <CheckBox
            value={isDone}
            onValueChange={(isDone) => setIsDone(isDone)}
            style={style.checkbox}
          />
            <Text style={{margin:8}}>Done?</Text>
          </View>

        </View>

        <View style = {{  width: '100%', marginLeft: 8 }}>
          <MyButtonDark
              text = "save"
              onPressFunction =  {addNewProject}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }

  const style = StyleSheet.create({
    
    inputBox: {
      marginTop: 10,
    },
    inputLabel: {
      fontSize: 13,
      marginBottom: 6,
    },
    input: {
      width: '100%',
      height: 40,
      backgroundColor: '#dfe4ea',
      borderRadius: 4,
      paddingHorizontal: 10,
    },

    checkboxContainer: {
      flexDirection: "row",
      marginVertical: 20,

    },

    checkbox: {
      alignSelf: "center",
    },

});