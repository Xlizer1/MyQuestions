import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";

const QuestionCard = ({
  item,
  subjects,
  deleteQuestion,
  units,
  handelShowEdit,
}) => {
  const [parsedYearsAndTurn, setParsedYearsAndTurns] = useState([]);
  let subject = subjects?.find((subject) => subject?.id === item?.subject_id);
  let unit = units?.find((unit) => unit?.id === item?.unit_id);

  const parse = () => {
    let rowYearsAndTurn = item?.yearsAndTurns;
    let parsedYearsAndTurn = JSON.parse(rowYearsAndTurn);
    setParsedYearsAndTurns(parsedYearsAndTurn);
  };

  const openYoutube = () => {
    Linking.canOpenURL(item?.video_link).then(() => {
      Linking.openURL(item?.video_link);
    });
  };

  useEffect(() => {
    parse();
  }, [item]);

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "Cairo_700Bold",
            fontSize: 18,
          }}
          ellipsizeMode="tail"
        >
          السؤال : {item?.question}
        </Text>
      </View>
      <View style={{ flexDirection: "row", maxWidth: "100%" }}>
        <Text
          style={{
            fontFamily: "Cairo_700Bold",
            fontSize: 16,
          }}
        >
          الجواب : {item?.answer}
        </Text>
      </View>
      <View style={{ flexDirection: "row", columnGap: 5 }}>
        <Text
          style={{
            fontFamily: "Cairo_700Bold",
            fontSize: 13,
            color: "#fff",
            backgroundColor: "#526D82",
            padding: 7,
            borderRadius: 5,
          }}
        >
          {subject?.name}
        </Text>
        <Text
          style={{
            fontFamily: "Cairo_700Bold",
            fontSize: 13,
            color: "#fff",
            backgroundColor: "#526D82",
            padding: 7,
            borderRadius: 5,
          }}
        >
          {unit?.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          columnGap: 5,
          rowGap: 5,
          flexWrap: "wrap",
        }}
      >
        {parsedYearsAndTurn?.map((yearAndTurn, index) => {
          return (
            <View
              key={index}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#526D82",
                padding: 5,
                borderRadius: 5,
              }}
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
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          columnGap: 5,
          justifyContent: item?.video_link ? "space-between" : "flex-end",
          alignItems: "center",
        }}
      >
        {item?.video_link ? (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#7ebd77",
              padding: 5,
              borderRadius: 5,
            }}
            onPress={openYoutube}
          >
            <Text
              style={{
                fontFamily: "Cairo_700Bold",
                color: "#fff",
              }}
            >
              شاهد شرح السؤال
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            columnGap: 5,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FF543D",
              borderRadius: 5,
              width: 60,
              height: 35,
            }}
            onPress={() => {
              deleteQuestion(item?.id);
            }}
          >
            <AntDesign name="delete" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#27374D",
              borderRadius: 5,
              width: 60,
              height: 35,
            }}
            onPress={() => {
              handelShowEdit(item);
            }}
          >
            <Entypo name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 10,
    backgroundColor: "#DDE6ED",
    borderRadius: 8,
    marginBottom: 5,
    rowGap: 10,
  },
});
