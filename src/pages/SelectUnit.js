import {useNavigation} from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {Shadow} from "react-native-shadow-2";

import Header from "../components/Header";

const SelectUnit = ({route}) => {
  const navigation = useNavigation();
  const {body} = route.params;

  var material = body.material;

  return (
    <View style={styles.container}>
      <Header />
      <View style={{width: 370, marginVertical: 10}}>
        <Shadow
          distance={0}
          startColor={"#000"}
          endColor={"#000"}
          offset={[-3, 13]}
          style={{height: 50, marginBottom: 10}}>
          <View style={styles.search}>
            <Text
              style={{
                color: "#000",
                fontWeight: "900",
                fontSize: 20,
                marginHorizontal: 10,
              }}>
              إختر الفصل : -
            </Text>
          </View>
        </Shadow>
      </View>
      <ScrollView style={{width: "100%"}}>
        <View style={{alignItems: "center"}}>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-around",
              width: 390,
              marginTop: 10,
            }}>
            <Shadow
              distance={0}
              startColor={"#000"}
              endColor={"#000"}
              offset={[-4, 4]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Questions", {
                    body: {material, unit: "1"},
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    الفصل الاول
                  </Text>
                </View>
              </TouchableOpacity>
            </Shadow>
            <Shadow
              distance={0}
              startColor={"#000"}
              endColor={"#000"}
              offset={[-4, 4]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Questions", {
                    body: {material, unit: "2"},
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    الفصل الثاني
                  </Text>
                </View>
              </TouchableOpacity>
            </Shadow>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginTop: 20,
              justifyContent: "space-around",
              width: 390,
            }}>
            <Shadow
              distance={0}
              startColor={"#000"}
              endColor={"#000"}
              offset={[-4, 4]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Questions", {
                    body: {material, unit: "3"},
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    الفصل الثالث
                  </Text>
                </View>
              </TouchableOpacity>
            </Shadow>
            <Shadow
              distance={0}
              startColor={"#000"}
              endColor={"#000"}
              offset={[-4, 4]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Questions", {
                    body: {material, unit: "4"},
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    الفصل الرابع
                  </Text>
                </View>
              </TouchableOpacity>
            </Shadow>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginTop: 20,
              justifyContent: "space-around",
              width: 390,
            }}>
            <Shadow
              distance={0}
              startColor={"#000"}
              endColor={"#000"}
              offset={[-4, 4]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Questions", {
                    body: {material, unit: "5"},
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    الفصل الخامس
                  </Text>
                </View>
              </TouchableOpacity>
            </Shadow>
            {body.units >= 6 ? (
              <Shadow
                distance={0}
                startColor={"#000"}
                endColor={"#000"}
                offset={[-4, 4]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Questions", {
                      body: {material, unit: "6"},
                    })
                  }>
                  <View style={styles.subject}>
                    <Text
                      style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                      الفصل السادس
                    </Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginVertical: 20,
              justifyContent: "space-around",
              width: 390,
            }}>
            {body.units >= 7 ? (
              <Shadow
                distance={0}
                startColor={"#000"}
                endColor={"#000"}
                offset={[-4, 4]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Questions", {
                      body: {material, unit: "7"},
                    })
                  }>
                  <View style={styles.subject}>
                    <Text
                      style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                      الفصل السابع
                    </Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
            ) : (
              <></>
            )}
            {body.units >= 8 ? (
              <Shadow
                distance={0}
                startColor={"#000"}
                endColor={"#000"}
                offset={[-4, 4]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Questions", {
                      body: {material, unit: "8"},
                    })
                  }>
                  <View style={styles.subject}>
                    <Text
                      style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                      الفصل الثامن
                    </Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginVertical: 20,
              justifyContent: "space-around",
              width: 390,
            }}>
            {body.units >= 9 ? (
              <Shadow
                distance={0}
                startColor={"#000"}
                endColor={"#000"}
                offset={[-4, 4]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Questions", {
                      body: {material, unit: "9"},
                    })
                  }>
                  <View style={styles.subject}>
                    <Text
                      style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                      الفصل التاسع
                    </Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
            ) : (
              <></>
            )}
            {body.units == 10 ? (
              <Shadow
                distance={0}
                startColor={"#000"}
                endColor={"#000"}
                offset={[-4, 4]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Questions", {
                      body: {material, unit: "10"},
                    })
                  }>
                  <View style={styles.subject}>
                    <Text
                      style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                      الفصل العاشر
                    </Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectUnit;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#00dd80",
  },
  subject: {
    width: 180,
    height: 90,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    flexDirection: "row",
  },
  search: {
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    marginTop: 10,
    flexDirection: "row",
  },
});
