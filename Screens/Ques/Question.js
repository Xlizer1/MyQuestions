import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { deleteQuestionURI } from '../../Utility/APIs';

const Question = ({ item }) => {
  const [admin, setAdmin] = useState(Boolean);

  const navigation = useNavigation();

  const questionDetails = () => {
    navigation.navigate('Question_Details', { item });
  }
  
  const validateAdmin = async () => {
    const msg = await AsyncStorage.getItem('msg');
      if(msg) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
  }

  const deleteQuestion = async(id) => {
    const token = await AsyncStorage.getItem('token')
    try {
      const config = {
        headers: {
          Authorization: token
        }
      }

      await axios.delete(`${deleteQuestionURI}/${id}`, config).then( (res) => {
        console.log(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    validateAdmin();
  }, [])

  return (
    <View style={{ backgroundColor: '#f5f5f5' , borderRadius: 18, marginBottom: 10}}>
      <TouchableOpacity style={ styles.question } onPress={ questionDetails }>
        <Text style={ styles.ques }>{item._id}</Text>
        <Text style={ styles.ans }>{item.answer}</Text>
        <View style={ styles.border }></View>
        <Text style={ styles.yesr }>{item.keyWord}</Text>
      </TouchableOpacity>
      {admin ? 
        <View style={ styles.AdminButtons }>
          <TouchableOpacity style={ styles.button1 } onPress={ () => deleteQuestion(item._id) }><Text style={{ fontSize: 18, fontWeight: 'bold' }}>حذف</Text></TouchableOpacity>
          <TouchableOpacity style={ styles.button2 }><Text style={{ fontSize: 18, fontWeight: 'bold' }}>تعديل</Text></TouchableOpacity>
        </View> : <></>
      }
    </View>
  )
}

export default Question;

const styles = StyleSheet.create({
  question: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 18,
  },
  ques: {
    color: 'black',
    fontSize: 18,
    direction: 'ltr',
    textAlign: 'right',
    width: '100%',
  },
  ans: {
    color: 'black',
    fontSize: 12,
    textAlign: 'right',
    direction: 'ltr',
    marginTop: 10,
  },
  yesr: {
    color: 'black',
    fontSize: 10,
    direction: 'ltr',
    textAlign: 'right',
    marginTop: 10,
  },
  border: {
    borderTopWidth: 1,
    borderColor: '#919191',
    marginTop: 15,
    backgroundColor: '#f5f5',
  },
  AdminButtons: {
    flexDirection: 'row',
  },
  button1:{
      backgroundColor: '#FF4A4A',
      width: '50%',
      height: 40,
      borderTopRightRadius: 18,
      borderBottomLeftRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
  },
  button2:{
      backgroundColor: '#FED049',
      width: '50%',
      height: 40,
      borderTopLeftRadius: 18,
      borderBottomRightRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
  }
});
