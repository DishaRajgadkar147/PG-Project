import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../Redux/cartSlice";

const IMAGE_URL = "http://192.168.1.104:4000/productimages";

const Cart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.qty,
    0
  );

  const renderItem = ({ item }) => {
    const id = item.product_id || item.id;
    const imageUri = item.image
      ? `${IMAGE_URL}/${item.image}`
      : "https://via.placeholder.com/100";

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.quantity}>
            Available: {item.stock_quantity ?? 0}
          </Text>

          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={() => dispatch(decreaseQty(id))}>
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyNumber}>{item.qty}</Text>

            <TouchableOpacity onPress={() => dispatch(increaseQty(id))}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.right}>
          <TouchableOpacity onPress={() => dispatch(removeFromCart(id))}>
            <Ionicons name="close" size={20} color="gray" />
          </TouchableOpacity>

          <Text style={styles.price}>
            ₹ {(item.price ?? 0) * item.qty}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) =>
            (item.product_id || item.id || index).toString()
          }
          renderItem={renderItem}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.checkout}>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
            <Text style={styles.total}>₹ {totalPrice}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "gray",
  },
  card: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: "600",
  },
  quantity: {
    color: "gray",
    fontSize: 12,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 5,
  },
  qtyText: {
    fontSize: 22,
    fontWeight: "700",
  },
  qtyNumber: {
    fontWeight: "700",
    fontSize: 15,
  },
  right: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  price: {
    fontWeight: "700",
  },
  checkout: {
    marginTop: 10,
  },
  checkoutBtn: {
    backgroundColor: "#53B175",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
  },
  total: {
    color: "#fff",
    fontWeight: "700",
  },
});
