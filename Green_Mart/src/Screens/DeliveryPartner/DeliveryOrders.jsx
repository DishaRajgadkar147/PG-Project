import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DELIVERY_COLOR = "#16A34A";

const orders = [
  {
    id: 1,
    shop: "GreenMart – Andheri",
    address: "13th Street, Andheri West",
    amount: "₹120",
    status: "Assigned",
  },
  {
    id: 2,
    shop: "GreenMart – Bandra",
    address: "Link Road, Bandra East",
    amount: "₹200",
    status: "Picked",
  },
  {
    id: 3,
    shop: "GreenMart – Powai",
    address: "Hiranandani Gardens",
    amount: "₹180",
    status: "Delivered",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Assigned":
      return { bg: "#FEF3C7", text: "#92400E", icon: "time-outline" };
    case "Picked":
      return { bg: "#DBEAFE", text: "#1E40AF", icon: "cube-outline" };
    case "Delivered":
      return {
        bg: "#DCFCE7",
        text: "#166534",
        icon: "checkmark-circle-outline",
      };
    default:
      return { bg: "#E5E7EB", text: "#374151", icon: "ellipse-outline" };
  }
};

const DeliveryOrders = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>My Orders</Text>
            <Text style={styles.headerSub}>
              {orders.length} active orders
            </Text>
          </View>

          <View style={{ width: 22 }} />
        </View>

        {/* ORDERS */}
        {orders.map((order) => {
          const statusStyle = getStatusStyle(order.status);

          return (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("DeliveryCurrentOrder", {
                  orderId: `#ORD${order.id}`,
                  shop: order.shop,
                  pickupAddress: order.shop,
                  dropAddress: order.address,
                  amount: order.amount,
                  status: order.status,
                  customer: "Rahul Sharma",
                  phone: "9998887776",
                })
              }
            >

              {/* TOP ROW */}
              <View style={styles.topRow}>
                <View style={styles.shopRow}>
                  <Ionicons
                    name="storefront-outline"
                    size={18}
                    color={DELIVERY_COLOR}
                  />
                  <Text style={styles.shop}>{order.shop}</Text>
                </View>

                <Text style={styles.amount}>{order.amount}</Text>
              </View>

              {/* ADDRESS */}
              <View style={styles.addressRow}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color="#6B7280"
                />
                <Text style={styles.address}>{order.address}</Text>
              </View>

              {/* FOOTER */}
              <View style={styles.footer}>
                <View
                  style={[
                    styles.statusChip,
                    { backgroundColor: statusStyle.bg },
                  ]}
                >
                  <Ionicons
                    name={statusStyle.icon}
                    size={14}
                    color={statusStyle.text}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: statusStyle.text },
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>

                <View style={styles.viewRow}>
                  <Text style={styles.viewText}>View Details</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color="#6B7280"
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryOrders;

/* ================= PREMIUM STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: DELIVERY_COLOR,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 28,
    marginBottom: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  headerSub: {
    color: "#DCFCE7",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },

  orderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 16,
    marginBottom: 18,
    elevation: 4,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  shopRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  shop: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  amount: {
    fontSize: 15,
    fontWeight: "900",
    color: DELIVERY_COLOR,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  address: {
    marginLeft: 6,
    fontSize: 12,
    color: "#6B7280",
    flex: 1,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },

  viewRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    marginRight: 2,
  },
});
