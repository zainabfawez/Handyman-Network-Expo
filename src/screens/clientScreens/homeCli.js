import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
//import MapboxGL from '@react-native-mapbox-gl/maps';
import MapView ,{Callout, Marker} from 'react-native-maps';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";


export default function homeCli({navigation}) {
  return (
    <View style={style.container}>
      <MapView
        style={style.map}
        initialRegion={{
          latitude: 33.895020,
          longitude: 35.501835,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        
      <Marker
      
        coordinate={{ latitude : 33.895020 , longitude : 35.501835 }}
    
      >
        <Callout onPress = {() => {navigation.navigate('ProfileSp');}}>
          <View>
            <Text>ahla zooooz</Text>
            <Text>description</Text>
          </View>
        </Callout>
      </Marker>
      </MapView>
      <MyButton
        text = "go to specialist Profile"
        onPressFunction={() => {navigation.navigate('ProfileSp');}}
      />
    </View>

  );
}

const style = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex : 1,
  }
});
