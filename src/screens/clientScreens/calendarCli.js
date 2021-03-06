import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,ImageBackground } from 'react-native';
import {Calendar} from 'react-native-calendars';
import styles from "../../constants/styles";
import {colors} from "../../constants/palette";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_API_URL from '../../services/BaseUrl';
import Loading from '../../components/loading';
import {sendPushNotification} from '../specialistScreens/notifications';
import * as Notifications from 'expo-notifications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-elements';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function calendarCli({navigation,route}) {

  const [availableDates, setAvailableDates] = useState(null);
  const [appointmentDates, setAppointmentDates] = useState(null);
  const specialist_id = route.params.specialist_id;


  const getAvailableDates = async () => {
    try{
      const responseAvailableDates = await  axios.get(`${BASE_API_URL}/api/get-available-dates?specialist_id=${specialist_id}`, 
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

  const setAppointmentDate = async (day) => {
    try{
      const responseAppointmentDate = await  axios.post(`${BASE_API_URL}/api/set-appointment-date`, 
      {
        "specialist_id": {specialist_id},
        "date" : day.dateString
      },
      { headers:{
      'Authorization' :`Bearer ${await AsyncStorage.getItem('token')}`
      }});
      console.log(day.dateString);
      console.log(responseAppointmentDate.data);
      await sendPushNotification(responseAppointmentDate.data, "A new appointment has been booked", "new Appointment")
      getAppointmentDates();
    }catch(error){
      console.log(error);
    }  
  }
  
  const getAppointmentDates = async () => {
    try{
      const responseAppointmentDates = await axios.get(`${BASE_API_URL}/api/get-appointment-dates`, 
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
           <ImageBackground source={require('../../../assets/Background.jpeg')} resizeMode="cover" style={styles.backImage}>
        
            <Card>
              <Text>press on the date to book your appointment</Text>
              <Text><Icon name="numeric-7-circle" size={25} color={colors.primary}/> available Dates</Text>
              <Text><Icon name="numeric-7-circle" size={25} color={colors.disabled_text}/> Booked dates</Text>
            </Card>

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
              onDayPress={(day) => {setAppointmentDate(day)}}
              //onDayLongPress={(day) => {console.log('selected day', day)}}
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
});


