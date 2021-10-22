import * as React from 'react';
import { Text, View, Button } from 'react-native';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";


export default function signup({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>signup screen</Text>

        <MyButton
              text="signup"
              onPressFunction={() => navigation.navigate('Login')}
            />

      </View>

    );
  }