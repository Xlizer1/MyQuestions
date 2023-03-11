import React, {useContext, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Context} from "../context/Provider";
import Spinner from "react-native-loading-spinner-overlay/lib";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {Shadow} from "react-native-shadow-2";

const Register = () => {
  const navigation = useNavigation();
  const {isLoading, register} = useContext(Context);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.container}>
      <Spinner visible={isLoading} />
      <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      <View style={styles.mainView}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 30,
            color: "#000",
            alignSelf: "center",
          }}>
          تسجيل
        </Text>
        <TextInput
          placeholder="الأسم الاول"
          placeholderTextColor={"#000"}
          onChangeText={text => setFirstName(text)}
          style={styles.input}
          value={firstName}
        />
        <TextInput
          placeholder="الأسم الاخير"
          placeholderTextColor={"#000"}
          onChangeText={text => setLastName(text)}
          style={styles.input}
          value={lastName}
        />
        <TextInput
          placeholder="البريد الالكتروني"
          placeholderTextColor={"#000"}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          value={email}
        />
        <TextInput
          placeholder="كلمة المرور"
          placeholderTextColor={"#000"}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          value={password}
          secureTextEntry={true}
        />
        <Shadow
          distance={0}
          startColor="#000"
          endColor="#000"
          offset={[85, 40]}
          style={styles.button}>
          <TouchableOpacity
            onPress={async () => {
              await register(firstName, lastName, email, password);
              navigation.navigate("Login");
              alert("سجل الدخول باستخدام البريد الاكتروني الذي ادخلته");
            }}>
            <Text style={styles.buttonText}>تسجيل</Text>
          </TouchableOpacity>
        </Shadow>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}>
          <Text>لديك حساب؟</Text>
          <Text
            style={{fontWeight: "bold", marginLeft: 3}}
            onPress={navigateToLogin}>
            تسجيل الدخول
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
    backgroundColor: "#00dd80",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  mainView: {
    width: "80%",
    alignSelf: "center",
    paddingBottom: 100,
  },
  input: {
    height: 50,
    width: "100%",
    color: "#000",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 20,
    textAlign: "right",
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "#fff",
    marginTop: 35,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
});
