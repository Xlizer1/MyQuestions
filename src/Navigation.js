import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddContnet from "./pages/Admin/AddContnet";
import Questions from "./pages/Questions/Questions";
import Question_Details from "./pages/Questions/Question_Details";
import SideMenuView from "./components/SideMenuView";
import {Context} from "./context/Provider";

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const {userInfo} = useContext(Context);

  console.log(userInfo);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <SideMenuView {...props} />}
        screenOptions={{
          header: () => null,
          drawerPosition: "right",
          drawerType: "back",
          swipeEdgeWidth: 75,
        }}>
        {userInfo.token ? (
          <>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Add Content" component={AddContnet} />
            <Drawer.Screen name="Questions" component={Questions} />
            <Drawer.Screen
              name="Question Details"
              component={Question_Details}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{swipeEnabled: false}}
            />
            <Drawer.Screen
              name="Register"
              component={Register}
              options={{swipeEnabled: false}}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
