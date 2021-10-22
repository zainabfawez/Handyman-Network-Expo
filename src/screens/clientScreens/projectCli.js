import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons';
import styles from "../../constants/styles";
import { colors, shadows } from '../../constants/palette';
import Swiper from "react-native-swiper";


export default function projectCli() {

    return (
      <View style={styles.container}>

        <View>
          <Text style={styles.FullName}>Full name</Text>
        </View>

        <View>
        <Image source={require( '../../../assets/profilePic.png')} style = {{ width: 130, height: 130, alignContent: "center"}} />
{/* 
          <Swiper showsButtons={true} style={{paddingRight: 20}} >
            <View>
              <Image
                source={require( '../../../assets/profilePic.png')}
              />
            </View>
            <View>
              <Image
                source={require( '../../../assets/profilePic.png')}
              />
            </View>
            <View>
              <Image
                source={require( '../../../assets/profilePic.png')}
              />
            </View> 
          </Swiper> */}
          <View>
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
          </View>

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