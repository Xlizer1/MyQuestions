import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";

export default function Question_Details({route}) {
  const item = route.params.item;

  const openYoutube = () => {
    Linking.canOpenURL(item.youtubeLink).then(supported => {
      if (supported) {
        Linking.openURL(item.youtubeLink);
      } else {
        Linking.openURL(item.youtubeLink);
      }
    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/Bg.png")}
      style={"flex:1"}>
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.content}>
          <View style={styles.element}>
            <Text style={styles.header}>السؤال :</Text>
          </View>
          <View style={styles.element}>
            <Text
              style={{
                textAlign: "right",
                color: "#f5f5f5",
                fontSize: 16,
                fontWeight: "bold",
              }}>
              {item.title}
            </Text>
          </View>
          <View style={styles.border}></View>
          <View style={styles.element}>
            <Text style={styles.header}>الاجابة :</Text>
          </View>
          <View style={styles.element}>
            <Text style={{textAlign: "right", color: "#f5f5f5"}}>
              {item.answer}
            </Text>
          </View>
          <View style={styles.border}></View>
          <View style={styles.element}>
            {item.youtubeLink ? (
              <TouchableOpacity style={styles.button} onPress={openYoutube}>
                <Text style={{fontSize: 18, fontWeight: "bold"}}>
                  شاهد شرح السؤال
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
  },
  content: {
    padding: 30,
    width: "100%",
  },
  header: {
    textAlign: "right",
    fontSize: 24,
    fontWeight: "bold",
    color: "#f5f5f5",
    marginTop: 10,
  },
  element: {
    paddingBottom: 10,
    marginBottom: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
    padding: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f5f5f5",
    width: 150,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
