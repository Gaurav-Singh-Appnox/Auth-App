import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "../../constant/data";
import { addToCart } from "../../store/slicer/Cart";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product?.id,
        name: product?.model,
        price: product?.price,
        img: product?.img,
        quantity,
      })
    );
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const product = productData.find(
    (item) => item.id.toString() === (id?.toString() ?? "")
  );

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back to Shop</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <Image
            source={product.img}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Brand:</Text>
            <Text style={styles.detailValue}>{product.brand}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model:</Text>
            <Text style={styles.detailValue}>{product.model}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>${product.price}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Action Bar */}
      <View style={styles.stickyActionBar}>
        <View style={{ position: "relative" }}>
          <View style={{ position: "absolute",height: 20,width: 20,borderRadius:10, backgroundColor:"red",left:"50%",bottom:20}}>
            <Text
              style={{ textAlign: "center",color:"white"}}
            >
              {cartItems.length}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("./cart")}>
            <FontAwesome name="shopping-cart" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.capsule}>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.addToCartButton}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          <View style={styles.quantitySelector}>
            <TouchableOpacity
              onPress={handleDecreaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              onPress={handleIncreaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  imgContainer: {
    width: "100%",
    height: 300,
  },
  detailsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    color: "#333",
  },
  stickyActionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  capsule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    overflow: "hidden",
    height: 40,
    flex: 1,
    marginLeft: 16,
    paddingVertical:6 ,
    backgroundColor: "#FFA500",
  },
  addToCartButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantitySelector: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#red",
    paddingVertical: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProductDetail;
