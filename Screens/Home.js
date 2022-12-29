import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";

import axios from "axios";
import Lottie from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

import Header from "../Components/Header";
import { deleteNewsURI, newsURI } from "../utilities/config";

const Home = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(Boolean);

  const fetchNews = async () => {
    const data = await axios.get(newsURI);
    setNews(data.data);
    setLoading(false);
  };

  const handelSearch = () => {
    navigation.navigate("Questions");
  };

  const validateUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const msg = await AsyncStorage.getItem("msg");
    if (!token) {
      navigation.navigate("Login");
    } else {
      if (msg) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }
  };

  const deleteNews = async (id) => {
    const token = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: JSON.parse(token),
      },
    };

    axios
      .delete(`${deleteNewsURI}/${id}`, config)
      .then((res) => {
        alert(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };

  useEffect(() => {
    validateUser();
    fetchNews();
  }, [news]);

  return (
    <ImageBackground
      source={require("../assets/Bg.png")}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Header />
        <TouchableOpacity onPressOut={handelSearch}>
          <View style={styles.searchView}>
            <View style={styles.searchIcon}>
              <Feather
                name="search"
                size={30}
                color="#616161"
                style={{ marginLeft: 5 }}
              />
              <Text style={{ fontSize: 20 }}> ابحث عن سؤالك؟</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.listView}>
          {loading ? (
            <Lottie
              source={require("../assets/loading.json")}
              autoPlay
              loop
              style={styles.loading}
            />
          ) : (
            <FlatList
              data={news}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingBottom: 200 }}
              renderItem={({ item }) => {
                if (item.image) {
                  return (
                    <View style={styles.question}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                      <Text style={styles.content}>{item.title}</Text>
                      {admin ? (
                        <View style={styles.AdminButtons}>
                          <TouchableOpacity
                            style={styles.button1}
                            onPress={() => deleteNews(item._id)}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              حذف
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.button2}
                            onPress={() => navigation.navigate("Admin", item)}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              تعديل
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
                            style={styles.button1}
                            onPress={() => deleteNews(item._id)}
                          >
                            {loading ? (
                              <Lottie
                                source={require("../assets/loadingButton.json")}
                                autoPlay
                                loop
                              />
                            ) : (
                              <Text
                                style={{ fontSize: 18, fontWeight: "bold" }}
                              >
                                حذف
                              </Text>
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.button2}
                            onPress={() => navigation.navigate("Admin", item)}
                          >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              تعديل
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
    width: "60%",
    height: 50,
    borderRadius: 18,
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
    borderRadius: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 18,
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
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  listView: {
    width: "95%",
    height: "100%",
  },
  loading: {
    marginTop: -80,
  },
  AdminButtons: {
    flexDirection: "row",
  },
  button1: {
    backgroundColor: "#FF4A4A",
    width: "50%",
    height: 40,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#FED049",
    width: "50%",
    height: 40,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
