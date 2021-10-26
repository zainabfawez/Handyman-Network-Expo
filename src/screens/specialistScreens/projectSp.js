import React, {useEffect, useState, useRef} from 'react';
import { Text, View, Image, ScrollView, Platform, Button, Alert, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../../components/MyButton';
import MyButtonDark from '../../components/MyButtonDark';
import MyButtonGray from '../../components/MyButtonGray';
import styles from "../../constants/styles";
import { colors } from '../../constants/palette';
import DisplayProjects from '../../components/DisplayProjects';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Swiper from "react-native-web-swiper";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function projectSp({navigation}) {

  //for modals
  const [modalTipVisible, setModalTipVisible] = useState(false);
  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);

  //for push notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image
                style={styles.ProfileImg} 
                source={require( '../../../assets/profilePic.png')}
          />
          <View >
            <Text style={styles.FullName}>  Full Name </Text> 
            <Text style={styles.SpName}>  Speciality </Text> 
            <Text style={{marginLeft: 25, fontSize: 16}}> 3.5 <Icon name="star" color={colors.gold} size={30}/> </Text> 
          </View>
        </View>
        <ScrollView>
          {/* //call Api to display projects and their Photos */}
          <DisplayProjects name = "project 1" description = "Project about carpenting" onPressFunction = {() =>{ navigation.navigate('Photos'); }}/>
        </ScrollView>

      


        {/* Modal to add a tip */}
        <View style={style. centeredView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalTipVisible}
            >
                <View style={[style.centeredView, { marginTop: -200 }]}>
                    <View style={style.modalView}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
                            <Text> Add a Tip About Your speciality </Text>
                            <View style={styles.HorizontalLine}></View>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 4 }}
                                onPress={() => setModalTipVisible(false)}
                            >
                                <Icon name='close'/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TextInput 
                                style={[style.input,{height:100, paddingVertical: 10, textAlignVertical: 'top'},]} 
                                multiline={true}
                                placeholder={"You're tip goes here"}
                                placeholderTextColor= {colors.disabled_text}
                                  // onChangeText={(projectName) => setFirstName(projectName)}
                            />
                            <View style={{flexDirection: "row", justifyContent : "space-around"}}>
                                <MyButtonGray
                                    text = "cancel"
                                    onPressFunction = {() => setModalTipVisible(false)}
                                />
                                <MyButtonDark
                                    text = "save"
                                    onPressFunction = {() => setModalTipVisible(false)}
                                />
          
                            </View>
                           
                        </View>
                    </View>
                </View>
            </Modal>
        </View>



        <View style={{flexDirection: "row", justifyContent : "space-around"}}>
          <MyButtonDark
              text = "new Project"
              onPressFunction = {() =>{ navigation.navigate('AddNewProject'); }}
          />
          <MyButtonDark
              text = "new Tip"
              onPressFunction = {() => setModalTipVisible(true)}
          />
          
        </View>
        {/* // move this function to when the user add a tip
        // you need an api that gets all the token pf the clients and 
        //then you loop over the token and call sendPushNotification in the loop */}
        {/* <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        /> */}
      </View>
    );
  }

//  Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const style = StyleSheet.create({
  input:{
    width:'100%',
    height: 44,
    backgroundColor: '#f1f3f6',
    borderRadius:6,
    paddingHorizontal: 10,
  },

  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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



})
