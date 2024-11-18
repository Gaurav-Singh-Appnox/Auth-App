import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { productData } from "../../constant/data";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();
  const handleAddToCart = () => {};
  const cartItems = useSelector((state) => state.cart.items);

  const handleCart = () => {
    router.push("/cart");
  };

  // Creating categories dynamically from product data
  const categories = ["All", ...new Set(productData.map((item) => item.brand))];

  // Filtering products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? productData
      : productData.filter((item) => item.brand === selectedCategory);

  const handleProductPress = (productId: string | number) => {
    router.push({
      pathname: "/[id]",
      params: { id: productId },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shop</Text>
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

      <View style={styles.container}>
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Categories</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryButton}
            >
              {selectedCategory === category && (
                <View style={styles.activeIndicator} />
              )}
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.productsContainer}>
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductPress(product.id)}
              >
                <Text style={styles.productName}>
                  {product.brand} {product.model}
                </Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cartButton: {
    padding: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#f0f0f0",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    padding: 10,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  activeIndicator: {
    width: 2,
    height: "100%",
    backgroundColor: "#007BFF",
    marginRight: 4,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  activeCategoryText: {
    color: "#007BFF",
  },
  productsContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  productCard: {
    width: "48%",
    backgroundColor: "aliceblue",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
  icon: {
    marginHorizontal: 10,
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Shop;
