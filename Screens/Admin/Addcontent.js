import { StyleSheet, View, ImageBackground, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../firebaseConfig';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { addNewsURI, addQuestionsURI } from '../config';
import Header from '../../Components/Header';

const Addcontent = () => {

    const [question, setQuestion] = useState({
        title: '',
        answer: '',
        keyWord: '',
        youtubeLink: ''
    });

    const [news, setNews] = useState({
        title: '',
    });

    const [uploading, setUploading] = useState(false);

    const [image, setImage] = useState(null);

    const handelQuestionTitleChange = (text) => {
        setQuestion({
          ...question,
          title: text
        });
    };

    const handelAnswerChange = (text) => {
        setQuestion({
          ...question,
          answer: text
        });
    };

    const handelKeyWordChange = (text) => {
        setQuestion({
          ...question,
          keyWord: text
        });
    };

    const handelYoutubeLinkChange = (text) => {
        setQuestion({
          ...question,
          youtubeLink: text
        });
    };

    const handelNewsChange = (text) => {
        setNews({
          ...news,
          title: text
        });
    };
    
    const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    });

    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
    };

    const addNews = async () => {
        if(!image) {
            const data = {
                title: news.title,
                image: ''
            }

            
            const config = {
                headers: {
                    'Authorization': JSON.parse(await AsyncStorage.getItem('token')),
                }
            };

            await axios.post(addNewsURI, data, config)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            })
        } else {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                resolve(xhr.response);
                };
                xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', image, true);
                xhr.send(null);
            })
            
            const ref = firebase.storage().ref().child(`Pictures/Image1`)
            const snapshot = ref.put(blob)
            snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
                ()=>{
                setUploading(true)
                },
                (error) => {
                setUploading(false)
                console.log(error)
                blob.close()
                return 
                },
                () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploading(false)
                    console.log("Download URL: ", url)
                    setImage(url)
                    blob.close()
                    return url
                })
                }
                )
                
            setTimeout(async () => {
            
                const data = {
                    title: news.title,
                    image: image
                }

                
                const config = {
                    headers: {
                        'Authorization': JSON.parse(await AsyncStorage.getItem('token')),
                    }
                };

                await axios.post(`${addNewsURI}`, data, config)
                .then((res) => {
                    console.log(res.data);
                }).catch((e) => {
                    console.log(e);
                })
            }, 3000);
        }
    }

    const addQuestion = async () => {
        
        const data = {
            title: question.title,
            answer: question.answer,
            keyWord: question.keyWord,
            youtubeLink: question.youtubeLink
        }

        const config = {
            headers: {
                'Authorization': JSON.parse(await AsyncStorage.getItem('token')),
            }
        };

        await axios.post(addQuestionsURI, data, config)
        .then((res) => {
            alert(res.data);
        })
    }

    return (
        <ImageBackground source={require('../../assets/Bg.png')} style={"flex:1"}>
            <View style={styles.maincontainer}>
              <Header />
              <View style={{ borderBottomWidth: 2, borderBottomColor: '#f5f5f5', width: 150 }}><Text style={{ marginTop: 20, marginBottom: 10, fontSize: 26, fontWeight: 'bold', color: '#f5f5f5',  textAlign: 'center' }}>تحميل المحتوى</Text></View>
              <ScrollView style={ styles.container }>
              <View style={ styles.inputsContainers }>
                    <Text style={{ marginTop: 20, marginBottom: 10, fontSize: 26, fontWeight: 'bold', color: '#f5f5f5' }}>اضافة سؤال</Text>
                    <TextInput 
                        placeholder='السؤال'
                        placeholderTextColor={'#616161'}
                        style={ styles.input }
                        onChangeText={ (text) => handelQuestionTitleChange(text) }
                        value={ question.title }
                        multiline= { true }
                        
                    />
                    <TextInput 
                        placeholder='الاجابة'
                        placeholderTextColor={'#616161'}
                        style={ styles.input }
                        onChangeText={ (text) => handelAnswerChange(text) }
                        value={ question.answer }
                    />
                    <TextInput 
                        placeholder='كلمات مفتاحية'
                        placeholderTextColor={'#616161'}
                        style={ styles.input }
                        onChangeText={ (text) => handelKeyWordChange(text) }
                        value={ question.keyWord }
                    />
                    <TextInput 
                        placeholder='رابط اليوتيوب'
                        placeholderTextColor={'#616161'}
                        style={ styles.input }
                        onChangeText={ (text) => handelYoutubeLinkChange(text) }
                        value={ question.youtubeLink }
                    />
                    <TouchableOpacity style={ styles.button1 } onPress={ addQuestion }><Text style={{ fontWeight: 'bold', fontSize: 18}}>إضافة السؤال</Text></TouchableOpacity>
                </View>
                <View style={ styles.question }>
                    <Text style={{ marginTop: 20, marginBottom: 10, fontSize: 26, fontWeight: 'bold', color: '#f5f5f5' }}>إضافة خبر</Text>
                    {image && <Image source={{uri: image}} style={{width: 170 , height: 200, alignSelf: 'center'}}/>}
                    <TouchableOpacity onPress={ pickImage } style= { styles.button2 }><Text>إختيار صورة</Text></TouchableOpacity>
                    <TextInput 
                        placeholder='العنوان'
                        placeholderTextColor={'#616161'}
                        style={ styles.input }
                        onChangeText={ (text) => handelNewsChange(text) }
                        value={ news.title }
                        multiline= { true }
                    />
                    {!uploading ? <TouchableOpacity style={ styles.button1 } onPress={ addNews }><Text style={{ fontWeight: 'bold', fontSize: 18}}>إضافة الخبر</Text></TouchableOpacity>: <ActivityIndicator size={'small'} color='black' />}
                </View>
              </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Addcontent

const styles = StyleSheet.create({
    maincontainer: {
      height: '100%',
      display: 'flex',
      alignItems:'center',
      paddingTop:50,
    },
    container:{
        width: '95%',
    },
    inputsContainers: {
      marginVertical: 20,
      borderRadius: 18,
      borderBottomColor: '#f5f5f5',
      borderBottomWidth: 1,
    },
    input: {
      height: 50,
      width: '100%',
      color: '#616161',
      borderRadius: 10,
      backgroundColor: '#f5f5f5',
      marginBottom: 20,
      fontSize: 20,
      textAlign: 'right',
      paddingRight: 10
    },
    button1: {
        marginVertical: 20,
        backgroundColor: '#14FF9C',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    button2: {
        marginVertical: 20,
        backgroundColor: '#14FF9C',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        width: '95%'
    }
})