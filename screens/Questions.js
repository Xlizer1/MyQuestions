import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import AppFunctions from "../services/AppService";
import QuestionCard from "../components/QuestionCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { RadioGroup, Radio } from "@ui-kitten/components";

export default Questions = () => {
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search_text, setSearch_text] = useState("");
  const [year, setYear] = useState(null);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [searching, setSearching] = useState(false);
  const [totalRows, setTotalRows] = useState(null);
  const [unitIndex, setUnitIndex] = useState(null);
  const [subjectIndex, setSubjectIndex] = useState(null);
  const [unitIndexEdit, setUnitIndexEdit] = useState(null);
  const [subjectIndexEdit, setSubjectIndexEdit] = useState(null);
  const [turnIndex, setTurnIndex] = useState(null);
  const [subjectsList, setSubjectsList] = useState([]);
  const [turnsList, setTurnsList] = useState([]);
  const [unitsList, setUnitsList] = useState([]);

  const { width, height } = Dimensions.get("screen");

  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [youtubeLink, setYoututbeLink] = useState("");
  const [selectedYear, setSelectedYear] = useState({});
  const [selectedTurn, setSelectedTurn] = useState({});
  const [yearsAndTurns, setYearsAndTurns] = useState([]);
  const [showYearsAndTurns, setShowYearsAndTurns] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [noNetwork, setNoNetwork] = useState(false);

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

  const updateQuestion = async () => {
    setLoadingEdit(true);

    const result = await AppFunctions.UpdateQuestion(
      {
        question: question ? question : selectedQuestion.question,
        answer: answer ? answer : selectedQuestion.answer,
        video_link: youtubeLink ? youtubeLink : selectedQuestion.video_link,
        yearsAndTurns: yearsAndTurns.length
          ? JSON.stringify(yearsAndTurns)
          : JSON.stringify(selectedQuestion.yearsAndTurns),
        subject_id: subjectIndexEdit
          ? subjectIndexEdit
          : selectedQuestion.subject_id,
        unit_id: unitIndexEdit ? unitIndexEdit : selectedQuestion.unit_id,
      },
      selectedQuestion.id
    );

    if (result?.data?.data?.changedRows === 1) {
      Alert.alert("", "تم تعديل السؤال");
      getQuestions();
    } else {
      Alert.alert("", "حدث خطأ ما !");
      getQuestions();
    }

    setShowEditQuestion(false);
    setLoadingEdit(false);
  };

  const clearObj = () => {
    setQuestion(null);
    setAnswer(null);
    setYoututbeLink("");
    setUnitIndexEdit(null);
    setSubjectIndexEdit(null);
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

  const getQuestions = async () => {
    setLoading(true);
    const result = await AppFunctions.GetQuestions({
      page: pageNumber,
      page_size: pageSize,
    });

    if (result?.status == true) {
      setNoNetwork(false);
      setData(result?.data?.data?.data);
      setTotalRows(result?.data?.data?.totalRows);
    } else if (result?.status == false && result?.data === "Network Error") {
      setNoNetwork(true);
      console.log(result);
    }
    setLoading(false);
    setCanceling(false);
  };

  const getSubjects = async () => {
    const result = await AppFunctions.GetSubjects();

    if (result?.status == true) {
      setSubjectsList(result?.data?.data);
    } else {
      console.log(result);
    }
  };

  const getTurns = async () => {
    const result = await AppFunctions.GetTurns();

    if (result?.status == true) {
      setTurnsList(result?.data?.data);
    } else {
      console.log(result);
    }
  };

  const getUnits = async () => {
    const result = await AppFunctions.GetUnits();

    if (result?.status == true) {
      setUnitsList(result?.data?.data);
    } else {
      console.log(result);
    }
  };

  const handelShowEdit = async (item) => {
    let modifiedYearsAndTurns = JSON.parse(item?.yearsAndTurns);
    setSelectedQuestion({ ...item, yearsAndTurns: modifiedYearsAndTurns });
    setShowEditQuestion(true);
  };

  const deleteQuestion = async (id) => {
    Alert.alert(
      "حذف السؤال؟",
      "هل انت متأكد من رغبتك في حذف السؤال؟ \nلن يمكنك استرجاعه فيما بعد!",
      [
        {
          text: "نعم",
          onPress: async () => {
            setRefreshing(true);
            const result = await AppFunctions.DeleteQuestion(id);
            if (result.status === true) {
              Alert.alert("", "تم حذف السؤال");
              getQuestions();
            } else {
              Alert.alert("", "حدث خطأ ما !");
              getQuestions();
            }
            setRefreshing(false);
          },
        },
        {
          text: "لا",
          onPress: async () => {
            return;
          },
        },
      ]
    );
  };

  const refetch = async (number = 0, page_number) => {
    setRefreshing(true);
    let page = pageNumber;

    if (page_number == 1) {
      page = 1;
    } else if (number) {
      page += 1;
      setPageNumber(page);
    }

    const result = await AppFunctions.GetQuestions({
      page: page,
      page_size: pageSize,
      search_text: search_text,
      year: year,
      unit_id: unitIndex,
      turn_id: turnIndex,
      subject_id: subjectIndex,
    });

    if (result.status == true && number == 1) {
      setData(() => [...data, ...result?.data?.data?.data]);
      setTotalRows(result?.data?.data?.totalRows);
      setRefreshing(false);
      setSearching(false);
    } else {
      setData(result?.data?.data?.data);
      setTotalRows(result?.data?.data?.totalRows);
      setRefreshing(false);
      setSearching(false);
    }
  };

  const openFilterBox = () => {
    setShowFilterBox(!showFilterBox);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch(0, 1);
    getQuestions();
  }, []);

  const handelSearch = (value) => {
    setSearch_text(value);
  };

  useEffect(() => {
    getQuestions();
    getSubjects();
    getTurns();
    getUnits();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            columnGap: 5,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              ...styles?.filterBox,
              paddingBottom: showFilterBox ? 15 : 0,
            }}
            onPress={() => refetch(0, 1)}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="search" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <TextInput
              value={search_text}
              placeholder="بحث"
              onChangeText={handelSearch}
              style={{
                backgroundColor: "#DDE6ED",
                height: 60,
                borderRadius: 7,
                padding: 10,
                fontFamily: "ReadexPro-Regular",
                fontSize: 18,
              }}
              onSubmitEditing={() => refetch(0, 1)}
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles?.filterBox,
              paddingBottom: showFilterBox ? 15 : 0,
            }}
            onPress={openFilterBox}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="filter-sharp" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView scrollEnabled={false} nestedScrollEnabled={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              columnGap: 10,
              height: height - 275,
            }}
          >
            {!data?.length && loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : !data?.length && !loading && noNetwork ? (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    paddingTop: 220,
                    columnGap: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "ReadexPro-Regular",
                      color: "#fff",
                    }}
                  >
                    تأكد من اتصالك بالانترنت
                  </Text>
                  <MaterialCommunityIcons
                    name="network-strength-off"
                    size={24}
                    color="white"
                  />
                </View>
              </ScrollView>
            ) : !data?.length && !loading && !noNetwork ? (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    paddingTop: 220,
                    columnGap: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "ReadexPro-Regular",
                      color: "#fff",
                    }}
                  >
                    لا يوجد بيانات
                  </Text>
                  <MaterialCommunityIcons
                    name="server-network-off"
                    size={24}
                    color="white"
                  />
                </View>
              </ScrollView>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={(item) => {
                  return (
                    <QuestionCard
                      item={item.item}
                      subjects={subjectsList}
                      turns={turnsList}
                      units={unitsList}
                      deleteQuestion={deleteQuestion}
                      handelShowEdit={handelShowEdit}
                    />
                  );
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                onEndReached={() => {
                  if (data?.length < totalRows) refetch(1, 0);
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <Modal
        isVisible={showFilterBox}
        onBackdropPress={openFilterBox}
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
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "ReadexPro-Regular",
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
          <View>
            <Text
              style={{
                fontFamily: "ReadexPro-Regular",
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              columnGap: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCanceling(true);
                setSubjectIndex(null);
                setTurnIndex(null);
                setUnitIndex(null);
                setShowFilterBox(false);
                getQuestions();
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#526D82",
                  width: 80,
                  height: 40,
                  borderRadius: 7,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!canceling ? (
                  <Text
                    style={{
                      fontFamily: "ReadexPro-Regular",
                      color: "#fff",
                    }}
                  >
                    الغاء
                  </Text>
                ) : (
                  <ActivityIndicator size="small" color="#fff" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSearching(true);
                setPageNumber(1);
                setShowFilterBox(false);
                refetch(0, 1);
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#27374D",
                  width: 80,
                  height: 40,
                  borderRadius: 7,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!searching ? (
                  <Text
                    style={{
                      fontFamily: "ReadexPro-Regular",
                      color: "#fff",
                    }}
                  >
                    بحث
                  </Text>
                ) : (
                  <ActivityIndicator size="small" color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={showEditQuestion}
        onBackdropPress={() => {
          setShowEditQuestion(!showEditQuestion);
          setSelectedQuestion({});
          clearObj();
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#27374D",
            width: width - 40,
            borderRadius: 7,
            padding: 10,
          }}
        >
          <ScrollView>
            <TextInput
              value={question != null ? question : selectedQuestion.question}
              placeholder="السؤال"
              onChangeText={(e) => setQuestion(e)}
              multiline
              style={{
                backgroundColor: "#DDE6ED",
                height: 60,
                borderRadius: 7,
                padding: 10,
                fontFamily: "ReadexPro-Regular",
                fontSize: 18,
                marginBottom: 5,
              }}
            />
            <TextInput
              value={answer != null ? answer : selectedQuestion.answer}
              placeholder="الاجابة"
              onChangeText={(e) => setAnswer(e)}
              multiline
              style={{
                backgroundColor: "#DDE6ED",
                height: 60,
                borderRadius: 7,
                padding: 10,
                fontFamily: "ReadexPro-Regular",
                fontSize: 18,
                marginBottom: 5,
              }}
            />
            <TextInput
              value={
                youtubeLink != "" ? youtubeLink : selectedQuestion.video_link
              }
              placeholder="رابط الفيديو"
              onChangeText={(e) => setYoututbeLink(e)}
              style={{
                backgroundColor: "#DDE6ED",
                height: 60,
                borderRadius: 7,
                padding: 10,
                fontFamily: "ReadexPro-Regular",
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
              {yearsAndTurns.length > 0
                ? yearsAndTurns?.map((yearAndTurn, index) => {
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
                            fontFamily: "ReadexPro-Regular",
                            fontSize: 12,
                            color: "#fff",
                          }}
                        >
                          {yearAndTurn}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : selectedQuestion?.yearsAndTurns?.map((yearAndTurn, index) => {
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
                            fontFamily: "ReadexPro-Regular",
                            fontSize: 12,
                            color: "#fff",
                          }}
                        >
                          {yearAndTurn}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
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
                    fontFamily: "ReadexPro-Regular",
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
                  selectedIndex={
                    subjectIndexEdit
                      ? subjectIndexEdit - 1
                      : selectedQuestion.subject_id - 1
                  }
                  onChange={(index) => {
                    setSubjectIndexEdit(index + 1);
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
                    fontFamily: "ReadexPro-Regular",
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
                  selectedIndex={
                    unitIndexEdit
                      ? unitIndexEdit - 1
                      : selectedQuestion?.unit_id - 1
                  }
                  onChange={(index) => {
                    setUnitIndexEdit(index + 1);
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
              style={{ alignItems: "center" }}
              onPress={async () => {
                await updateQuestion();
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
                {!loadingEdit ? (
                  <Text
                    style={{
                      fontFamily: "ReadexPro-Regular",
                    }}
                  >
                    تعديل
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
                    fontFamily: "ReadexPro-Regular",
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
                            selectedYear?.id === year.id
                              ? "#27374D"
                              : "#526D82",
                          padding: 5,
                          borderRadius: 5,
                          width: 80,
                          height: 40,
                        }}
                        onPress={() => setSelectedYear(year)}
                      >
                        <Text
                          style={{
                            fontFamily: "ReadexPro-Regular",
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
                    fontFamily: "ReadexPro-Regular",
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
                            selectedTurn?.id === turn.id
                              ? "#27374D"
                              : "#526D82",
                          padding: 5,
                          borderRadius: 5,
                          width: 80,
                          height: 40,
                        }}
                        onPress={() => setSelectedTurn(turn)}
                      >
                        <Text
                          style={{
                            fontFamily: "ReadexPro-Regular",
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
                <View
                  style={{ width: "100%", flexDirection: "row", columnGap: 5 }}
                >
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
                        fontFamily: "ReadexPro-Regular",
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
                        fontFamily: "ReadexPro-Regular",
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
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27374D",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginTop: 10,
  },
  filterBox: {
    shadowColor: "#000",
    minHeight: 60,
    padding: 15,
    marginVertical: 5,
    alignSelf: "center",
    backgroundColor: "#DDE6ED",
    borderRadius: 10,
    zIndex: 5,
  },
});
