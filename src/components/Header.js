import React from "react";
import {StyleSheet, View, Image, TouchableOpacity, Text} from "react-native";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import {Shadow} from "react-native-shadow-2";

const Header = () => {
  const navigation = useNavigation();

  return (
    <Shadow distance={0} startColor={"#000"} endColor={"#000"} offset={[-5, 4]}>
      <View style={styles.main}>
        <Image
          source={require("../../assets/Logo-black.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Text style={{fontSize: 50, color: "#000"}}>=</Text>
        </TouchableOpacity>
      </View>
    </Shadow>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    width: 370,
    height: 80,
    backgroundColor: "#F5F5F5",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
  },
  menuButton: {
    marginRight: 25,
    width: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginTop: 10,
  },
});
