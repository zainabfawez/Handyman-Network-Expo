import * as React from 'react';
import { Button, Text, View } from 'react-native';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";

export default function login({ navigation }) {
        return (
          <View style={styles.container}>
            <Text>Login screen</Text>
            <MyButton
            
              onPressFunction={() => {navigation.navigate('BottomTabCli'); 
              navigation.reset({
                  index: 0,
                  routes: [{ name: 'BottomTabCli' }],
                  });}}
              text="Login C"
            />
            <MyButton
            
            onPressFunction={() => {navigation.navigate('BottomTabSp'); 
            navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTabSp' }],
                });}}
            text="Login Sp"
          />
          <MyButton
            onPressFunction={() => {navigation.navigate('Signup'); }}
            text="SignUp"
          />
          </View>
        );
      }