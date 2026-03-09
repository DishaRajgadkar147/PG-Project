import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const orders = [
  {
    id: "ORD1024",
    user: "Rahul Sharma",
    date: "12 Aug 2025",
    amount: "₹1,249",
    status: "Paid",
  },
  {
    id: "ORD1025",
    user: "Amit Verma",
    date: "12 Aug 2025",
    amount: "₹799",
    status: "Pending",
  },
  {
    id: "ORD1026",
    user: "Sneha Patil",
    date: "11 Aug 2025",
    amount: "₹2,099",
    status: "Cancelled",
  },
];

const AdminOrders = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.back} onPress={() => navigation.goBack()}>
            ←
          </Text>
          <GreenMartTitle size={26} />
        </View>

        <Text style={styles.pageTitle}>Orders</Text>
        <Text style={styles.pageSub}>
          Manage all customer orders
        </Text>

        {/* ORDERS LIST */}
        {orders.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.orderId}>{item.id}</Text>

              <View
                style={[
                  styles.statusBadge,
                  item.status === "Paid"
                    ? styles.paid
                    : item.status === "Pending"
                    ? styles.pending
                    : styles.cancelled,
                ]}
              >
                <Text style={styles.statusText}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.text}>
              👤 User: <Text style={styles.bold}>{item.user}</Text>
            </Text>

            <Text style={styles.text}>
              📅 Date: {item.date}
            </Text>

            <Text style={styles.amount}>
              💰 {item.amount}
            </Text>

            <TouchableOpacity style={styles.viewBtn}
            onPress={() =>navigation.navigate("AdminOrderDetails")} >
              <Text style={styles.viewText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminOrders;

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

  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: myColors.third,
  },

  pageSub: {
    fontSize: 13,
    color: "gray",
    marginBottom: 16,
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
    fontSize: 16,
    fontWeight: "800",
    color: myColors.third,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },

  paid: {
    backgroundColor: "#1DB954",
  },

  pending: {
    backgroundColor: "#F4A100",
  },

  cancelled: {
    backgroundColor: "#E63946",
  },

  text: {
    marginTop: 8,
    fontSize: 13,
    color: "#555",
  },

  bold: {
    fontWeight: "700",
  },

  amount: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "900",
    color: myColors.primary,
  },

  viewBtn: {
    marginTop: 14,
    backgroundColor: "#EEF3FF",
    paddingVertical: 10,
    borderRadius: 12,
  },

  viewText: {
    textAlign: "center",
    fontWeight: "700",
    color: myColors.primary,
  },
});
