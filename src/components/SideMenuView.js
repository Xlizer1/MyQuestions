import React, {useState, useContext, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import {DrawerContentScrollView} from "@react-navigation/drawer";

import {DrawerActions, useNavigation} from "@react-navigation/native";
import {Context} from "../context/Provider";

const SideMenuView = props => {
  const [admin, setAdmin] = useState(Boolean);
  const navigation = useNavigation();
  const {logout, userInfo} = useContext(Context);

  const signOut = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    logout();
  };

  useEffect(() => {
    if (!userInfo.msg) return;
    setAdmin(true);
  }, [userInfo]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{marginTop: 30, alignItems: "center"}}>
        <Image
          source={require("../../assets/Logo-black.png")}
          style={styles.logo}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <View style={{padding: 10, direction: "rtl", marginTop: -20}}>
          <TouchableOpacity
            style={styles.menuContent}
            onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../../assets/home.png")}
              style={{
                height: 30,
                resizeMode: "contain",
                opacity: 0.5,
                marginTop: 8,
              }}
            />
            <Text style={styles.menuText}>الرئيسية</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuContent}
            onPress={() => navigation.navigate("Questions")}>
            <Image
              source={require("../../assets/search.png")}
              style={{
                height: 25,
                resizeMode: "contain",
                marginTop: 9,
                opacity: 0.5,
              }}
            />
            <Text style={styles.menuText}>الاسئلة</Text>
          </TouchableOpacity>
          {!admin ? (
            <></>
          ) : (
            <TouchableOpacity
              style={styles.menuContent}
              onPress={() => navigation.navigate("Add Content")}>
              <Image
                source={require("../../assets/admin.png")}
                style={{
                  height: 30,
                  resizeMode: "contain",
                  opacity: 0.5,
                  marginTop: 8,
                }}
              />
              <Text style={styles.menuText}>صفحة الادمن</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.menuContent}>
            <Image
              source={require("../../assets/message.png")}
              style={{
                height: 30,
                resizeMode: "contain",
                opacity: 0.5,
                marginTop: 8,
              }}
            />
            <Text style={styles.menuText}>تواصل معنا</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuContent} onPress={signOut}>
            <Image
              source={require("../../assets/logout.png")}
              style={{
                height: 30,
                resizeMode: "contain",
                opacity: 0.5,
                marginTop: 8,
              }}
            />
            <Text style={styles.menuText}>تسجيل الخروج</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default SideMenuView;

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
    marginTop: 10,
  },
});
