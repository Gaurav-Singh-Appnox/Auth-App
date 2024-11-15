import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/slicer/UserSlice";

const Profile = () => {
  const token = useSelector((state: any) => state.auth.token);
  console.log(token);
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("->");
    
    dispatch(logOut());
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          height: 200,
          backgroundColor: "aliceblue",
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="user-circle" size={40} color="white" />
          </View>
          <View
            style={{
              width: "70%",
              backgroundColor: "black",
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
              alignContent: "center",
              gap: 20,
              justifyContent: "center",
            }}
          >
            {!token ? (
              <>
                <TouchableOpacity style={{ marginBottom: 10 }}>
                  <Link href="/login" style={{ color: "white", fontSize: 18 }}>
                    Login
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Link href="/signup" style={{ color: "white", fontSize: 18 }}>
                    SignUp
                  </Link>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={handleLogout}
                style={{ marginBottom: 10 }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Log Out
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
