import React, { useEffect, useState} from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, Keyboard, Image } from 'react-native';
import styles from "../../constants/styles";
import MyButton from '../../components/MyButton';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from "../../constants/palette";
import {Picker} from '@react-native-picker/picker';
import InputSpinner from "react-native-input-spinner";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../services/BaseUrl';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../../components/loading';


export default function addProfile({navigation}) {

    const [country, setCountry] = useState(null)
    const [category, setCategory] = useState("Electrician");
    const [experience, setExperience] = useState(null);
    const [currency, setCurrency] = useState("USD");
    const [phone, setPhone] = useState(null);
    const [price, setPrice] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [imageCode, setImageCode] = useState(null);
    const [categories, setCategories] = useState(null);

    const pickImage = async () => {
      let pickedImage = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        base64: true
      });
      if (!pickedImage.cancelled) {
        setImageCode(pickedImage.base64);
        setProfilePic(pickedImage.uri); 
      }
    };
     
    const getAllCategories = async () => {
      try{
        const responseCategories = await  axios.get(`${BASE_API_URL}/api/get-all-specialities`, 
        { headers:{
        'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
        }});
        setCategories(responseCategories.data); 
      }catch(error){
        console.log(error);
      } 
    }
      
    const addNewProfile = async () => {
      try{
        const responseProfile = await  axios.post(`${BASE_API_URL}/api/add-profile`,{  
          "phone" : phone,
          "experience" : experience,
          "currency" : currency,
          "price" : price,
          "nationality" : country.name,
          "image" : imageCode,
        },
        {headers:{
          'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
        }});
      }catch(error){
        console.log(error);
      }
    }

    const addNewCategory = async () => {
      try{
        const responseProfile = await  axios.post(`${BASE_API_URL}/api/add-speciality`,{  
          "speciality" : category,
        },
        {headers:{
          'Authorization' : `Bearer ${ await AsyncStorage.getItem('token')}`
        }});
      }catch(error){
        console.log(error);
      }
    }

    const saveHandler = ()=>{
      addNewCategory();
      addNewProfile();
      navigation.navigate('Login')
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
        });
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
      getAllCategories();
    }, []);

  if (!categories){
    return(<Loading/>);
  }else{
    return (
      <View style={styles.container}>

        <ScrollView>
          <View style = {style.title}>
            <Text style = {style.textTitle}>Welcome To The Handyman Network</Text>
            <Text style = {style.textSubTitle}>Please Fill Your Profile Information</Text>
            <View style= {styles.HorizontalLine}></View>
          </View>
          
          <View style= {styles.HorizontalLine}></View>

          <View style ={[styles.row, {justifyContent: "space-between"}]}>
            <Text style={{marginLeft:10, fontSize: 15}}>Profile Picture:</Text>
            <TouchableOpacity onPress={pickImage}>
              <Icon name="add-photo-alternate" size={50} color={colors.text}/>
            </TouchableOpacity>
            {profilePic && <Image source={{ uri: profilePic }} style={styles.ProfileImg}/>}
          
          </View>
          
          <Text style={{marginLeft:10, fontSize: 15}}>Nationality:</Text>
          <TouchableOpacity>
            <View style={style.box} >
              <CountryPicker
                onSelect = {(country) => setCountry(country)}
                withFlag
              />
            </View>
          </TouchableOpacity>

          <Text style= {style.attribute}> Phone:</Text>
          <View style={style.box}>
            <TextInput
                placeholder ="+961########"
                placeholderTextColor = {colors.disabled_text}
                onChangeText = {(phone) => setPhone(phone)}
            />
          </View>

          <Text style= {style.attribute}> category:</Text>
          <View >
            <Picker 
                style = {{ marginVertical: 10, marginHorizontal:10}}
                placeholderTextColor = {colors.disabled_text}
                selectedValue = {category}
                onValueChange={(itemValue, itemIndex) =>
                  setCategory(itemValue)}
              >
                 { categories && categories.map((category, key) => {
                   return(
                    <Picker.Item label={category.name} value={category.name} key={key} />
                  )})}
            </Picker>
          </View>

          <View style= {{justifyContent:'space-between', }}>
            <Text style= {style.attribute}> Experience (in years):</Text>
            <View style={{marginTop:5}}>
            <InputSpinner
              max={100}
              min={1}
              step={1}
              style={{marginHorizontal:12, marginVertical: 5}}
              colorMax={"#f04048"}
              colorMin={colors.primary}
              value={experience}
              onChange={(num) => { setExperience(num)}} 
            />
            </View>
          </View>

          <View style={{flexDirection:'row'}}>

            <View style={{'flex':0.5}}>
              <Text style={style.attribute}>Price per hour:</Text>
              <View style={style.box}>
                <TextInput
                    placeholder="10"
                    placeholderTextColor= {colors.disabled_text}
                    keyboardType='numeric'
                    onChangeText = {(price) => setPrice(price)}
                />
              </View>
            </View>
            
           
            <View style={{'flex':0.5 }}>
              <Text style= {style.attribute}> Currency:</Text>
              <Picker 
                style = {{ marginVertical: 10, marginHorizontal:10}}
                placeholderTextColor = {colors.disabled_text}
                selectedValue = {currency}
                onValueChange={(itemValue, itemIndex) =>
                  setCurrency(itemValue)}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="LBP" value="LBP" />
              </Picker>
            </View>

          </View>

        </ScrollView>
       
        <View style={{marginTop: 15}}>
          <MyButton 
            text ="Save"  
            onPressFunction = {saveHandler}
          />
        </View>

      </View>
    );
  }
}

const style = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 5,
  },
  textTitle: {
    fontSize : 20,
    fontWeight: "bold",
  },
  textSubTitle:{
    fontSize : 20,
  },

  box:{
    padding: 10,
    margin: 10,
    borderWidth:1,
    borderRadius: 6,
    borderColor: colors.disabled_text,
    flexDirection: 'row',
    justifyContent:"space-between",
    backgroundColor: 'transparent',
  },
  
  attribute:{
    marginLeft:10, 
    fontSize: 15,
    marginTop: 12,
  }
});