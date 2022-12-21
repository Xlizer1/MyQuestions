import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Footer = ({ navigation }) => {
  return (
    <View style={ styles.container }>
      <TouchableOpacity  style={ styles.button } onPress={() => navigation.push('Questions')}>
        <Feather name="search" size={24} color="#616161" />
        <Text>الاسئلة</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity  style={ styles.button } onPress={() => navigation.navigate('AcceptationGrades')}>
        <Entypo name="graduation-cap" size={24} color="#616161" />
        <Text>المعدلات</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={ styles.button } onPress={() => navigation.navigate('Desitions')}>
        <FontAwesome name="newspaper-o" size={24} color="#616161" />
        <Text>القرارات</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={ styles.button } onPress={() => navigation.navigate('Curriculum')}>
        <FontAwesome5 name="book" size={24} color="#616161" />
        <Text>المناهج</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={ styles.button } onPress={() => navigation.navigate('Home')}>
        <AntDesign name="home" size={24} color="#616161" />
        <Text>الرئيسية</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer;

const styles = StyleSheet.create({
  container:{
    width: 370,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  button:{
    width: 60,
    height: 60,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    color:"#616161",
  }
});
