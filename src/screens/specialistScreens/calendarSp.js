import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, ImageBackground } from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../../constants/styles";
import {colors} from "../../constants/palette";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_API_URL from '../../services/BaseUrl';
import Loading from '../../components/loading';
import { Card } from 'react-native-elements';

export default function calendarSp() {
  const [availableDates, setAvailableDates] = useState(null);
  const [appointmentDates, setAppointmentDates] = useState(null);
  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const getAvailableDates = async () => {
    try{
      const responseAvailableDates = await  axios.get(`${BASE_API_URL}/api/get-available-dates?specialist_id=${ await AsyncStorage.getItem('user_id')}`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      if (responseAvailableDates.data == "No available dates"){
        setAvailableDates("No available dates");  
      }else{
        let dates =  responseAvailableDates.data
        let available = {}
        dates.forEach (date => {
         available[date.availableDate] = {selected: true, marked: true, selectedColor: colors.primary}
        })
        setAvailableDates(available);
      }
    }catch(error){
      console.log(error);
    }  
  }

  const setAvailableDate = async (day) => {
    try{
      const responseAvailableDates = await  axios.post(`${BASE_API_URL}/api/set-available-date`, 
      {
        "date" : day.dateString
      },
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      getAvailableDates();
    }catch(error){
      console.log(error);
    }  
  }

  const getAppointmentDates = async () => {
    try{
      const responseAppointmentDates = await  axios.get(`${BASE_API_URL}/api/get-appointment-dates`, 
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      if (responseAppointmentDates.data == "No appointments"){
        setAppointmentDates("No appointments");  
      }else{
        let dates =  responseAppointmentDates.data
        let disabled = {}
        dates.forEach (date => {
         disabled[date.date] = {selected: true, marked: true, selectedColor: colors.disabled_text}
        })
        setAppointmentDates(disabled);
      }
    }catch(error){
      console.log(error);
    } 
  }

  const renderDetails = (day, appointmentDates)=>{
   appointmentDates.forEach (date =>{
     if(date.date == day){
       setFirstName(date.first_name);
       setLastName(date.last_name);
     }
   })
  }
    
  const showModel = (day)=>{
    setModalDetailVisible(true);
    renderDetails(day, appointmentDates);
  }

  useEffect(() => {
    getAppointmentDates();
    getAvailableDates();
   
  }, []);

  if(!(appointmentDates && availableDates)){
    return(
      <Loading/>
    );
    
  }else{
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/Background.jpeg')}  resizeMode="cover"  style={styles.backImage}>
      <View>
        <Image 
          style = {{height: 40, width: '100%', marginTop:10}}
          source = {require('../../../assets/availability.png')}
        />
      </View>
      <View>
        <Card>
          <Text>press on the date to make it available</Text>
          <Text><Icon name="numeric-7-circle" size={25} color={colors.primary}/> available Dates</Text>
          <Text><Icon name="numeric-7-circle" size={25} color={colors.disabled_text}/> Booked dates</Text>
        </Card>
      </View>
      
      <View style={{marginTop: 20}}>
        <Calendar
           theme={{
           
            selectedDayBackgroundColor: colors.primary_dark,
            selectedDayTextColor: colors.primary_dark,
            todayTextColor: colors.primary_dark,
            dayTextColor: '#2d4150',
            dotColor: colors.primary_dark,
            arrowColor: colors.primary_dark,
            monthTextColor: colors.primary_dark,
          }}  
  
          markedDates={{...availableDates,...appointmentDates}}
          style={style.Calendar}
          minDate={Date()}
          onDayPress={(day) => {setAvailableDate(day)}}
          //onDayLongPress= {(day) => showModel(day, appointmentDates)}
          monthFormat={'MMM yyyy'} // http://arshaw.com/xdate/#Formatting
          disableMonthChange={true}
          firstDay={1}    
          showWeekNumbers={true}    
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}        
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          hideExtraDays={true}
        />
      </View>

      {/* modal for details */}
      <View style={style. centeredView}>

        {firstName && lastName  &&  <Modal
                animationType='slide'
                transparent={true}
                visible={modalDetailVisible}
            >
                <View style={[style.centeredView, { marginTop: -200, }]}>
                    <View style={style.modalView}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
                            <Text>Details</Text>
                            <View style={styles.HorizontalLine}></View>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 4 }}
                                onPress={() => setModalDetailVisible(false)}
                            >
                                <Icon name='close' size = {20}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                         <Text>Your have Appointment with:</Text>
                         <Text style={{fontWeight:'bold'}}>{firstName} {lastName}</Text>
                        </View>
                    </View>
                </View>
              
            </Modal>}
        </View>
    
        </ImageBackground>
    </View>
  );
}
}

const style = StyleSheet.create({

  Calendar:{
    borderWidth: 1,
    borderColor: colors.primary_dark,
    height: 350
  },

  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(252,252,252,0.8)',

  },

  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius:10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20, 
    shadowColor: '#000',
    shadowOffset: {
      width:0,
      height: 5,
    }
  },

});


