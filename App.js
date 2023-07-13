import { Image, StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "@expo-google-fonts/cairo";
import AppContainer from "./AppContainer";

export default function App() {
  let [fontsLoaded] = useFonts({
    "ReadexPro-Bold": require("./assets/fonts/ReadexPro-Bold.ttf"),
    "ReadexPro-ExtraLight": require("./assets/fonts/ReadexPro-ExtraLight.ttf"),
    "ReadexPro-Light": require("./assets/fonts/ReadexPro-Light.ttf"),
    "ReadexPro-Medium": require("./assets/fonts/ReadexPro-Medium.ttf"),
    "ReadexPro-Regular": require("./assets/fonts/ReadexPro-Regular.ttf"),
    "ReadexPro-SemiBold": require("./assets/fonts/ReadexPro-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <View style={styles.container}>
          <Image
            source={require("./assets/Logo-black.png")}
            style={styles.logo}
          />
        </View>
        <Questions />
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DDE6ED",
    alignItems: "center",
    paddingTop: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 20,
    marginTop: 10,
  },
});

//admin project_id : 3024a8b8-fb25-4976-9480-14b0375ce75f
