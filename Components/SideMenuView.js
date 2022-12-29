import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, Text } from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomSidebarMenu = (props) => {
  const [admin, setAdmin] = useState(Boolean);
  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("msg");
    navigation.navigate("Login");
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

  useEffect(() => {
    validateUser();
  }, [admin]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Image
          source={require("../assets/Logo-black.png")}
          style={styles.logo}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <View style={{ padding: 10, direction: "rtl", marginTop: -20 }}>
          <TouchableOpacity
            style={styles.menuContent}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.menuText}>الرئيسية</Text>
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuContent}
            onPress={() => navigation.navigate("Questions")}
          >
            <Text style={styles.menuText}>الاسئلة</Text>
            <MaterialCommunityIcons
              name="frequently-asked-questions"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          {!admin ? (
            <></>
          ) : (
            <TouchableOpacity
              style={styles.menuContent}
              onPress={() => navigation.navigate("Addcontent")}
            >
              <Text style={styles.menuText}>صفحة الادمن</Text>
              <AntDesign name="user" size={24} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.menuContent}>
            <Text style={styles.menuText}>قييم التطبيق</Text>
            <AntDesign name="star" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuContent}>
            <Text style={styles.menuText}>شارك التطبيق</Text>
            <Feather name="share-2" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuContent}>
            <Text style={styles.menuText}>تواصل معنا</Text>
            <Ionicons name="ios-call-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuContent}>
            <Text style={styles.menuText}>عن التطبيق</Text>
            <Octicons name="info" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuContent} onPress={logout}>
            <Text style={styles.menuText}>تسجيل الخروج</Text>
            <SimpleLineIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  menuContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5,
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 19,
    width: 150,
    textAlign: "left",
  },
});

export default CustomSidebarMenu;
