import { useRouter } from "expo-router";
import { View } from "react-native";
import MyButton from "../components/MyButton";

export default function Index() {
  const router = useRouter();

  const onMyBtnClick = () => {
    router.navigate("/signup");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MyButton title={"continue"} onPress={onMyBtnClick}></MyButton>
    </View>
  );
}
