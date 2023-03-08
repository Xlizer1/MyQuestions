import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Context} from "../../context/Provider";
import {Shadow} from "react-native-shadow-2";

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
    <Shadow
      distance={0}
      startColor={"#000"}
      endColor={"#000"}
      offset={[-10, 10]}
      style={{margin: 7, width: 370}}>
      <View style={{backgroundColor: "#f5f5f5"}}>
        <TouchableOpacity style={styles.question} onPress={questionDetails}>
          <Text style={styles.ques}>{item.title}</Text>
          <Text style={styles.ans}>{item.answer}</Text>
          <View style={styles.border}></View>
          <Text style={styles.yesr}>
            {item.year.map(y => ` ${y}` + " |")} | {item.material}
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
    </Shadow>
  );
};

export default Question;

const styles = StyleSheet.create({
  question: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderWidth: 2,
  },
  ques: {
    color: "black",
    fontSize: 10,
    direction: "ltr",
    textAlign: "right",
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});
