import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, SectionList} from 'react-native';
import MyButton from '../../components/MyButton';
import styles from "../../constants/styles";

export default function addProjectSp({navigation}) {
    return (
      <View style={styles.container}>
        <Text>add new project specialist screen</Text>
        <MyButton
            text = "save"
            onPressFunction={() => {navigation.navigate('Projects'); }}
        />
      </View>
    );
  }