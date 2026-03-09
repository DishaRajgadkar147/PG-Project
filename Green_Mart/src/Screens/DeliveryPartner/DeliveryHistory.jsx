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

const historyOrders = [
  {
    id: 1,
    shop: "GreenMart – Andheri",
    address: "13th Street, Andheri West",
    amount: "₹120",
    date: "12 Sep 2025",
    time: "6:45 PM",
  },
  {
    id: 2,
    shop: "GreenMart – Bandra",
    address: "Link Road, Bandra East",
    amount: "₹200",
    date: "11 Sep 2025",
    time: "3:10 PM",
  },
  {
    id: 3,
    shop: "GreenMart – Powai",
    address: "Hiranandani Gardens",
    amount: "₹180",
    date: "10 Sep 2025",
    time: "1:30 PM",
  },
];

const DeliveryHistory = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery History</Text>
          <Ionicons name="time-outline" size={22} color="#fff" />
        </View>

        {/* SUMMARY CARD */}
        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>Total Deliveries</Text>
            <Text style={styles.summaryValue}>{historyOrders.length}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View>
            <Text style={styles.summaryLabel}>Total Earnings</Text>
            <Text style={styles.summaryValue}>₹ 500</Text>
          </View>
        </View>

        {/* HISTORY LIST */}
        {historyOrders.map((order) => (
          <View key={order.id} style={styles.historyCard}>
            {/* LEFT TIMELINE */}
            <View style={styles.timeline}>
              <View style={styles.dot} />
              <View style={styles.line} />
            </View>

            {/* CONTENT */}
            <View style={styles.content}>
              <View style={styles.topRow}>
                <Text style={styles.shop}>{order.shop}</Text>
                <Text style={styles.amount}>{order.amount}</Text>
              </View>

              <View style={styles.addressRow}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color="#6B7280"
                />
                <Text style={styles.address}>{order.address}</Text>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color="#6B7280"
                  />
                  <Text style={styles.metaText}>{order.date}</Text>
                </View>

                <View style={styles.metaItem}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="#6B7280"
                  />
                  <Text style={styles.metaText}>{order.time}</Text>
                </View>

                <View style={styles.statusBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={12}
                    color="#166534"
                  />
                  <Text style={styles.statusText}>Delivered</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryHistory;

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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  summaryCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    marginBottom: 24,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  summaryValue: {
    fontSize: 22,
    fontWeight: "900",
    color: DELIVERY_COLOR,
    marginTop: 4,
  },

  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },

  historyCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 20,
  },

  timeline: {
    alignItems: "center",
    marginRight: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: DELIVERY_COLOR,
    marginTop: 6,
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#D1FAE5",
    marginTop: 2,
  },

  content: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    flex: 1,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  shop: {
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
    marginTop: 8,
  },

  address: {
    marginLeft: 6,
    fontSize: 12,
    color: "#6B7280",
    flex: 1,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    flexWrap: "wrap",
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  metaText: {
    marginLeft: 4,
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "600",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#166534",
    marginLeft: 4,
  },
});
