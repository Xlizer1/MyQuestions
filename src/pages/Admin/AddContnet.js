import React, {useState, useContext} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import axios from "axios";
import {launchImageLibrary} from "react-native-image-picker";
import {SelectList} from "react-native-dropdown-select-list";

import Header from "../../components/Header";

import {firebase} from "../../utilities/firebaseConfig";

import {addNewsURI, addQuestionsURI} from "../../utilities/config";
import {Context} from "../../context/Provider";

const AddContnet = () => {
  const {userInfo} = useContext(Context);

  const [news, setNews] = useState("");
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [material, setMaterial] = useState("");
  const [year, setYear] = useState("");
  const [turn, setTurn] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaTypes: "photo",
      quality: 1,
    });

    if (!result.didCancel) setImage(result.assets[0].uri);
    return;
  };

  const addNews = async () => {
    if (!image) {
      const data = {
        title: news,
        image: "",
      };

      const config = {
        headers: {
          Authorization: userInfo.token,
        },
      };

      await axios
        .post(addNewsURI, data, config)
        .then(res => {
          alert(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child(`Pictures/Image1`);
      const snapshot = ref.put(blob);
      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          setUploading(true);
        },
        error => {
          setUploading(false);
          console.log(error);
          blob.close();
          return;
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then(url => {
            setUploading(false);
            setImage(url);
            blob.close();
            return url;
          });
        },
      );

      setTimeout(async () => {
        const data = {
          title: news,
          image: image,
        };

        const config = {
          headers: {
            Authorization: userInfo.token,
          },
        };

        await axios
          .post(`${addNewsURI}`, data, config)
          .then(res => {
            alert(res.data);
          })
          .catch(e => {
            console.log(e);
          });
      }, 5000);
    }
  };

  const addQuestion = async () => {
    const data = {
      title: title,
      answer: answer,
      material: material,
      year: year,
      turn: turn,
      youtubeLink: youtubeLink,
    };

    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    await axios.post(addQuestionsURI, data, config).then(res => {
      alert(res.data);
    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/Bg.png")}
      style={"flex:1"}>
      <View style={styles.maincontainer}>
        <Header />
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#f5f5f5",
            width: 150,
          }}>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 10,
              fontSize: 26,
              fontWeight: "bold",
              color: "#f5f5f5",
              textAlign: "center",
            }}>
            تحميل المحتوى
          </Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.inputsContainers}>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 26,
                fontWeight: "bold",
                color: "#f5f5f5",
              }}>
              اضافة سؤال
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "95%",
              }}>
              <SelectList
                setSelected={val => setYear(val)}
                data={[
                  {key: "1", value: ""},
                  {key: "2", value: "2022"},
                  {key: "3", value: "2021"},
                  {key: "4", value: "2020"},
                  {key: "5", value: "2019"},
                  {key: "6", value: "2018"},
                  {key: "7", value: "2017"},
                  {key: "8", value: "2016"},
                  {key: "9", value: "2015"},
                  {key: "10", value: "2014"},
                ]}
                save="value"
                boxStyles={{
                  width: 100,
                  backgroundColor: "#f5f5f5",
                  borderColor: "#f5f5f5",
                  marginVertical: 15,
                  marginRight: 5,
                }}
                placeholder="السنة"
                search={false}
                dropdownStyles={{
                  position: "absolute",
                  zIndex: 10,
                  top: 50,
                  backgroundColor: "#f5f5f5",
                  width: 100,
                  alignItems: "center",
                }}
              />
              <SelectList
                setSelected={val => setTurn(val)}
                data={[
                  {key: "1", value: ""},
                  {key: "2", value: "اول"},
                  {key: "3", value: "ثاني"},
                  {key: "4", value: "ثالث"},
                  {key: "5", value: "رابع"},
                ]}
                save="value"
                boxStyles={{
                  width: 100,
                  backgroundColor: "#f5f5f5",
                  borderColor: "#f5f5f5",
                  marginVertical: 15,
                  marginRight: 5,
                }}
                placeholder="الدور"
                search={false}
                dropdownStyles={{
                  position: "absolute",
                  zIndex: 10,
                  top: 50,
                  backgroundColor: "#f5f5f5",
                  width: 100,
                  alignItems: "center",
                }}
              />
              <SelectList
                setSelected={val => setMaterial(val)}
                data={[
                  {key: "1", value: ""},
                  {key: "2", value: "اسلامية"},
                  {key: "3", value: "عربي"},
                  {key: "4", value: "اقتصاد"},
                  {key: "5", value: "رياضيات"},
                  {key: "6", value: "احياء"},
                  {key: "7", value: "كيمياء"},
                  {key: "8", value: "فيزياء"},
                ]}
                save="value"
                boxStyles={{
                  width: 100,
                  backgroundColor: "#f5f5f5",
                  borderColor: "#f5f5f5",
                  marginVertical: 15,
                }}
                placeholder="المادة"
                search={false}
                dropdownStyles={{
                  position: "absolute",
                  zIndex: 10,
                  top: 50,
                  backgroundColor: "#f5f5f5",
                  width: 100,
                  alignItems: "center",
                }}
              />
            </View>
            <TextInput
              placeholder="السؤال"
              placeholderTextColor={"#616161"}
              style={{
                height: 50,
                width: "100%",
                color: "#616161",
                borderRadius: 10,
                backgroundColor: "#f5f5f5",
                marginBottom: 20,
                fontSize: 20,
                textAlign: "right",
                paddingRight: 10,
                paddingTop: Platform.OS === "ios" ? 12 : 0,
              }}
              onChangeText={text => setTitle(text)}
              value={title}
              multiline={true}
            />
            <TextInput
              placeholder="الاجابة"
              placeholderTextColor={"#616161"}
              style={styles.input}
              onChangeText={text => setAnswer(text)}
              value={answer}
            />
            <TextInput
              placeholder="رابط اليوتيوب"
              placeholderTextColor={"#616161"}
              style={styles.input}
              onChangeText={text => setYoutubeLink(text)}
              value={youtubeLink}
            />
            <TouchableOpacity style={styles.button1} onPress={addQuestion}>
              <Text style={{fontWeight: "bold", fontSize: 18}}>
                إضافة السؤال
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.question}>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 26,
                fontWeight: "bold",
                color: "#f5f5f5",
                textAlign: "center",
              }}>
              إضافة خبر
            </Text>
            {image && (
              <Image
                source={{uri: image}}
                style={{width: 170, height: 200, alignSelf: "center"}}
              />
            )}
            <TouchableOpacity onPress={pickImage} style={styles.button2}>
              <Text style={{textAlign: "center"}}>إختيار صورة</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="العنوان"
              placeholderTextColor={"#616161"}
              style={styles.input}
              onChangeText={text => setNews(text)}
              value={news}
              multiline={true}
            />
            {!uploading ? (
              <TouchableOpacity style={styles.button1} onPress={addNews}>
                <Text style={{fontWeight: "bold", fontSize: 18}}>
                  إضافة الخبر
                </Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size={"small"} color="black" />
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default AddContnet;

const styles = StyleSheet.create({
  maincontainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
  },
  container: {
    width: "95%",
  },
  inputsContainers: {
    marginVertical: 20,
    borderRadius: 10,
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "100%",
    color: "#616161",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 20,
    fontSize: 20,
    textAlign: "right",
    paddingRight: 10,
  },
  button1: {
    marginVertical: 20,
    backgroundColor: "#14FF9C",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  button2: {
    marginVertical: 20,
    backgroundColor: "#14FF9C",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    width: "95%",
  },
});
