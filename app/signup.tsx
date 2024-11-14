import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TextInput, View } from "react-native";
import MyButton from "../components/MyButton";

const SignUp = () => {
  const router = useRouter();
  const onMyBtnClick = () => {
    router.navigate("/login");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 20, gap: 20, width: "80%" }}
      >
        <TextInput
          placeholder="enter your first name"
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        />
        <TextInput
          placeholder="enter your last name"
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        />
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
        <MyButton title={"Sign Up"} onPress={onMyBtnClick}></MyButton>
      </ScrollView>
    </View>
  );
};

export default SignUp;
