import * as React from 'react';
import { Text, View } from 'react-native';
//import MapboxGL from '@react-native-mapbox-gl/maps';
import MapView from 'react-native-maps';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";


export default function homeCli({navigation}) {
  return (
    <View style={styles.container}>
      <Text> this is Home Client Map View </Text>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <MyButton
        text = "go to specialist Profile"
        onPressFunction={() => {navigation.navigate('Profile');
       }}
      />
    </View>

  );
}