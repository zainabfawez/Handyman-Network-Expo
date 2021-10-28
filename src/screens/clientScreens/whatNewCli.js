import React, { useState, useEffect } from 'react';
import {   StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from "../../constants/styles";
import { Card } from 'react-native-elements';


export default function whatNewCli() {
    
    return (
     
      <View style={style.container}>
        <ScrollView>

        <Card elevation={7}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 90, height: 90, borderRadius: 100 }}
              source={{ uri: 'https://randomuser.me/api/portraits/men/6.jpg' }}
            />
            <View style={{  marginHorizontal:10 }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Yasser Sweid</Text>
              <Text style={{fontSize:15, flexWrap:'wrap'}}>
                green palette is now very trending, 
                you should use it with red wood it would 
                be amazing and trending, 
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
      </View>

      
    );
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      
      justifyContent: "space-around",
      paddingTop: 20,
      backgroundColor: 'white',
      
    },
  
  });