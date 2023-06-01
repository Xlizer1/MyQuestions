import { Image, StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import Questions from "./screens/Questions";
import AddQuestion from "./screens/AddQuestion";
import {
  useFonts,
  Cairo_200ExtraLight,
  Cairo_300Light,
  Cairo_400Regular,
  Cairo_600SemiBold,
  Cairo_700Bold,
  Cairo_900Black,
} from "@expo-google-fonts/cairo";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Cairo_200ExtraLight,
    Cairo_300Light,
    Cairo_400Regular,
    Cairo_600SemiBold,
    Cairo_700Bold,
    Cairo_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <View style={styles.container}>
          <Image source={require("./assets/Logo.png")} style={styles.logo} />
        </View>
        {/* <Questions /> */}
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
              fontFamily: "Cairo_700Bold",
            },
          }}
        >
          <Tab.Screen name="الاسئلة" component={Questions} />
          <Tab.Screen name="اضافة سؤال" component={AddQuestion} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#27374D",
    alignItems: "center",
    paddingTop: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginLeft: 20,
    marginTop: 10,
  },
});
