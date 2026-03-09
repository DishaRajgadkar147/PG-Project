import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HomeIcon = () => {
  const navigation = useNavigation();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.header}>
      {/* ANIMATED BRAND NAME */}
      <Animated.View
        style={{
          flexDirection: "row",
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text style={styles.green}>Green </Text>
        <Text style={styles.mart}>Mart</Text>
      </Animated.View>

      {/* CART ICON */}
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => navigation.navigate("Cart")}
      >
        <Ionicons name="cart-outline" size={26} color="#000" />

        {totalQty > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalQty}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HomeIcon;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  green: {
    fontSize: 26,
    fontWeight: "800",
    color: "#53B175",
    letterSpacing: 0.5,
  },

  mart: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E1E1E",
    letterSpacing: 0.5,
  },

  cartBtn: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    right: -8,
    top: -6,
    backgroundColor: "#53B175",
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
