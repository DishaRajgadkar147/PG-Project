import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { showSuccess } from "../Utils/toast";
import { addOrder } from "../Redux/ordersSlice";
import { clearCart } from "../Redux/cartSlice";

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const savedAddress = useSelector((state) => state.address.data);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");
  const [loading, setLoading] = useState(false);

  /* AUTO-FILL ADDRESS */
  useEffect(() => {
    if (savedAddress) {
      setName(savedAddress.name || "");
      setPhone(savedAddress.phone || "");
      setAddress(savedAddress.address || "");
    }
  }, [savedAddress]);

  /* PLACE ORDER */
  const placeOrder = () => {
    if (loading) return;

    if (!name || !phone || !address) {
      Alert.alert("Missing Details", "Please fill all details");
      return;
    }

    if (phone.length !== 10) {
      Alert.alert("Invalid Phone", "Enter valid 10-digit phone number");
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Add items before checkout");
      return;
    }

    setLoading(true);

    const newOrder = {
      id: "ORD" + Date.now(),
      date: new Date().toDateString(),
      status: "Pending",
      total: totalPrice,
      payment,
      customer: {
        name,
        phone,
        address,
      },
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        qty: item.qty,
        price: item.price,
      })),
    };

    dispatch(addOrder(newOrder));
    dispatch(clearCart());

    // ✅ SUCCESS TOAST
    showSuccess(
      "Order Placed 🎉",
      "Your order has been placed successfully"
    );

    // ✅ Delay navigation so toast is visible
    setTimeout(() => {
      navigation.replace("OrderSuccess", {
        total: totalPrice,
      });
    }, 600);
  };

  const PaymentOption = ({ label, value, icon }) => (
    <TouchableOpacity
      style={[
        styles.paymentOption,
        payment === value && styles.paymentActive,
      ]}
      onPress={() => setPayment(value)}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={22} />
      <Text style={styles.paymentText}>{label}</Text>
      <Ionicons
        name={
          payment === value ? "radio-button-on" : "radio-button-off"
        }
        size={22}
        color="#53B175"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Checkout</Text>

        {/* NAME */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={name}
          onChangeText={setName}
        />

        {/* PHONE */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
        />

        {/* ADDRESS */}
        <Text style={styles.label}>Delivery Address</Text>
        <TextInput
          style={[styles.input, styles.address]}
          placeholder="House no, Street, City, Pincode"
          multiline
          value={address}
          onChangeText={setAddress}
        />

        {/* PAYMENT */}
        <Text style={styles.label}>Payment Method</Text>

        <PaymentOption
          label="Cash on Delivery"
          value="COD"
          icon="cash-outline"
        />

        <PaymentOption
          label="UPI"
          value="UPI"
          icon="phone-portrait-outline"
        />

        <PaymentOption
          label="Debit / Credit Card"
          value="CARD"
          icon="card-outline"
        />

        {/* TOTAL */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>₹ {totalPrice}</Text>
        </View>

        {/* PLACE ORDER */}
        <TouchableOpacity
          style={[
            styles.orderBtn,
            (cartItems.length === 0 || loading) && styles.disabledBtn,
          ]}
          onPress={placeOrder}
          disabled={cartItems.length === 0 || loading}
        >
          <Text style={styles.orderText}>
            {loading ? "Placing Order..." : "Place Order"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    fontSize: 14,
  },
  address: {
    height: 90,
    textAlignVertical: "top",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginTop: 10,
  },
  paymentActive: {
    borderColor: "#53B175",
    backgroundColor: "#F1FAF4",
  },
  paymentText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  orderBtn: {
    backgroundColor: "#53B175",
    padding: 18,
    borderRadius: 16,
    marginTop: 30,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  orderText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
