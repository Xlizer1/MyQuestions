import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import {Shadow} from "react-native-shadow-2";
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
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <View style={styles.element}>
          <Text style={styles.header}>السؤال :</Text>
        </View>
        <View style={styles.element}>
          <Text
            style={{
              color: "#f5f5f5",
              fontSize: 16,
              fontWeight: "bold",
              color: "#000",
            }}>
            {item.title}
          </Text>
        </View>
        <View style={styles.border}></View>
        <View style={styles.element}>
          <Text style={styles.header}>الاجابة :</Text>
        </View>
        <View style={styles.element}>
          <Text style={{color: "#000"}}>{item.answer}</Text>
        </View>
        <View style={styles.border}></View>
        <View style={styles.element}>
          {item.youtubeLink ? (
            <Shadow
              distance={0}
              startColor="#000"
              endColor="#000"
              offset={[-2, 10]}>
              <TouchableOpacity style={styles.button} onPress={openYoutube}>
                <Text style={{fontSize: 18, fontWeight: "bold", color: "#000"}}>
                  شاهد شرح السؤال
                </Text>
              </TouchableOpacity>
            </Shadow>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#00dd80",
  },
  content: {
    padding: 30,
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  element: {
    paddingBottom: 10,
    marginBottom: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginBottom: 20,
    borderStyle: "dashed",
  },
  button: {
    backgroundColor: "#fff",
    width: 150,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});
