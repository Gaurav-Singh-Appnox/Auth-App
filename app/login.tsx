import { useRouter } from "expo-router";
import React from "react";
import { TextInput, View } from "react-native";
import MyButton from "../components/MyButton";

const Login = () => {
  const router = useRouter();

  const onMyBtnClick = () => {
    router.navigate("/");
  };
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ padding: 20, gap: 20 ,width:"80%"}}>
        <TextInput
          placeholder="enter your email"
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        />
        <TextInput
          placeholder="enter your password"
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        />
        <MyButton title={"login"} onPress={onMyBtnClick}></MyButton>
      </View>
    </View>
  );
};

export default Login;
