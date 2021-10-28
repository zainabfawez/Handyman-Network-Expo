
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import { colors, shadows } from './src/constants/palette';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';


import chatCli from './src/screens/clientScreens/chatCli';
import homeCli from './src/screens/clientScreens/homeCli';
import profileSp from './src/screens/clientScreens/profileSp';
import projectCli from './src/screens/clientScreens/projectCli';
import whatNewCli from './src/screens/clientScreens/whatNewCli';
import settingCli from './src/screens/clientScreens/settingCli';
import login from './src/screens/authScreens/login';
import signup from './src/screens/authScreens/signup';
import settingSp from './src/screens/specialistScreens/settingSp';
import chatSp from './src/screens/specialistScreens/chatSp';
import projectSp from './src/screens/specialistScreens/projectSp';
import displayPhotosSp from './src/screens/specialistScreens/displayPhotosSp';
import addProjectSp from './src/screens/specialistScreens/addProjectSp';
import addProfile from './src/screens/specialistScreens/addProfile';




const TabCli = createBottomTabNavigator();
const TabSp = createBottomTabNavigator();
const HomeStackCli = createNativeStackNavigator();
const ProjectsStackSp = createNativeStackNavigator();


function HomeStackScreenCli() {
  return (
    <HomeStackCli.Navigator >
      <HomeStackCli.Screen name="HomeCli" component={homeCli} options={{ headerShown: false,}} />
      <HomeStackCli.Screen name="ProfileSp" component={profileSp} options={{title: 'Profile'}} />
      <HomeStackCli.Screen name="projectCli" component={projectCli} options={{title: 'Project'}} />
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
        <TabCli.Screen name="ChatCli" component={chatCli}  options={{
            title: 'Chat',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"chat"}
                size={28}
                color={color}
              />
            ),
          }} />
        <TabCli.Screen name="WhatNewCli" component={whatNewCli} options={{
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
      <ProjectsStackSp.Screen name="AddNewProject" component={addProjectSp} />
      <ProjectsStackSp.Screen name="PhotosSp" component={displayPhotosSp}   options={{title: 'Photos'}}/>
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
        <TabSp.Screen name="ChatSp" component={chatSp}  options={{
            title: 'Chat',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"chat"}
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
     AsyncStorage.getItem('token')
    .then(token => {
      if (token){
        AsyncStorage.getItem('role')
        .then(role => {
          if (role == "specialist"){
            //api call to get profile if empty set initial route addprofile else
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
