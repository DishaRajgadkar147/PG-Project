import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/cartSlice";

const OrderSuccess = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const total = route.params?.total ?? 0;

  useEffect(() => {
    // Success animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // Clear cart once order is placed
    dispatch(clearCart());

    // Redirect to Orders page
    const timer = setTimeout(() => {
      navigation.replace("Main", {
        screen: "Orders",
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name="checkmark-circle"
          size={120}
          color="#53B175"
        />
      </Animated.View>

      <Text style={styles.title}>Order Placed Successfully 🎉</Text>

      <Text style={styles.amount}>₹ {total}</Text>

      <Text style={styles.note}>
        Redirecting to your orders…
      </Text>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
  },
  amount: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  note: {
    marginTop: 10,
    color: "gray",
    fontSize: 13,
  },
});
