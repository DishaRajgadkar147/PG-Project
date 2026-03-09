import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderCard = ({ order }) => {
  const statusColor =
    order.status === "Delivered" ? "#53B175" : "#F4A261";

  return (
    <View style={styles.card}>
      {/* TOP ROW */}
      <View style={styles.row}>
        <Text style={styles.orderId}>{order.id}</Text>

        <View style={[styles.badge, { backgroundColor: statusColor }]}>
          <Text style={styles.badgeText}>{order.status}</Text>
        </View>
      </View>

      {/* DATE */}
      <Text style={styles.date}>{order.date}</Text>

      {/* BOTTOM ROW */}
      <View style={styles.row}>
        <Text style={styles.total}>₹ {order.total}</Text>
        <Text style={styles.items}>
          {order.items.length} item(s)
        </Text>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontWeight: "700",
    fontSize: 15,
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 6,
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
  items: {
    fontSize: 13,
    color: "gray",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
