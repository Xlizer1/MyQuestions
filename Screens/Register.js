import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { registerURI } from '../Utility/APIs';
import Lottie from 'lottie-react-native'

const Register = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handelFirstNameChange = (text) => {
    setUser({
      ...user,
      firstName: text
    });
  };

  const handelLastNameChange = (text) => {
    setUser({
      ...user,
      lastName: text
    });
  };

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


  const register = () => {
    axios.post(registerURI, user).then( (res) => {
        setLoading(true);
        const data = res.data;
        if(!data.token){
          alert(data);
        } else {
          AsyncStorage.setItem('token', data.token);
          navigation.navigate('Home');
        }
      }).catch( e => {
        console.log(e);
      });
    }

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={require('../assets/Bg.png')} style={"flex:1"}>
      <View style={styles.container}>
        <Image source={require('../assets/Logo.png')} style={ styles.logo }/>
        <View style={ styles.mainView }>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: '#f5f5f5'}}>تسجيل</Text>
          <TextInput 
            placeholder='الأسم الاول'
            placeholderTextColor={'#f5f5f5'}
            onChangeText={(text) => handelFirstNameChange(text) }
            style={ styles.input }
            value={ user.firstName }
          />
          <TextInput 
            placeholder='الأسم الاخير'
            placeholderTextColor={'#f5f5f5'}
            onChangeText={(text) => handelLastNameChange(text) }
            style={ styles.input }
            value={ user.lastName }
          />
          <TextInput 
            placeholder='البريد الالكتروني'
            placeholderTextColor={'#f5f5f5'}
            onChangeText={(text) => handelEmailChange(text) }
            style={ styles.input }
            value={ user.email }
          />
          <TextInput 
            placeholder='كلمة المرور'
            placeholderTextColor={'#f5f5f5'}
            onChangeText={(text) => handelPasswordChange(text) }
            style={ styles.input }
            value={ user.password }
          />
          <TouchableOpacity style={ styles.button } onPress={ register }>{loading? <Lottie  source={require('../assets/loadingButton.json')} autoPlay loop/> : <Text style={ styles.buttonText }>تسجيل</Text> }</TouchableOpacity>
          <View style={{ flexDirection: 'row' }}><Text style={{ fontWeight: 'bold', marginRight: 3 }} onPress={ navigateToLogin }>تسجيل الدخول</Text><Text>لديك حساب؟</Text></View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Register;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems:'center',
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
  },
});
