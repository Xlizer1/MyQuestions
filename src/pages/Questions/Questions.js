import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import axios from "axios";
import AnimatedLottieView from "lottie-react-native";
import {useIsFocused, useNavigation} from "@react-navigation/native";

import Header from "../../components/Header";
import Question from "./Question";

import {questionsURI} from "../../utilities/config";
import {
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {Shadow} from "react-native-shadow-2";
import {MultipleSelectList} from "react-native-dropdown-select-list";

const Questions = ({route}) => {
  const navigation = useNavigation();

  const {body} = route.params;

  const [data, setData] = useState([
    {
      id: "",
      title: "",
      answer: "",
      material: "",
      year: [],
      unit: "",
      turn: "",
    },
  ]);

  const [years, setYears] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      fetchQuestions();
    }
  }, [isFocused]);

  const fetchQuestions = async () => {
    setLoading(true);
    await axios
      .get(`${questionsURI}/${body.material}?unit=${body.unit}`)
      .then(res => {
        setData(res.data.reverse());
        setFilteredData(res.data);
        setLoading(false);
        console.log(res.data);
      });
  };

  const [filteredData, setFilteredData] = useState([]);

  const filter = () => {
    const filtered = data.filter(obj =>
      years.some(year => obj.year.includes(year)),
    );
    if (!filtered.length) {
      setFilteredData(data);
      return;
    }
    setFilteredData(filtered);
  };

  const searchFilter = text => {
    if (text) {
      const newData = filteredData.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchQuery(text);
    } else {
      fetchQuestions();
      setSearchQuery(text);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Shadow
        distance={0}
        startColor={"#000"}
        endColor={"#000"}
        offset={[-5, 14]}
        style={{
          marginVertical: 10,
        }}>
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            height: 50,
            width: 370,
            borderWidth: 2,
            borderColor: "#000",
            justifyContent: "space-between",
            padding: 3,
          }}>
          <View style={{flexDirection: "row"}}>
            <TextInput
              style={{
                borderColor: "#000",
                borderWidth: 1,
                width: 220,
                marginRight: 5,
                paddingLeft: 15,
                textAlign: "right",
              }}
              placeholder="اكتب سؤالك"
              placeholderTextColor="#808080"
              onChangeText={text => searchFilter(text)}
              value={searchQuery}
            />
            <MultipleSelectList
              inputStyles={{fontWeight: "bold", color: "#000"}}
              checkBoxStyles={{borderColor: "#000"}}
              labelStyles={{fontWeight: "bold", color: "#000"}}
              setSelected={val => setYears(val)}
              label="السنوات"
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
              dropdownTextStyles={{fontWeight: "bold", color: "#000"}}
              save="value"
              boxStyles={{
                width: 80,
                height: 40,
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#000",
                color: "#000",
                borderRadius: 0,
              }}
              placeholder="السنة"
              search={false}
              dropdownStyles={{
                position: "absolute",
                zIndex: 10,
                top: 40,
                width: 100,
                alignItems: "center",
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: "#000",
                borderRadius: 0,
              }}
              badgeStyles={{display: "none"}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              filter();
              Keyboard.dismiss();
            }}
            style={{
              width: 40,
              justifyContent: "center",
            }}>
            <Image
              source={require("../../../assets/search.png")}
              style={{
                width: 30,
                resizeMode: "contain",
                top: 0,
              }}
            />
          </TouchableOpacity>
        </View>
      </Shadow>
      <View style={styles.listView}>
        {loading ? (
          <AnimatedLottieView
            source={require("../../../assets/loading.json")}
            autoPlay
            loop
            style={styles.loading}
          />
        ) : !filteredData.length ? (
          <View
            style={{
              height: Dimensions.get("screen").height / 2,
              width: 370,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{fontSize: 40}}>
              لا يوجد اسئلة حاليا لهذا الفصل, سنعمل على اضافتها قريبا !
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={({item}) => <Question item={item} />}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#00dd80",
    height: "100%",
  },
  listView: {
    zIndex: -1,
  },
  loading: {
    width: 300,
    alignSelf: "center",
  },
});
