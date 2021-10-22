import * as React from 'react';
import { Text, View, Image } from 'react-native';
import MyButton from '../../components/MyButton';
import { colors } from '../../constants/palette';
import styles from "../../constants/styles";


export default function profileSp({navigation}) {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <Image
            style={styles.ProfileImg} 
            source={require( '../../../assets/profilePic.png')}
          />
          <View style={{margin:45}}>
            <Text style={{fontSize: 25, fontWeight:'bold', color: colors.black}}>Full Name</Text>
            <Text style={{fontSize: 20, fontWeight: 900, color: colors.black}}>Speciality</Text>
          </View>
        </View>
        <Text>Specialist Profile screen</Text>
        <MyButton
            text = "go to specialist Project"
            onPressFunction={() => {navigation.navigate('Project'); }}
        />
      </View>
    );
  }