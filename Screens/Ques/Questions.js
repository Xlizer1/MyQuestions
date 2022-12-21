import { StyleSheet, Text, View, ImageBackground, TextInput, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';

import Header from '../../Components/Header';
import { Feather } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Question from './Question.js';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import { questionsURI } from '../../Utility/APIs';

const Questions = ({ navigation }) => {
  const [data, setData] = useState([
    {
      id: '',
      question: '',
      answer: '',
      keyWord: ''
    }
  ])

  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('')

  const fetchQuestions = async() => {
    const data = await axios.get(questionsURI);
    setData(data.data);
    setLoading(false);
  }

  const handelSearch = (text) => {
    if (text) {
      const newArray = data.filter((item) => {
        const itemData = item.keyWord.toString();
        const itemData2 = item.title.toString();
        const textData = text.toString();
        return itemData.indexOf(textData) !== -1 || itemData2.indexOf(textData) !== -1;
      });

      setFilteredQuestions(newArray);
      setSearch(text);

    } else {
      setFilteredQuestions(data);
      setSearch(text);
    }
  };

  useEffect(() => {
    fetchQuestions();
    setFilteredQuestions(data);
  }, [data]);
  
  return (
      <ImageBackground source={require('../../assets/Bg.png')} style={"flex:1"}>
        <View style={styles.container}>
          <Header navigation={ navigation } />
            <View style={ styles.mainView}>
              <View style={ styles.searchView } >
                <View style={ styles.searchIcon }>
                  <Feather name="search" size={30} color="#616161"/>
                </View>
                <TextInput 
                  style = { styles.searchBar }
                  placeholder = "اكتب سؤالك"
                  onChangeText={(text) => handelSearch(text)}
                  value={search}
                />
              </View>
              <View style={ styles.listView }>
                {loading ? <Lottie source={require('../../assets/loading.json')} autoPlay loop style={ styles.loading }/> : <FlatList 
                  data={filteredQuestions} 
                  keyExtractor={(item, index) => index}
                  contentContainerStyle={{ paddingBottom: 250 }}
                  renderItem={({item}) => (
                    <Question item={ item }/>
                  )}
                />}
              </View>
            </View>
            <Footer navigation={ navigation }/>
        </View>
      </ImageBackground>
  )
}

export default Questions;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems:'center',
    paddingTop:50,
  },
  mainView:{
    width: '100%',
    display:'flex',
    alignItems: 'center',
    direction: 'rtl',
    textAlign: 'left',
  },
  searchBar:{
    height: 50,
    width: '80%',
    paddingRight:15,
    overflow: 'hidden',
    direction:'rtl',
    textAlign:'right',
    display:'flex',
  },
  searchView:{
    backgroundColor: '#f5f5f5',
    width: '80%',
    height: 50,
    borderRadius: 18,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  searchIcon:{
    height: '100%',
    width: 60,
    borderRadius: 18,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView:{
    width: '95%',
    height: '100%',
  },
  loading:{
    marginTop: -80
  }
});
