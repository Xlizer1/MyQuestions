import React, { useState } from 'react';

import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground, 
  TextInput, 
  TouchableOpacity, 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { loginURI } from '../Utility/APIs'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native'

const Login = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(Boolean);

  const handelEmailChange = (text) => {
    setUser({
      ...user,
      email: text
    });
  };

  const handelPasswordChange = (text) => {
    setUser({
      ...user,
      password: text
    });
  };


  const login = () => {
    axios.post(loginURI, user).then( async (res) => {
        setLoading(true);
        const data = res.data;
        if(!data.token){
          alert(data);
        } else {
          const rowToken = data.token;
          const token = JSON.stringify(rowToken);
          if(data.msg) {
            const rowMsg = data.msg;
            const msg = JSON.stringify(rowMsg);
            await AsyncStorage.setItem("msg", msg);
          }
          try {
            await AsyncStorage.setItem("token", token);
            navigation.navigate('Home');
          } catch (error) {
            alert(error)
          }
        }
        setLoading(false);
      }).catch( e => {
        alert(e);
      });
    }

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };
  
  return (
    <ImageBackground source={require('../assets/Bg.png')} style={"flex:1"}>
      <View style={styles.container}>
        <Image source={require('../assets/Logo.png')} style={ styles.logo }/>
        <View style={ styles.mainView }>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: '#f5f5f5'}}>تسجيل الدخول</Text>
          <TextInput 
            placeholder='البريد الالكتروني'
            placeholderTextColor={'#f5f5f5'}
            onChangeText={ (text) => handelEmailChange(text) }
            style={ styles.input }
            value={ user.email }
          />
          <TextInput 
            placeholder='كلمة المرور'
            placeholderTextColor={'#f5f5f5'}
            onChangeText={ (text) => handelPasswordChange(text) }
            style={ styles.input }
            value={ user.password }
            secureTextEntry={true}
          />
          <TouchableOpacity style={ styles.button } onPress={ login }>{loading? <Lottie  source={require('../assets/loadingButton.json')} autoPlay loop/> : <Text style={ styles.buttonText }>تسجيل الدخول</Text> }</TouchableOpacity>
          <View style={{ flexDirection: 'row'}}><Text style={{ fontWeight: 'bold', marginRight: 3}} onPress={ navigateToRegister }>تسجيل</Text><Text>لديك حساب؟</Text></View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingTop:50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  mainView: {
    alignItems:'center',
    width: '80%',
  },
  input: {
    height: 50,
    width: '100%',
    color: '#f5f5f5',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'right'
  },
  button:{
    width: 150,
    height: 50,
    backgroundColor: '#14FF9C',
    borderRadius: 18,
    marginTop: 35,
    marginBottom:25,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText:{
    color: '#40514E',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
