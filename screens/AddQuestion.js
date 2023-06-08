import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Radio, RadioGroup } from "@ui-kitten/components";
import AppFunctions from "../services/AppService";
import Modal from "react-native-modal";

export default AddQuestion = () => {
  const { width } = Dimensions.get("screen");

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [youtubeLink, setYoututbeLink] = useState("");
  const [unitIndex, setUnitIndex] = useState(null);
  const [subjectIndex, setSubjectIndex] = useState(null);
  const [selectedYear, setSelectedYear] = useState({});
  const [selectedTurn, setSelectedTurn] = useState({});
  const [yearsAndTurns, setYearsAndTurns] = useState([]);
  const [showYearsAndTurns, setShowYearsAndTurns] = useState(false);
  const [loading, setLoading] = useState(false);

  const years = [
    { id: 0, name: 2014 },
    { id: 1, name: 2015 },
    { id: 2, name: 2016 },
    { id: 3, name: 2017 },
    { id: 4, name: 2018 },
    { id: 5, name: 2019 },
    { id: 6, name: 2020 },
    { id: 7, name: 2021 },
    { id: 8, name: 2022 },
  ];
  const turns = [
    { id: 0, name: "تمهيدي" },
    { id: 1, name: "الدور الاول" },
    { id: 2, name: "الدور الثاني" },
    { id: 3, name: "الدور الثالث" },
    { id: 4, name: "الدور الرابع" },
  ];

  const addQuestion = async () => {
    setLoading(true);
    if (
      !question ||
      !answer ||
      !yearsAndTurns.length ||
      !unitIndex ||
      !subjectIndex
    ) {
      Alert.alert("", "يرجى اضافة جميع تفاصيل السؤال");
      setLoading(false);
      return;
    }

    const result = await AppFunctions.AddQuestion({
      question: question,
      answer: answer,
      video_link: youtubeLink,
      yearsAndTurns: JSON.stringify(yearsAndTurns),
      subject_id: subjectIndex,
      unit_id: unitIndex,
    });

    console.log(result);

    if (result.status === true && result.data.data.affectedRows == 1) {
      setLoading(false);
      Alert.alert("", "تم اضافة السؤال");
    } else if (result?.status == false && result.data === "Network Error") {
      setLoading(false);
      Alert.alert("", "لا يوجد اتصال بالشبكة!");
      console.log(result);
    } else {
      setLoading(false);
      Alert.alert("", "حدث خطأ ما!");
    }
  };

  const clearObj = () => {
    setQuestion(null);
    setAnswer(null);
    setUnitIndex(null);
    setSubjectIndex(null);
    setYearsAndTurns([]);
  };

  const handelAddYearsAndTurns = () => {
    if (!selectedTurn.name || !selectedYear.name) {
      Alert.alert("", "يرجى اختيار السنة والدور حصرا");
      return;
    }

    let yearAndTurn = `${selectedYear.name} - ${selectedTurn.name}`;
    setYearsAndTurns(() => [...yearsAndTurns, yearAndTurn]);
  };

  const handleDeleteItem = (index) => {
    const updatedArray = [...yearsAndTurns]; // create a copy of the array
    updatedArray.splice(index, 1); // remove the item at the specified index
    setYearsAndTurns(updatedArray); // update the state with the modified array
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={question}
        placeholder="السؤال"
        onChangeText={(e) => setQuestion(e)}
        multiline
        style={{
          backgroundColor: "#DDE6ED",
          height: 60,
          borderRadius: 7,
          padding: 10,
          fontFamily: "Cairo_700Bold",
          fontSize: 18,
          marginBottom: 5,
        }}
      />
      <TextInput
        value={answer}
        placeholder="الاجابة"
        onChangeText={(e) => setAnswer(e)}
        multiline
        style={{
          backgroundColor: "#DDE6ED",
          height: 60,
          borderRadius: 7,
          padding: 10,
          fontFamily: "Cairo_700Bold",
          fontSize: 18,
          marginBottom: 5,
        }}
      />
      <TextInput
        value={youtubeLink}
        placeholder="رابط الفيديو"
        onChangeText={(e) => setYoututbeLink(e)}
        style={{
          backgroundColor: "#DDE6ED",
          height: 60,
          borderRadius: 7,
          padding: 10,
          fontFamily: "Cairo_700Bold",
          fontSize: 18,
          marginBottom: 5,
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#DDE6ED",
          minHeight: 60,
          borderRadius: 7,
          padding: 10,
          marginBottom: 5,
          flexWrap: "wrap",
          flexDirection: "row",
          columnGap: 5,
          rowGap: 5,
          alignItems: "center",
        }}
        onPress={() => setShowYearsAndTurns(true)}
      >
        {!yearsAndTurns.length ? (
          <Text
            style={{
              fontFamily: "Cairo_700Bold",
              color: "grey",
              fontSize: 18,
              padding: 5,
            }}
          >
            السنة والدور
          </Text>
        ) : (
          yearsAndTurns.map((yearAndTurn, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#526D82",
                  padding: 5,
                  borderRadius: 5,
                  height: 40,
                }}
                onPress={() => handleDeleteItem(index)}
              >
                <Text
                  style={{
                    fontFamily: "Cairo_700Bold",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  {yearAndTurn}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#DDE6ED",
          borderRadius: 7,
          padding: 10,
        }}
      >
        <View
          style={{
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Cairo_700Bold",
              fontSize: 18,
            }}
          >
            المادة
          </Text>
          <RadioGroup
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              maxWidth: "100%",
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
            selectedIndex={subjectIndex - 1}
            onChange={(index) => {
              setSubjectIndex(index + 1);
            }}
          >
            <Radio>اسلامية</Radio>
            <Radio>عربي</Radio>
            <Radio>انكليزي</Radio>
            <Radio>اقتصاد</Radio>
            <Radio>احياء</Radio>
            <Radio>رياضيات</Radio>
            <Radio>فيزياء</Radio>
            <Radio>كيمياء</Radio>
          </RadioGroup>
        </View>
        <View
          style={{
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Cairo_700Bold",
              fontSize: 18,
            }}
          >
            الفصل
          </Text>
          <RadioGroup
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              maxWidth: "100%",
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
            selectedIndex={unitIndex - 1}
            onChange={(index) => {
              setUnitIndex(index + 1);
            }}
          >
            <Radio>الفصل الاول</Radio>
            <Radio>الفصل الثاني</Radio>
            <Radio>الفصل الثالث</Radio>
            <Radio>الفصل الرابع</Radio>
            <Radio>الفصل الخامس</Radio>
            <Radio>الفصل السادس</Radio>
            <Radio>الفصل السابع</Radio>
            <Radio>الفصل الثامن</Radio>
            <Radio>الفصل التاسع</Radio>
            <Radio>الفصل العاشر</Radio>
          </RadioGroup>
        </View>
      </View>
      <TouchableOpacity
        style={{ alignItems: "center", marginBottom: 20 }}
        onPress={async () => {
          await addQuestion();
          clearObj();
        }}
      >
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#DDE6ED",
            width: 160,
            height: 60,
            borderRadius: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!loading ? (
            <Text
              style={{
                fontFamily: "Cairo_700Bold",
              }}
            >
              اضافة
            </Text>
          ) : (
            <ActivityIndicator size="small" color="#000" />
          )}
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={showYearsAndTurns}
        onBackdropPress={() => setShowYearsAndTurns(!showYearsAndTurns)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#DDE6ED",
            width: width - 40,
            borderRadius: 7,
            padding: 10,
            rowGap: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Cairo_700Bold",
              color: "grey",
              fontSize: 18,
              width: "100%",
            }}
          >
            السنة
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 5,
              rowGap: 5,
            }}
          >
            {years.map((year, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      selectedYear?.id === year.id ? "#27374D" : "#526D82",
                    padding: 5,
                    borderRadius: 5,
                    width: 80,
                    height: 40,
                  }}
                  onPress={() => setSelectedYear(year)}
                >
                  <Text
                    style={{
                      fontFamily: "Cairo_700Bold",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    {year?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text
            style={{
              fontFamily: "Cairo_700Bold",
              color: "grey",
              fontSize: 18,
              width: "100%",
            }}
          >
            الدور
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 5,
              rowGap: 5,
            }}
          >
            {turns.map((turn, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      selectedTurn?.id === turn.id ? "#27374D" : "#526D82",
                    padding: 5,
                    borderRadius: 5,
                    width: 80,
                    height: 40,
                  }}
                  onPress={() => setSelectedTurn(turn)}
                >
                  <Text
                    style={{
                      fontFamily: "Cairo_700Bold",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    {turn?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ width: "100%", flexDirection: "row", columnGap: 5 }}>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderColor: "#526D82",
                borderWidth: 1,
                width: 100,
                height: 45,
                borderRadius: 7,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setShowYearsAndTurns(false);
                setSelectedTurn({});
                setSelectedYear({});
              }}
            >
              <Text
                style={{
                  fontFamily: "Cairo_700Bold",
                  color: "#526D82",
                }}
              >
                اغلاق
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: "#526D82",
                width: 100,
                height: 45,
                borderRadius: 7,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                handelAddYearsAndTurns();
                setSelectedTurn({});
                setSelectedYear({});
              }}
            >
              <Text
                style={{
                  fontFamily: "Cairo_700Bold",
                  color: "#fff",
                }}
              >
                اضافة
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27374D",
    padding: 10,
  },
});
