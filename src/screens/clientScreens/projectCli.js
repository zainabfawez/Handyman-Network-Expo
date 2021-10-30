import React, {useState} from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons';
import styles from "../../constants/styles";
import { colors, shadows } from '../../constants/palette';
import Swiper from "react-native-web-swiper";


export default function projectCli() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.FullName}>Full name</Text>
        </View>
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
        
            <View>
              <ScrollView>
                <View style={styles.HorizontalLine}></View>
                <View style={{padding : 15}}>
                  <Text style={{fontSize:20}}>Project's Name:</Text>
                  <Text style={{paddingLeft : 10, fontSize : 16}}>Project's Description</Text>
         
                </View>
                <View style={styles.HorizontalLine}></View>
                <View style={style.row}>
                  <Text style={{fontSize:18}}>
                    <Icon name="money-bill-wave" color={colors.primary} size={25}/> 
                      1500$
                  </Text>
                  <View style={styles.VerticleLine}></View>
                  <Text style={{fontSize:18}}>
                    <Icons name="pending-actions" color={colors.primary} size={30}/>
                      In Progress</Text>
                </View>
              </ScrollView>
            </View>


    </View>
        

    );
  }

  const style = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: "center",
      marginBottom: 10,
      justifyContent: "space-around",
      paddingTop: 10
  },
  });
  