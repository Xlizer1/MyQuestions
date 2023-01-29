import React, {useState, useEffect, useContext} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";

import axios from "axios";

import Header from "../components/Header";
import {newsURI} from "../utilities/config";
import {useNavigation} from "@react-navigation/native";
import {Context} from "../context/Provider";
import AnimatedLottieView from "lottie-react-native";

const Home = () => {
  const navigation = useNavigation();
  const {userInfo, deleteNews} = useContext(Context);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(Boolean);

  const fetchNews = async () => {
    const data = await axios.get(newsURI);
    setNews(data.data);
    setLoading(false);
    if (!userInfo.msg) return;
    setAdmin(true);
  };

  const handelSearch = () => {
    navigation.navigate("Questions");
  };

  useEffect(() => {
    fetchNews();
  }, [news]);

  return (
    <ImageBackground
      source={require("../../assets/Bg.png")}
      style={styles.imageBackground}>
      <View style={styles.container}>
        <Header />
        <TouchableOpacity onPressOut={handelSearch}>
          <View style={styles.searchView}>
            <View style={styles.searchIcon}>
              <Image
                source={require("../../assets/search.png")}
                style={{
                  height: 30,
                  resizeMode: "contain",
                  opacity: 0.5,
                  margin: -20,
                }}
              />
              <Text style={{fontSize: 20}}> ابحث عن سؤالك؟</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.listView}>
          {loading ? (
            <AnimatedLottieView
              source={require("../../assets/loading.json")}
              autoPlay
              loop
              style={styles.loading}
            />
          ) : (
            <FlatList
              data={news}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{paddingBottom: 200}}
              renderItem={({item}) => {
                if (item.image) {
                  return (
                    <View style={styles.question}>
                      <Image source={{uri: item.image}} style={styles.image} />
                      <Text style={styles.content}>{item.title}</Text>
                      {admin ? (
                        <View style={styles.AdminButtons}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => deleteNews(item._id)}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>
                              حذف
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <></>
                      )}
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.question}>
                      <Text style={styles.content}>{item.title}</Text>
                      {admin ? (
                        <View style={styles.AdminButtons}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => deleteNews(item._id)}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>
                              حذف
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <></>
                      )}
                    </View>
                  );
                }
              }}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;

const DeviceHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    height: DeviceHeight,
  },

  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
  },
  searchView: {
    backgroundColor: "#f5f2f5",
    margin: 10,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    zIndex: 1,
  },
  searchIcon: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    width: 390,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 5,
  },
  content: {
    color: "black",
    fontSize: 18,
    textAlign: "right",
    width: "100%",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listView: {
    width: "95%",
    height: "100%",
    alignItems: "center",
  },
  loading: {
    width: 300,
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
