
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import { colors, shadows } from './src/constants/palette';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import homeCli from './src/screens/clientScreens/homeCli';
import profileSp from './src/screens/clientScreens/profileSp';
import projectCli from './src/screens/clientScreens/projectCli';
import tips from './src/screens/clientScreens/tips';
import settingCli from './src/screens/clientScreens/settingCli';
import login from './src/screens/authScreens/login';
import signup from './src/screens/authScreens/signup';
import settingSp from './src/screens/specialistScreens/settingSp';
import calendarSp from './src/screens/specialistScreens/calendarSp';
import projectSp from './src/screens/specialistScreens/projectSp';
import displayPhotosSp from './src/screens/specialistScreens/displayPhotosSp';
import addProjectSp from './src/screens/specialistScreens/addProjectSp';
import uploadPhotos from './src/screens/specialistScreens/uploadPhotos';
import addProfile from './src/screens/specialistScreens/addProfile';
import calendarCli from './src/screens/clientScreens/calendarCli';

const TabCli = createBottomTabNavigator();
const TabSp = createBottomTabNavigator();
const HomeStackCli = createNativeStackNavigator();
const ProjectsStackSp = createNativeStackNavigator();

function HomeStackScreenCli() {
  return (
    <HomeStackCli.Navigator >
      <HomeStackCli.Screen name="HomeCli" component={homeCli} options={{ headerShown: false,}} />
      <HomeStackCli.Screen name="ProfileSp" component={profileSp} options={{title: ''}} />
      <HomeStackCli.Screen name="projectCli" component={projectCli} options={{title: ''}} />
      <HomeStackCli.Screen name="CalendarCli" component={calendarCli} options={{title: 'Book your Appointments'}} />
    </HomeStackCli.Navigator>
  );
}

function bottomTabScreenCli() {
  return (
    <TabCli.Navigator  screenOptions={{ headerShown: false,
      tabBarActiveTintColor: colors.primary_dark,
      tabBarInactiveTintColor: colors.background,
      tabBarShowLabel: true,
      tabBarAllowFontScaling: false,
      tabBarKeyboardHidesTabBar: true,
      tabBarShadowColor: '#FFF',
      tabBarLabelStyle: {
        fontWeight: "bold",
        fontSize: 10,
      },}}>
        <TabCli.Screen name="HomeStack" component={HomeStackScreenCli}  options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"home"}
                size={28}
                color={color}
              />
            ),
          }} />
        <TabCli.Screen name="Tips" component={tips} options={{
            title: 'Tips',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"tooltip-text-outline"}
                size={28}
                color={color}
              />
            ),
          }} />
        <TabCli.Screen name="SettingCli" component={settingCli}  options={{
            title: 'Setting',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"cog"}
                size={28}
                color={color}
              />
            ),
          }}  />
    </TabCli.Navigator>
  );
}

function ProjectsStackScreenSp() {
  return (
    <ProjectsStackSp.Navigator  >
      <ProjectsStackSp.Screen name="Projects" component={projectSp}  />
      <ProjectsStackSp.Screen name="AddNewProject" component={addProjectSp} options={{title: 'Add New Project'}} />
      <ProjectsStackSp.Screen name="Photos" component={displayPhotosSp}   options={{title: 'Photos'}}/>
      <ProjectsStackSp.Screen name="UploadPhotos" component={uploadPhotos}   options={{title: 'Upload Photos'}}/>
    </ProjectsStackSp.Navigator>
  );
}


function bottomTabScreenSp() {
  return (
    <TabSp.Navigator  screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: colors.primary_dark,
      tabBarInactiveTintColor: colors.background,
      tabBarShowLabel: true,
      tabBarAllowFontScaling: false,
      tabBarKeyboardHidesTabBar: true,
      tabBarShadowColor: '#FFF',
      tabBarLabelStyle: {
        fontWeight: "bold",
        fontSize: 10,
      },}}>
        <TabSp.Screen name="ProjectsStack" component={ProjectsStackScreenSp}  options={{
            title: 'Projects',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"tools"}
                size={28}
                color={color}
              />
            ),
          }}  />
        <TabSp.Screen name="Calendar" component={calendarSp}  options={{
            title: 'calendar',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"calendar"}
                size={28}
                color={color}
              />
            ),
          }} />
        <TabSp.Screen name="SettingSp" component={settingSp}  options={{
            title: 'Setting',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"cog"}
                size={28}
                color={color}
              />
            ),
          }}  />
    </TabSp.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState(null)


  useEffect(() => {
    console.disableYellowBox = true,
    AsyncStorage.getItem('token')
    .then(token => {
      if (token){
        AsyncStorage.getItem('role')
        .then(role => {
          if (role == "specialist"){
            setInitialRoute("BottomTabSp")
          } else {
            setInitialRoute("BottomTabCli")
          }
        })        
      } else {
        setInitialRoute("Login")
      }
    })
  }, [initialRoute]);
  
  if (!initialRoute){
    return(
      <View  style={{
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
      }}>
          <ActivityIndicator size='large' color={colors.primary}/>
      </View>
    )
  }
  else {
    
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = {initialRoute}>
          <Stack.Screen name="Login" component={login} />
          <Stack.Screen name="Register" component={signup} />
          <Stack.Screen name="AddProfile" component={addProfile} options={{title:"Add Profile"}}/>
          <Stack.Screen name="BottomTabCli" component={bottomTabScreenCli} options={{title:""}}/>
          <Stack.Screen name="BottomTabSp" component={bottomTabScreenSp} options={{ title:""}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
