import React from "react";
import { View, ActivityIndicator} from "react-native";
import {colors} from "../constants/palette";

export default function Loading() {

    return (
        <View  style={{
                  flex: 1, 
                  alignItems: 'center',
                  justifyContent: 'center', 
                }}>
                    
            <ActivityIndicator size='large' color={colors.primary}/>
        </View>
    );
       
          
}