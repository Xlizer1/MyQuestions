import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

import Header from '../Components/Header';

const Desitions = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/Bg.png')} style={"flex:1"}>
      <View style={styles.container}>
        <Header/>
          <View style={ styles.mainView}>
            <Text>Desitions</Text>
          </View>
      </View>
    </ImageBackground>
  )
}

export default Desitions;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    padding: 30,
    paddingTop:40
  },
});
