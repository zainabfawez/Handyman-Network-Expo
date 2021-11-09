import React, {useState} from 'react';
import { Text, View, TextInput, StyleSheet, CheckBox, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MyButtonDark from '../../components/MyButtonDark';
import styles from "../../constants/styles";
import {colors} from "../../constants/palette";
import BASE_API_URL from '../../services/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function addProjectSp({navigation}) {

    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [isDone, setIsDone] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [totalCost, setTotalCost] = useState(null);
  
    
    const addNewProject = async () => {
      try{
        const responseNewProject = await  axios.post(`${BASE_API_URL}/api/add-project`,{  
          "name": projectName,
          "description" : description,
          "total_cost" : totalCost,
          "is_done" : isDone, 
          "currency" : selectedCurrency,
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
        <View>
         
          <View style={[style.inputBox, {marginTop:10}]}>
            <Text style={style.inputLabel}>Project Name</Text>
            <TextInput
              style={style.input}
              placeholder="Project's Name"
              returnKeyType="next" 
              placeholderTextColor= {colors.disabled_text}
              onChangeText={(projectName) => setProjectName(projectName)}
            />
          </View>

          <View style={{marginTop:20}}>
            <Text style={style.inputLabel}>Project Description</Text>
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
                placeholder="Total Cost"
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
              text = "Save"
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