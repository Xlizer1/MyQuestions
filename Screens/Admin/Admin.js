import { StyleSheet, View, ImageBackground, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import Header from '../../Components/Header'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { firebase} from '../../utilities/firebaseConfig'
import axios from 'axios';
import { updateNewsURI } from '../../utilities/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Admin({ route }) {
    const item = route.params;
    const [uploading, setUploading] = useState(false);

    const [news, setNews] = useState({
      title: '',
    });

    const [image, setImage] = useState(null);

    const handelChange = (text) => {
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

    const uploadImage = async () => {
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

        await axios.put(`${updateNewsURI}/${item._id}`, data, config).then((res) => {
          console.log(res.data);
        }).catch((e) => {
          console.log(e);
        })
        }, 3000);
    }
    
    return (
    <ImageBackground source={require('../../assets/Bg.png')} style={"flex:1"}>
        <View style={styles.container}>
          <Header />
          <View style={{ borderBottomWidth: 2, borderBottomColor: '#f5f5f5', width: 150 }}><Text style={{ marginTop: 20, marginBottom: 10, fontSize: 26, fontWeight: 'bold', color: '#f5f5f5',  textAlign: 'center' }}>تعديل الخبر</Text></View>
          <View style={ styles.listView }>
            <TextInput 
              style={ styles.title }
              placeholder='العنوان'
              onChangeText={ handelChange }
              value= { news.title }
            />
            {image && <Image source={{uri: image}} style={{width: 170 , height: 200}}/>}
            <TouchableOpacity onPress={ pickImage }><Text style={{}}>تحميل صوره</Text></TouchableOpacity>
            {!uploading ? <Button title='Upload Image' onPress={ uploadImage } />: <ActivityIndicator size={'small'} color='black' />}
          </View>
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      display: 'flex',
      alignItems:'center',
      paddingTop:50,
    },
    question: {
      width: '100%',
      backgroundColor: '#f5f5f5',
      borderRadius: 18,
      marginVertical: 5,
    },
    content: {
      color: 'black',
      fontSize: 18,
      textAlign: 'right',
      width: '100%',
      padding: 10,
    },
    image:{
      width: '100%',
      height: 200,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
    },
    listView:{
      width: '95%',
      alignItems: 'center',
    },
    title:{
      width: '80%',
      minHeight: 50,
      backgroundColor: '#f5f5f5',
      direction:'rtl',
      textAlign:'right',
      marginVertical: 20,
    },
})