import { Image, StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Cairo_200ExtraLight,
  Cairo_300Light,
  Cairo_400Regular,
  Cairo_600SemiBold,
  Cairo_700Bold,
  Cairo_900Black,
} from "@expo-google-fonts/cairo";
import AppContainer from "./AppContainer";

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
        <AppContainer />
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
    width: 100,
    height: 100,
    marginLeft: 20,
    marginTop: 10,
  },
});

//admin project_id : 3024a8b8-fb25-4976-9480-14b0375ce75f
//user project_id : 2c2182d3-2ac6-4646-b481-bf2805a7277e
