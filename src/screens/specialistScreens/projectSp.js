import * as React from 'react';
import { Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";

export default function projectSp({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Project Specialist  screen</Text>
        <Text>display peoject names, button to add projects screen, button to add tip model</Text>
        <MyButton
            text = "new Project"
            onPressFunction={() => {navigation.navigate('AddNewProject'); }}
        />
         <MyButton
            text = "new Tip"
            //onPressFunction={() => {navigation.navigate('AddNewProject'); }}
        />
      </View>
    );
  }

 
