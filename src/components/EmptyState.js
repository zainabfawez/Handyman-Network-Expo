import React from "react";
import { View, Text, ImageBackground} from "react-native";
import {colors} from "../constants/palette";
import styles from "../constants/styles";

export default function EmptyState() {

    return (
        <View  style={{
                  flex: 1, 
                  alignItems: 'center',
                  justifyContent: 'center', 
                  width: '100%'
                }}>
           
         <Text style={{width: '100%'}}>This is an empty state</Text>
      
        </View>
    );
       
          
}