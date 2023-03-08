import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  Touchable,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AnimatedLottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/native";

import Header from "../../components/Header";
import Question from "./Question";

import {questionsURI} from "../../utilities/config";
import {ScrollView} from "react-native-gesture-handler";
import {Shadow} from "react-native-shadow-2";
import BouncyCheckbox from "react-native-bouncy-checkbox";
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

  const [loading, setLoading] = useState(Boolean);

  const fetchQuestions = async () => {
    setLoading(true);
    await axios
      .get(`${questionsURI}/${body.material}?unit=${body.unit}`)
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      });
    setLoading(false);
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

  // Output: [{ name: 'Object 2', years: [2002, 2003, 2004] }]

  useEffect(() => {
    fetchQuestions();
  }, []);

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
          }}>
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
              width: 90,
              height: 50,
              backgroundColor: "transparent",
              borderColor: "transparent",
              color: "#000",
              borderRadius: 0,
              marginHorizontal: 10,
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
          <TouchableOpacity
            onPress={filter}
            style={{
              height: 50,
              width: 40,
              justifyContent: "center",
              marginHorizontal: 10,
            }}>
            <Image
              source={require("../../../assets/search.png")}
              style={{
                height: 40,
                width: 40,
                resizeMode: "contain",
                top: 0,
              }}
            />
          </TouchableOpacity>
        </View>
      </Shadow>
      <ScrollView style={styles.listView}>
        {loading ? (
          <AnimatedLottieView
            source={require("../../../assets/loading.json")}
            autoPlay
            loop
            style={styles.loading}
          />
        ) : (
          filteredData.map((item, key) => {
            return <Question item={item} key={key} />;
          })
        )}
      </ScrollView>
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
