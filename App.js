import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./Screens/Home";
import Questions from "./Screens/Ques/Questions";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import CustomSidebarMenu from "./Components/SideMenuView";
import Question_Details from "./Screens/Ques/Question_Details";
import Admin from "./Screens/Admin/Admin";
import Addcontent from "./Screens/Admin/Addcontent";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        screenOptions={{
          header: () => null,
          drawerPosition: "right",
          drawerType: "back",
          swipeEdgeWidth: 75,
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Questions" component={Questions} />
        <Drawer.Screen name="Question_Details" component={Question_Details} />
        <Drawer.Screen name="Admin" component={Admin} />
        <Drawer.Screen name="Addcontent" component={Addcontent} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
