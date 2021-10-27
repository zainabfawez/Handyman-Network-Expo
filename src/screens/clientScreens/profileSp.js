import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ImageBackground, Alert, ScrollView, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButtonDark from '../../components/MyButtonDark';
import MyButtonGray from '../../components/MyButtonGray';
import { colors } from '../../constants/palette';
import styles from "../../constants/styles";
import { Rating } from 'react-native-ratings';
import call from 'react-native-phone-call';


export default function profileSp({navigation}) {

  const [modalRateVisible, setModalRateVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+96170027217');

  const triggerCall = () => {
    // Check for perfect 12 digit length
    if (phoneNumber.length != 12) {
      alert('The number is incorrect');
      return;
    }

    const args = {
      number: phoneNumber,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };
  

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
                <Icon name="flag" color={colors.primary_dark} size={30} />
                <Text>     20 $/hr    </Text>
                <Text>3.5</Text>
                <Icon name="star" color={colors.gold} size={20} />
              </View>
            </View>
            
          </View>
          <View style={[{justifyContent:"space-around", paddingLeft: 15, paddingRight: 15},styles.row]}>
            {/* allow calling from react native */}
            <TouchableOpacity>
                <View>
                  <Icon name="star" color={colors.gold} size={35} onPress = {() => setModalRateVisible(true)} />
                </View>
            </TouchableOpacity>
            <View style={styles.VerticleLine}></View>
            <TouchableOpacity>
                <View >
                  <Icon name="phone" color={colors.primary} size={30} onPress={triggerCall} />
                </View>
            </TouchableOpacity>
            <View style={styles.VerticleLine}></View>
            <TouchableOpacity>
                <View >
                  <Icon name="chat" color={colors.primary} size={30} />
                </View>
            </TouchableOpacity>
          </View>
        </View>

       <ScrollView >
         <View style={{flexDirection:'row', justifyContent: "space-around"}}>
          <Text style={[styles.FullName, {fontSize:20}]}>Project name</Text>
          <TouchableOpacity  onPress ={() => {navigation.navigate('projectCli'); }}>
            <Icon style= {{marginTop:10}} name="arrow-right-thick" color={colors.primary_dark} size={40} />
          </TouchableOpacity>
         </View>
       </ScrollView>

         {/* Modal to rate a specilist  */}
         <View style={style. centeredView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalRateVisible}
            >
             
                <View style={[style.centeredView, { marginTop: -200 }]}>
                     {/* title */}
                    <View style={style.modalView}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
                            <Text> Rating and Reviews </Text>
                            <View style={styles.HorizontalLine}></View>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 4 }}
                                onPress={() => setModalRateVisible(false)}
                            >
                                <Icon name='close'/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {/* rating */}
                            <View>
                              <Rating
                                onFinishRating={(rating) => {
                                  Alert.alert('Star Rating: ' + JSON.stringify(rating));
                                }}
                                style={{ paddingVertical: 10 }}
                              />
                            </View>
                            {/* adding a review */}
                            <Text> Add a review:</Text>
                            <TextInput 
                                style={[style.input,{height:100, paddingVertical: 10, textAlignVertical: 'top'},]} 
                                multiline={true}
                                placeholder={"You're review goes here"}
                                placeholderTextColor= {colors.disabled_text}
                                  // onChangeText={(projectName) => setFirstName(projectName)}
                            />
                            <View style={{flexDirection: "row", justifyContent : "space-around"}}>
                                <MyButtonGray
                                    text = "cancel"
                                    onPressFunction = {() => setModalRateVisible(false)}
                                />
                                <MyButtonDark
                                    text = "save"
                                    onPressFunction = {() => setModalRateVisible(false)}
                                />
          
                            </View>
                           
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

        
      </View>
    );
  }

const style = StyleSheet.create({
  nameContainer:{
    flexDirection:'row'
  },

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



 
});