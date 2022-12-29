import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image
          source={require("../assets/Logo-black.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={40} color="#616161" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  main: {
    width: "95%",
    height: 80,
    backgroundColor: "#F5F5F5",
    borderRadius: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    marginRight: 25,
    width: 40,
  },
  menu: {
    position: "absolute",
    display: "flex",
    width: 260,
    height: 430,
    backgroundColor: "#F5F5F5",
    right: 0,
    zIndex: 100,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  menuHeader: {
    backgroundColor: "#40514E",
    borderTopStartRadius: 18,
    height: 80,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  menuUser: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    color: "#f5f5f5",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 15,
  },
  menuContent: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    margin: 10,
    right: 0,
    paddingLeft: 70,
    paddingVertical: 10,
    borderBottomColor: "#616161",
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 20,
    fontWeight: "bold",
    width: 120,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginTop: 10,
  },
  borderTop: {
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: "#f5f5f5",
  },
  border: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#f5f5f5",
  },
});
