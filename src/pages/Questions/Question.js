import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Context} from "../../context/Provider";

const Question = ({item}) => {
  const navigation = useNavigation();
  const {userInfo, deleteQuestion} = useContext(Context);

  const [admin, setAdmin] = useState(Boolean);

  const questionDetails = () => {
    navigation.navigate("Question Details", {item});
  };

  useEffect(() => {
    if (!userInfo.msg) return;
    setAdmin(true);
  }, []);

  return (
    <View
      style={{backgroundColor: "#f5f5f5", borderRadius: 21, marginBottom: 10}}>
      <TouchableOpacity style={styles.question} onPress={questionDetails}>
        <Text style={styles.ques}>{item.title}</Text>
        <Text style={styles.ans}>{item.answer}</Text>
        <View style={styles.border}></View>
        <Text style={styles.yesr}>
          {item.year} | {item.turn} | {item.material}
        </Text>
      </TouchableOpacity>
      {admin ? (
        <View style={styles.AdminButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => deleteQuestion(item._id)}>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>حذف</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  question: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
  },
  ques: {
    color: "black",
    fontSize: 10,
    direction: "ltr",
    textAlign: "right",
    width: "100%",
  },
  ans: {
    color: "black",
    fontSize: 12,
    textAlign: "right",
    direction: "ltr",
    marginTop: 10,
  },
  yesr: {
    color: "black",
    fontSize: 10,
    direction: "ltr",
    textAlign: "right",
    marginTop: 10,
  },
  border: {
    borderTopWidth: 1,
    borderColor: "#919191",
    marginTop: 15,
    backgroundColor: "#f5f5",
  },
  AdminButtons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#FF4A4A",
    width: "100%",
    height: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
