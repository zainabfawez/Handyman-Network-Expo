import React from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";
import { colors, shadows } from '../constants/palette';
import styles from '../constants/styles';
import MyButton from './MyButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DisplayProjects(props) {

    return(
        <View style = {style.Container}>
            <View style={{flexDirection:"row"}} >
                <TouchableOpacity  onPress={props.onPressFunction}>
                    <Icon name="image-multiple-outline" size={60} color = {colors.primary_dark}/>
                </TouchableOpacity>
                <View>
                    <Text style = {style.name}>{props.name}</Text>
                    <Text style = {style.description}>{props.description}</Text>
                </View>
            </View>
            <View style = {styles.HorizontalLine}></View>
        </View>
    ); 
        
}

const style = StyleSheet.create({
    Container:{
        padding : 10,
    },

    name: {
        fontSize : 20,
        marginLeft : 5,
        marginBottom : 5,
        fontWeight: 'bold',
    },

    description: {
        fontSize : 15,
        marginLeft : 5,
        marginBottom : 5,
    }
});