import { View, Text } from "react-native";
import React from "react";
import Questions from "./screens/Questions";
import AddQuestion from "./screens/AddQuestion";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const AppContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",
        swipeEnabled: false,
        lazy: true,
        tabBarContentContainerStyle: {
          backgroundColor: "#27374D",
        },
        tabBarLabelStyle: {
          fontFamily: "ReadexPro-Regular",
        },
      }}
    >
      <Tab.Screen name="الاسئلة" component={Questions} />
      <Tab.Screen name="اضافة سؤال" component={AddQuestion} />
    </Tab.Navigator>
  );
};

export default AppContainer;
