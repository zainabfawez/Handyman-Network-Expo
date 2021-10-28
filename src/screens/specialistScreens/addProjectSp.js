import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";
import {colors} from "../../constants/palette";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function addProjectSp({navigation}) {
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    
    return (
      <View style={styles.container}>
      
        <TouchableOpacity>
          <Icon name="add-photo-alternate" size={50} color={colors.black}/>
        </TouchableOpacity>
        <View>
         
          <View style={style.inputBox}>
            <Text style={style.inputLabel}>Project's Name</Text>
            <TextInput
              style={style.input}
              placeholder="Project's Name"
              placeholderTextColor= {colors.disabled_text}
              // onChangeText={(projectName) => setFirstName(projectName)}
            />
          </View>
          <View>
            <Text style={style.inputLabel}>Description</Text>
            <TextInput 
              style={[style.input,{height:100, paddingVertical: 10, textAlignVertical: 'top'},]} 
              multiline={true}
              placeholder={"Describe your project"}
              placeholderTextColor= {colors.disabled_text}
              // onChangeText={(projectName) => setFirstName(projectName)}
            />
            
          </View>

          <View style={{flexDirection: "row", justifyContent : "space-around"}}>
            <View style={style.inputBox}>
              <Text style={style.inputLabel}>Total Cost</Text>
              <TextInput
                style={style.input}
                placeholder="TotalCost"
                placeholderTextColor= {colors.disabled_text}
                // onChangeText={(projectName) => setFirstName(projectName)}
              />
            </View>
            
            <View>
              <Text style={[style.inputLabel,{paddingTop:10}]}>Currency</Text>
              <Picker 
                style = {{ marginVertical: 10}}
                placeholderTextColor = {colors.text}
                selectedValue = {selectedCurrency}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCurrency(itemValue)}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="LBP" value="LBP" />
              </Picker>
            </View>
          </View>

        </View>
     

        <MyButton
            text = "save"
            onPressFunction={() => {navigation.navigate('Projects'); }}
        />
      </View>
    );
  }

  const style = StyleSheet.create({
    
    inputBox: {
      marginTop: 10,
    },
    inputLabel: {
      fontSize: 18,
      marginBottom: 6,
    },
    input: {
      width: '100%',
      height: 40,
      backgroundColor: '#dfe4ea',
      borderRadius: 4,
      paddingHorizontal: 10,
    },
});