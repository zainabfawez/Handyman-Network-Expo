import React from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";
import { colors, shadows } from '../constants/palette';
import MyButton from './MyButton';

export default function DisplayProjects(props) {

    return(
        <View style = {style.Container}>
            <Text style = {style.name}>{props.name}</Text>
            <Text>{props.description}</Text>
            <MyButton text ="Photos"/>
        </View>
    ); 
        
}

const style = StyleSheet.create({
    Container:{
        padding : 10,
    },

    name: {
        fontSize : 18,
        marginLeft : 5,
        marginBottom : 5,
    }
});