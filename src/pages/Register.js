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
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Context} from "../context/Provider";
import Spinner from "react-native-loading-spinner-overlay/lib";

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
    <ImageBackground source={require("../../assets/Bg.png")} style={"flex:1"}>
      <Spinner visible={isLoading} />
      <ScrollView style={styles.container}>
        <Image source={require("../../assets/Logo.png")} style={styles.logo} />
        <View style={styles.mainView}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 30,
              color: "#f5f5f5",
              alignSelf: "center",
            }}>
            تسجيل
          </Text>
          <TextInput
            placeholder="الأسم الاول"
            placeholderTextColor={"#f5f5f5"}
            onChangeText={text => setFirstName(text)}
            style={styles.input}
            value={firstName}
          />
          <TextInput
            placeholder="الأسم الاخير"
            placeholderTextColor={"#f5f5f5"}
            onChangeText={text => setLastName(text)}
            style={styles.input}
            value={lastName}
          />
          <TextInput
            placeholder="البريد الالكتروني"
            placeholderTextColor={"#f5f5f5"}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            value={email}
          />
          <TextInput
            placeholder="كلمة المرور"
            placeholderTextColor={"#f5f5f5"}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            value={password}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await register(firstName, lastName, email, password);
              navigation.navigate("Login");
              alert("سجل الدخول باستخدام البريد الاكتروني الذي ادخلته");
            }}>
            <Text style={styles.buttonText}>تسجيل</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}>
            <Text
              style={{fontWeight: "bold", marginRight: 3}}
              onPress={navigateToLogin}>
              تسجيل الدخول
            </Text>
            <Text>لديك حساب؟</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
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
    color: "#f5f5f5",
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 20,
    textAlign: "right",
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "#14FF9C",
    borderRadius: 10,
    marginTop: 35,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#40514E",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
});
