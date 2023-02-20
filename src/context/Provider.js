import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  deleteNewsURI,
  deleteQuestionsURI,
  loginURI,
  registerURI,
} from "../utilities/config";
import {ReloadInstructions} from "react-native/Libraries/NewAppScreen";

export const Context = createContext();

export default Provider = ({children}) => {
  let [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (firstName, lastName, email, password) => {
    setIsLoading(true);

    axios
      .post(registerURI, {
        firstName,
        lastName,
        email,
        password,
      })
      .then(async res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        alert("معلومات غير صحيحة");
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(loginURI, {
        email,
        password,
      })
      .then(async res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        alert("كلمة المرور غير صحيحة");
        setIsLoading(false);
      });
  };

  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  const deleteQuestion = async id => {
    try {
      const config = {
        headers: {
          Authorization: userInfo.token,
          "Content-Type": "application/json",
        },
      };

      await axios.delete(`${deleteQuestionsURI}/${id}`, config).then(res => {
        alert(res.data);
      });
      ReloadInstructions();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async id => {
    try {
      const config = {
        headers: {
          Authorization: userInfo.token,
          "Content-Type": "application/json",
        },
      };

      await axios.delete(`${deleteNewsURI}/${id}`, config).then(res => {
        alert(res.data);
      });
      ReloadInstructions();
    } catch (error) {
      console.log(error);
    }
  };

  const addNews = async () => {
    if (!image) {
      const data = {
        title: news.title,
        image: "",
      };

      const config = {
        headers: {
          Authorization: JSON.parse(await AsyncStorage.getItem("token")),
        },
      };

      await axios
        .post(addNewsURI, data, config)
        .then(res => {
          alert(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child(`Pictures/Image1`);
      const snapshot = ref.put(blob);
      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        error => {
          console.log(error);
          blob.close();
          return;
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then(url => {
            setImage(url);
            blob.close();
            return url;
          });
        },
      );

      setTimeout(async () => {
        const data = {
          title: news.title,
          image: image,
        };

        const config = {
          headers: {
            Authorization: JSON.parse(await AsyncStorage.getItem("token")),
          },
        };

        await axios
          .post(`${addNewsURI}`, data, config)
          .then(res => {
            alert(res.data);
          })
          .catch(e => {
            console.log(e);
          });
      }, 3000);
    }
  };

  const addQuestion = async () => {
    const data = {
      title: question.title,
      answer: question.answer,
      keyWord: question.keyWord,
      youtubeLink: question.youtubeLink,
    };

    const config = {
      headers: {
        Authorization: JSON.parse(await AsyncStorage.getItem("token")),
      },
    };

    await axios.post(addQuestionsURI, data, config).then(res => {
      alert(res.data);
    });
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <Context.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        deleteNews,
        deleteQuestion,
        addNews,
        addQuestion,
      }}>
      {children}
    </Context.Provider>
  );
};
