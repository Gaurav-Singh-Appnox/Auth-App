import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/slicer/Cart";

const Cart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleProductPress = (productId: string | number) => {
    router.push({
      pathname: "/[id]",
      params: { id: productId },
    });
  };
  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    } else {
      dispatch(removeFromCart({ id: item.id }));
    }
  };
  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  // Calculate total cost and breakdown
  const calculateTotal = () => {
    let totalCost = 0;
    cartItems.forEach((item) => {
      totalCost += item.totalPrice;
    });
    return totalCost;
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      <ScrollView style={styles.content}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          </View>
        ) : (
          cartItems.map((item) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={() => handleProductPress(item.id)}>
                <View style={styles.cartItem}>
                  <View style={styles.productImage}>
                    <Image
                      source={item.img}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                    />
                  </View>
                  <View key={item.id}>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>${item.price}</Text>
                      <Text style={styles.itemTotalPrice}>
                        Total: ${item.totalPrice}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                  <FontAwesome name="trash" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDecreaseQuantity(item)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleIncreaseQuantity(item)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      {/* <View style={styles.stickyActionBar}>
        <View style={styles.checkout}>
          <View></View>
          <TouchableOpacity style={styles.checkoutbtn}>
          <Text style={styles.addToCartText}>checkout</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  backText: {
    fontSize: 18,
    color: "#007BFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  emptyCartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#666",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },

  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  itemTotalPrice: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 10,
  },
  totalCostContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  totalCostTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  breakdownItem: {
    marginBottom: 5,
  },
  breakdownText: {
    fontSize: 16,
    color: "#333",
  },
  totalCost: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productImage: {
    width: 160,
    height: 120,
    borderRadius: 10,
    // backgroundColor: "red",
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  stickyActionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    height: 60,
    width: "100%",
    backgroundColor: "red",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
  },
  checkout: {
    marginHorizontal:10,
    flex:1,
    height: 50,
    backgroundColor:"blue"
  },
  checkoutbtn:{
    height: 40,
    width: "50%",
    backgroundColor:"orange",
    alignItems:'center',
  }
});

export default Cart;
