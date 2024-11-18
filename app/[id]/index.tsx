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
import { useDispatch, useSelector } from "react-redux";
import { productData } from "../../constant/data";
import { addToCart } from "../../store/slicer/Cart";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  const handleCartNavigate = () => {
    router.push("./cart");
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product?.id,
        name: product?.model,
        price: product?.price,
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.cartContainer}>
            <TouchableOpacity onPress={handleCartNavigate}>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.model}>{product.model}</Text>
          <Text style={styles.price}>${product.price}</Text>
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

        <View style={styles.quantityContainer}>
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

        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>
            <FontAwesome name="shopping-cart" size={16} color="white" /> Add To
            Cart
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
  },
  cartIcon: {
    marginLeft: "auto",
  },
  content: {
    flex: 1,
  },
  productInfo: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  brand: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  model: {
    fontSize: 20,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontSize: 24,
    color: "#2E8B57",
    fontWeight: "bold",
    marginTop: 8,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 10,
  },

  quantityButton: {
    backgroundColor: "#f8f8f8",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // For slight shadow effect
  },

  quantityButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
  },

  quantityValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 10,
  },

  addToCartBtn: {
    backgroundColor: "#2E8B57",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },

  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProductDetail;
