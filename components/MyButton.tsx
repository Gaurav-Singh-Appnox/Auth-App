import { Text, TouchableOpacity, View } from "react-native";

const MyButton = ({ title, onPress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          backgroundColor: "orange",
          paddingInline: 20,
          paddingBlock: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyButton;
