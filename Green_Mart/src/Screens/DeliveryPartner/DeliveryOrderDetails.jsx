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

const DeliveryOrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    shop = "GreenMart – Andheri",
    address = "13th Street, Andheri West",
    amount = "₹120",
    customer = "Rahul Sharma",
    phone = "9998887776",
    status: initialStatus = "Assigned",
  } = route.params || {};

  const [status, setStatus] = useState(initialStatus);

  const handleAction = () => {
    if (status === "Assigned") {
      setStatus("Picked");
      Alert.alert("Success", "Order marked as Picked 📦");
    } else if (status === "Picked") {
      setStatus("Delivered");
      Alert.alert("Success", "Order Delivered 🎉");
    }
  };

  const getButtonText = () => {
    if (status === "Assigned") return "Mark as Picked";
    if (status === "Picked") return "Mark as Delivered";
    return "Order Completed";
  };

  const isDisabled = status === "Delivered";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* STATUS */}
        <View style={styles.statusCard}>
          <Ionicons
            name={
              status === "Delivered"
                ? "checkmark-circle"
                : status === "Picked"
                ? "cube"
                : "time"
            }
            size={26}
            color={DELIVERY_COLOR}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.statusLabel}>Current Status</Text>
            <Text style={styles.statusValue}>{status}</Text>
          </View>
        </View>

        {/* STORE */}
        <InfoCard title="Pickup Store" icon="storefront-outline">
          <Text style={styles.bold}>{shop}</Text>
        </InfoCard>

        {/* CUSTOMER */}
        <InfoCard title="Customer Details" icon="person-outline">
          <InfoRow icon="person-outline" value={customer} />
          <InfoRow icon="call-outline" value={phone} />
          <InfoRow icon="location-outline" value={address} />
        </InfoCard>

        {/* PAYMENT */}
        <InfoCard title="Payment" icon="wallet-outline">
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Order Amount</Text>
            <Text style={styles.amountValue}>{amount}</Text>
          </View>
          <Text style={styles.payment}>Cash on Delivery</Text>
        </InfoCard>

        {/* ACTION BUTTON */}
        <TouchableOpacity
          style={[
            styles.actionBtn,
            isDisabled && { backgroundColor: "#9CA3AF" },
          ]}
          onPress={handleAction}
          disabled={isDisabled}
        >
          <Text style={styles.actionText}>{getButtonText()}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryOrderDetails;

/* --------- REUSABLE COMPONENTS --------- */

const InfoCard = ({ title, icon, children }) => (
  <View style={styles.card}>
    <View style={styles.cardTitleRow}>
      <Ionicons name={icon} size={18} color={DELIVERY_COLOR} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const InfoRow = ({ icon, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={16} color="#6B7280" />
    <Text style={styles.infoText}>{value}</Text>
  </View>
);

/* --------- STYLES --------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: DELIVERY_COLOR,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  statusCard: {
    backgroundColor: "#ECFDF5",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  statusLabel: {
    fontSize: 12,
    color: "#166534",
    fontWeight: "600",
  },

  statusValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#14532D",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },

  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  cardTitle: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "800",
  },

  bold: {
    fontSize: 15,
    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  amountLabel: {
    color: "#6B7280",
    fontSize: 13,
  },

  amountValue: {
    fontSize: 16,
    fontWeight: "900",
    color: DELIVERY_COLOR,
  },

  payment: {
    fontSize: 14,
    fontWeight: "700",
  },

  actionBtn: {
    backgroundColor: DELIVERY_COLOR,
    marginHorizontal: 16,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 30,
  },

  actionText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
