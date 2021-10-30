import React, {useState} from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import Swiper from "react-native-web-swiper";

export default function projectCli() {
    return(
        <View style={{flex:1}}>
        <Swiper
          from={1}
          minDistanceForAction={0.1}
          controlsProps={{
            dotsTouchable: true,
            prevPos: 'left',
            nextPos: 'right',
            nextTitle: '>',
            nextTitleStyle: {  fontSize: 24, fontWeight: '500' },
            PrevComponent: ({ onPress }) => (
              <TouchableOpacity onPress={onPress}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '500' }}>
                  {'<'}
                </Text>
              </TouchableOpacity>
            ),
          }}
        >
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Image source={require( '../../../assets/profilePic.png')}/>
          </View>
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Image source={require( '../../../assets/profilePic.png')}/>  
          </View>
          <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Image source={require( '../../../assets/profilePic.png')}/>
          </View>
        </Swiper>
      </View>
    );
}
