import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const images = [
  require("../../assets/images/HomeBanner/suhanakhand.jpeg"),
  require("../../assets/images/HomeBanner/vivov40e.jpg"),
  require("../../assets/images/HomeBanner/xfold.jpg"),
];

export default function Index() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCart = () => {
    router.navigate("/cart");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
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
          <View style={styles.cartContainer}>
            <TouchableOpacity
              onPress={handleCart}
              style={{
                flexDirection: "row",
                position: "relative",
                paddingVertical: 10,
              }}
            >
              <FontAwesome
                name="shopping-cart"
                size={24}
                color="#555"
                style={styles.icon}
              />
            </TouchableOpacity>
            <View
              style={{
                height: 20,
                width: 20,
                position: "absolute",
                top: 1,
                left: "50%",
                zIndex: 2,
                backgroundColor: "red",
                borderRadius: 20,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>{cartItems.length}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => console.log("Message Icon Pressed")}>
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={24}
              color="#555"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.carouselContainer}>
        <Image
          source={images[currentImageIndex]}
          style={styles.carouselImage}
        />
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
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  carouselContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
