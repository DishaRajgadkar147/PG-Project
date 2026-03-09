import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const DELIVERY_COLOR = "#16A34A";

const DeliveryCurrentOrder = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    orderId = "#ORD1023",
    shop = "GreenMart – Andheri",
    pickupAddress = "GreenMart Store, Andheri West",
    dropAddress = "13th Street, Andheri West",
    customer = "Rahul Sharma",
    phone = "9998887776",
    amount = "₹120",
  } = route.params || {};

  const [status, setStatus] = useState("Assigned");

  const handleAction = () => {
    if (status === "Assigned") {
      setStatus("Picked");
      Alert.alert("Order Picked", "Proceed to delivery 📦");
    } else if (status === "Picked") {
      setStatus("Delivered");
      Alert.alert("Delivered", "Order delivered successfully 🎉");
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Current Order</Text>
          <Text style={styles.orderId}>{orderId}</Text>
        </View>

        {/* STATUS CARD */}
        <View style={styles.statusCard}>
          <Ionicons
            name={
              status === "Assigned"
                ? "time-outline"
                : status === "Picked"
                ? "cube-outline"
                : "checkmark-circle"
            }
            size={28}
            color={DELIVERY_COLOR}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.statusLabel}>Order Status</Text>
            <Text style={styles.statusValue}>{status}</Text>
          </View>
        </View>

        {/* PICKUP */}
        <InfoCard title="Pickup Location" icon="storefront-outline">
          <Text style={styles.bold}>{shop}</Text>
          <Text style={styles.subText}>{pickupAddress}</Text>
        </InfoCard>

        {/* DROP */}
        <InfoCard title="Delivery Location" icon="location-outline">
          <Text style={styles.bold}>{customer}</Text>
          <Text style={styles.subText}>{dropAddress}</Text>
        </InfoCard>

        {/* CUSTOMER */}
        <InfoCard title="Customer Details" icon="person-outline">
          <View style={styles.row}>
            <Ionicons name="call-outline" size={18} color={DELIVERY_COLOR} />
            <Text style={styles.rowText}>{phone}</Text>
          </View>
        </InfoCard>

        {/* PAYMENT */}
        <InfoCard title="Payment" icon="wallet-outline">
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Amount to Collect</Text>
            <Text style={styles.amountValue}>{amount}</Text>
          </View>
          <Text style={styles.payment}>Cash on Delivery</Text>
        </InfoCard>

        {/* ACTION BUTTON */}
        <TouchableOpacity style={styles.actionBtn} onPress={handleAction}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
          <Text style={styles.actionText}>
            {status === "Assigned"
              ? "Mark as Picked"
              : "Mark as Delivered"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryCurrentOrder;

/* ---------- REUSABLE CARD ---------- */
const InfoCard = ({ title, icon, children }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Ionicons name={icon} size={18} color={DELIVERY_COLOR} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: DELIVERY_COLOR,
    padding: 18,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },

  orderId: {
    color: "#DCFCE7",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },

  statusCard: {
    backgroundColor: "#ECFDF5",
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  statusLabel: {
    fontSize: 12,
    color: "#166534",
    fontWeight: "600",
  },

  statusValue: {
    fontSize: 17,
    fontWeight: "900",
    color: "#14532D",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  cardTitle: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "800",
  },

  bold: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  subText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "700",
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  amountLabel: {
    fontSize: 13,
    color: "#6B7280",
  },

  amountValue: {
    fontSize: 18,
    fontWeight: "900",
    color: DELIVERY_COLOR,
  },

  payment: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
  },

  actionBtn: {
    backgroundColor: DELIVERY_COLOR,
    marginHorizontal: 16,
    borderRadius: 22,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    elevation: 4,
  },

  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 8,
  },
});
