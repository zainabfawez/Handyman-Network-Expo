import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../../components/MyButton';
import { colors } from '../../constants/palette';
import styles from "../../constants/styles";



export default function profileSp({navigation}) {
  

    return (
      <View style={styles.container}>
        <View >
          <View style={{flexDirection: 'row'}}>
            <Image
                style={styles.ProfileImg} 
                source={require( '../../../assets/profilePic.png')}
            />
                {/* Full name and Speciality and Info*/}
            <View style={{marginLeft: 15}}>
              <View style={style.nameContainer}>
                  <Text style={styles.FullName}>  Full Name </Text> 
              </View>
              <View style={style.nameContainer}>
                  <Text style={styles.SpName}>  Speciality </Text> 
              </View>
              <View style={styles.row}>
                <Icon name="flag" color={colors.primary_dark} size={30}/>
                <Text>     20 $/hr    </Text>
                <Text>3.5</Text>
                <Icon name="star" color={colors.primary_dark} size={20}/>
              </View>
            </View>
            
          </View>
          <View style={[style.userContactSection,styles.row]}>
            {/* allow calling from react native */}
            <TouchableOpacity>
                <View>
                  <Icon name="star" color={colors.primary} size={30}/>
                </View>
            </TouchableOpacity>
            <View style={styles.VerticleLine}></View>
            <TouchableOpacity>
                <View >
                  <Icon name="phone" color={colors.primary} size={30}/>
                </View>
            </TouchableOpacity>
            <View style={styles.VerticleLine}></View>
            <TouchableOpacity>
                <View >
                  <Icon name="chat" color={colors.primary} size={30}/>
                </View>
            </TouchableOpacity>

          </View>
        </View>
        <Text>Display specialist's projects</Text>
        <MyButton
            text = "go to specialist Project"
            onPressFunction={() => {navigation.navigate('projectCli'); }}
        />
     
      </View>
    );
  }

const style = StyleSheet.create({
  nameContainer:{
    flexDirection:'row'
  },

});