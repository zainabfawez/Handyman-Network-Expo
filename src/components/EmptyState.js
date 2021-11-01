import React from "react";
import { View, Text, TextInput} from "react-native";
import {colors} from "../constants/palette";

export default function EmptyState() {

    return (
        <View  style={{
                  flex: 1, 
                  alignItems: 'center',
                  justifyContent: 'center', 
                }}>
                    
         <Text>This is an empty state</Text>
        </View>
    );
       
          
}