import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Orders = () => {
  const orders = useSelector((state) => state.orders.list);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("OrderDetails", { order: item })
      }
      activeOpacity={0.8}
    >
      {/* TOP ROW */}
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>{item.id}</Text>

        <View
          style={[
            styles.statusBadge,
            item.status === "Delivered"
              ? styles.delivered
              : styles.pending,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      {/* DATE */}
      <Text style={styles.date}>{item.date}</Text>

      {/* TOTAL */}
      <Text style={styles.total}>₹ {item.total}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No orders yet 🛒</Text>
          <Text style={styles.emptySub}>
            Place an order to see it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  /* EMPTY STATE */
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptySub: {
    marginTop: 6,
    color: "gray",
  },

  /* ORDER CARD */
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontWeight: "700",
    fontSize: 15,
  },

  date: {
    color: "gray",
    fontSize: 12,
    marginTop: 6,
  },

  total: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },

  /* STATUS BADGE */
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  delivered: {
    backgroundColor: "#E8F8EF",
  },

  pending: {
    backgroundColor: "#FFF4E5",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#53B175",
  },
});
