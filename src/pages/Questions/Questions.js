import React, {useState, useEffect} from "react";
import {StyleSheet, View, ImageBackground, TextInput} from "react-native";
import axios from "axios";
import AnimatedLottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/native";

import Header from "../../components/Header";
import Question from "./Question";

import {questionsURI} from "../../utilities/config";
import {SelectList} from "react-native-dropdown-select-list";
import {ScrollView} from "react-native-gesture-handler";

const Questions = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([
    {
      id: "",
      question: "",
      answer: "",
      material: "",
      year: "",
      turn: "",
    },
  ]);

  const [material, setMaterial] = useState("");
  const [year, setYear] = useState("");
  const [turn, setTurn] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    const data = await axios.get(questionsURI);
    setData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, [data]);

  return (
    <ImageBackground
      source={require("../../../assets/Bg.png")}
      style={"flex:1"}>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.mainView}>
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
                marginVertical: 10,
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
                marginVertical: 10,
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
                marginVertical: 10,
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

          <ScrollView style={styles.listView}>
            {loading ? (
              <AnimatedLottieView
                source={require("../../../assets/loading.json")}
                autoPlay
                loop
                style={styles.loading}
              />
            ) : (
              data
                .filter(item => {
                  if (item.year.includes(year))
                    if (item.turn.includes(turn))
                      if (item.material.includes(material)) return item;
                })
                .map((item, key) => {
                  return <Question item={item} key={key} />;
                })
            )}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
  },
  mainView: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    direction: "rtl",
    textAlign: "left",
  },
  searchBar: {
    height: 50,
    width: 390,
    paddingRight: 15,
    overflow: "hidden",
    direction: "rtl",
    textAlign: "right",
    display: "flex",
  },
  searchView: {
    backgroundColor: "#f5f5f5",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  searchIcon: {
    height: "100%",
    width: 60,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listView: {
    width: "95%",
  },
  loading: {
    width: 300,
    alignSelf: "center",
  },
});
