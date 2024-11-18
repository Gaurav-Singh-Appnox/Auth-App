import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

export default function Index() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.items);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCart = () => {
    router.navigate("/cart");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Search..."
          onChangeText={handleSearch}
          value={search}
          platform="default"
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.inputContainer}
        />
        {/* Icons */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => console.log("Message Icon Pressed")}>
            <FontAwesome
              name="envelope"
              size={24}
              color="#555"
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.cartContainer}>
            <TouchableOpacity onPress={handleCart}>
              <FontAwesome
                name="shopping-cart"
                size={24}
                color="#555"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text>{cartItems.length}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#f5f5f5",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  cartContainer:{
    flexDirection:"row",
    alignItems:"center",
  }
});
