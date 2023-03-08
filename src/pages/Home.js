import {useNavigation} from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {Shadow} from "react-native-shadow-2";

import Header from "../components/Header";

const Home = () => {
  const navigation = useNavigation();
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
              تبحث عن سؤال؟ إختر مادة : -
            </Text>
          </View>
        </Shadow>
      </View>
      <ScrollView>
        <View style={{width: "100%", alignItems: "center"}}>
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
                  navigation.navigate("Select Unit", {
                    body: {material: "اسلامية", units: 5},
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    إسلامية
                  </Text>
                  <Image
                    source={require("../../assets/Subjects/Islamic.png")}
                    style={{width: 40, resizeMode: "contain", marginRight: 15}}
                  />
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
                  navigation.navigate("Select Unit", {
                    body: {
                      material: "قواعد",
                      units: 5,
                    },
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    عربي
                  </Text>
                  <Image
                    source={require("../../assets/Subjects/Arabic.png")}
                    style={{width: 40, resizeMode: "contain", marginRight: 15}}
                  />
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
                  navigation.navigate("Select Unit", {
                    body: {
                      material: "انكليزي",
                      units: 8,
                    },
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    إنكليزي
                  </Text>
                  <Image
                    source={require("../../assets/Subjects/English.png")}
                    style={{width: 40, resizeMode: "contain", marginRight: 15}}
                  />
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
                  navigation.navigate("Select Unit", {
                    body: {
                      material: "اقتصاد",
                      units: 6,
                    },
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    إقتصاد
                  </Text>
                  <Image
                    source={require("../../assets/Subjects/Economy.png")}
                    style={{width: 40, resizeMode: "contain", marginRight: 15}}
                  />
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
                  navigation.navigate("Select Unit", {
                    body: {
                      material: "احياء",
                      units: 5,
                    },
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    أحياء
                  </Text>
                  <Image
                    source={require("../../assets/Subjects/Biology.png")}
                    style={{width: 40, resizeMode: "contain", marginRight: 15}}
                  />
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
                  navigation.navigate("Select Unit", {
                    body: {
                      material: "رياضيات",
                      units: 6,
                    },
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    رياضيات
                  </Text>
                  <Image
                    source={require("../../assets/Subjects/Math.png")}
                    style={{width: 40, resizeMode: "contain", marginRight: 15}}
                  />
                </View>
              </TouchableOpacity>
            </Shadow>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginVertical: 20,
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
                  navigation.navigate("Select Unit", {
                    body: {
                      material: "فيزياء",
                      units: 10,
                    },
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    فيزياء
                  </Text>
                  <Image
                    source={require("../../assets/Subjects/Physics.png")}
                    style={{width: 40, resizeMode: "contain", marginRight: 15}}
                  />
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
                  navigation.navigate("Select Unit", {
                    body: {
                      material: "كيمياء",
                      units: 8,
                    },
                  })
                }>
                <View style={styles.subject}>
                  <Text
                    style={{fontSize: 20, fontWeight: "900", color: "#000"}}>
                    كيمياء
                  </Text>
                  <Image
                    source={require("../../assets/Subjects/Chemistry.png")}
                    style={{width: 40, resizeMode: "contain", marginLeft: 15}}
                  />
                </View>
              </TouchableOpacity>
            </Shadow>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

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
    flexDirection: "row-reverse",
  },
});
