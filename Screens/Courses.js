import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

import Header from '../Components/Header';

const Courses = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/Bg.png')} style={"flex:1"}>
      <View style={styles.container}>
        <Header/>
          <View style={ styles.mainView}>
            <Text>Courses</Text>
          </View>
        <Footer navigation={navigation}/>
      </View>
    </ImageBackground>
  )
}

export default Courses;

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
