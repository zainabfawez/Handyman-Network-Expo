import React, { useEffect, useState} from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import styles from "../../constants/styles";
import MyButton from '../../components/MyButton';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from "../../constants/palette";
import {Picker} from '@react-native-picker/picker';
import InputSpinner from "react-native-input-spinner";
//import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function addProfile({navigation}) {

    const [country, setCountry] = useState(null)
    const [category, setCategory] = useState(null);
    const [Experience, setExperience] = useState(null);
    const [Currency, setCurrency] = useState(null);

    return (
      <View style={styles.container}>

        <ScrollView>
          <View style = {style.title}>
            <Text style = {style.textTitle}>Welcome to The Handyman Network</Text>
            <Text style = {style.textSubTitle}>Please Fill These Profile Informations</Text>
            <View style= {styles.HorizontalLine}></View>
          </View>

          <View style= {styles.HorizontalLine}></View>

          <View style ={[styles.row, {justifyContent: "space-between"}]}>
            <Text style={{fontSize: 18}}> Add Profile Picture</Text>
            <TouchableOpacity>
              <Icon name="add-photo-alternate" size={50} color={colors.black}/>
            </TouchableOpacity>
          </View>
          
          <Text style={ {marginLeft:10, fontSize: 18}}>Nationality:</Text>
          <TouchableOpacity>
            <View style={style.box} >
            
              <CountryPicker
                onSelect={(country) => setCountry(country)}
                withFlag
              />
              <Icon name="keyboard-arrow-down" size={35} color={colors.black}/>
            </View>
          </TouchableOpacity>

          <Text style= {style.attribute}> Phone:</Text>
          <View style={style.box}>
            <TextInput
                placeholder="+961 ## ######"
                placeholderTextColor= {colors.disabled_text}
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
                <Picker.Item label="Carpenter" value="Carpenter" />
                <Picker.Item label="Electrician" value="electrician" />
                <Picker.Item label="Plumber" value="plumber" />
            </Picker>
          </View>

          <View style= {{justifyContent:'space-between'}}>
            <Text style= {style.attribute}> Experience (in years):</Text>
            <InputSpinner
              max={100}
              min={1}
              step={1}
              style={{marginHorizontal:12, marginVertical: 5}}
              colorMax={"#f04048"}
              colorMin={colors.primary}
              value={Experience}
              // onChange={(num) => {
              //   console.log(num);
              //}}
            />
          </View>

            <View>
              <Text style={style.attribute}>Price per hour:</Text>
              <View style={style.box}>
                <TextInput
                    placeholder="10"
                    placeholderTextColor= {colors.disabled_text}
                />
              </View>
            </View>
            
            <Text style= {style.attribute}> Currency:</Text>
            <View>
              <Picker 
                style = {{ marginVertical: 10, marginHorizontal:10}}
                placeholderTextColor = {colors.disabled_text}
                selectedValue = {Currency}
                onValueChange={(itemValue, itemIndex) =>
                  setCurrency(itemValue)}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="LBP" value="LBP" />
              </Picker>
            </View>

         </ScrollView>
       
        <View style={{marginTop: 15}}>
          <MyButton 
            text ="Save"  
            onPressFunction = {()=> {
              navigation.navigate('BottomTabSp')
              navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTabSp' }],
                });
            }}
          />
        </View>

      </View>
    );
  }

const style = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center', 
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
    fontSize: 18,
    marginTop: 12,
  }
});