import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";

const Tab = createMaterialTopTabNavigator();

export default function AppContainer() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#27374D",
        tabBarInactiveTintColor: "gray",
        swipeEnabled: true,
        lazy: true,
      }}
    >
      <Tab.Screen name="الاسئلة" component={Questions} />
      <Tab.Screen name="اضافة" component={AddQuestion} />
    </Tab.Navigator>
  );
}
