import React, {useEffect, useState, useRef} from 'react';
import { Text, View, Image, ScrollView, Platform, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../../components/MyButton';
import MyButtonDark from '../../components/MyButtonDark';
import styles from "../../constants/styles";
import { colors } from '../../constants/palette';
import DisplayProjects from '../../components/DisplayProjects';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function projectSp({navigation}) {
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
            <Text style={{marginLeft: 25}}> 3.5 <Icon name="star" color={colors.primary} size={30}/> </Text> 
          </View>
        </View>
        <ScrollView>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
          <DisplayProjects name = "project 1" description = "Project about carpenting"/>
        </ScrollView>

        <View style={{flexDirection: "row", justifyContent : "space-around"}}>
        <MyButtonDark
            text = "new Project"
            onPressFunction={() => {navigation.navigate('AddNewProject'); }}
        />
        <MyButtonDark
            text = "new Tip"
            //onPressFunction={() => {navigation.navigate('AddNewProject'); }}
        />
        
        </View>
        {/* // move this function to when the user add a tip
        // you need an api that gets all the token pf the clients and 
        //then you loop over the token and call sendPushNotification in the loop */}
        <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
        />
      </View>
    );
  }

 // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
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