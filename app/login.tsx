import { useRouter } from "expo-router";
import { TextInput, View } from "react-native";
import MyButton from "../components/MyButton";

const Login = () => {
  const router = useRouter();

  const onMyBtnClick = () => {
    router.navigate("index");
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
      <View style={{ padding: 20, width: "80%" }}>
        <TextInput
          placeholder="Enter your email"
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          style={{
            borderWidth: 1,
            height: 50,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />
        <MyButton title={"Login"} onPress={onMyBtnClick} />
      </View>
    </View>
  );
};

export default Login;
