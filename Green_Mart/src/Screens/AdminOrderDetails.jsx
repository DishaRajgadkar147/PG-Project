import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const AdminOrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Temporary static data (later from backend)
  const order = {
    id: "ORD1024",
    status: "Paid",
    date: "12 Aug 2025",
    customer: {
      name: "Rahul Sharma",
      phone: "+91 9876543210",
      address: "Pune, Maharashtra",
    },
    items: [
      { name: "Basmati Rice", qty: 2, price: 599 },
      { name: "Sunflower Oil", qty: 1, price: 249 },
      { name: "Sugar", qty: 1, price: 99 },
    ],
  };

  const total = order.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <GreenMartTitle size={24} />
        </View>

        {/* ORDER SUMMARY */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.orderId}>{order.id}</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>

          <Text style={styles.subText}>Date: {order.date}</Text>
        </View>

        {/* CUSTOMER DETAILS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Customer Details</Text>

          <Text style={styles.text}>
            Name: <Text style={styles.bold}>{order.customer.name}</Text>
          </Text>

          <Text style={styles.text}>
            Phone: {order.customer.phone}
          </Text>

          <Text style={styles.text}>
            Address: {order.customer.address}
          </Text>
        </View>

        {/* ORDER ITEMS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ordered Items</Text>

          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.name} × {item.qty}
              </Text>
              <Text style={styles.itemPrice}>
                ₹ {item.price * item.qty}
              </Text>
            </View>
          ))}
        </View>

        {/* PRICE SUMMARY */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹ {total}</Text>
          </View>
        </View>

        {/* ADMIN ACTIONS (FOR LATER) */}
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Update Order Status</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminOrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  back: {
    fontSize: 22,
    marginRight: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 18,
    fontWeight: "800",
    color: myColors.third,
  },

  status: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  subText: {
    marginTop: 8,
    color: "gray",
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    color: myColors.third,
  },

  text: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },

  bold: {
    fontWeight: "700",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  itemName: {
    fontSize: 14,
    fontWeight: "600",
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: myColors.primary,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "900",
    color: myColors.primary,
  },

  actionBtn: {
    backgroundColor: myColors.primary,
    padding: 16,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 30,
  },

  actionText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },
});
