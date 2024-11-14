import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import MyButton from "../../components/MyButton";

export default function Index() {
  const router = useRouter();

  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
    </View>
  );
}
