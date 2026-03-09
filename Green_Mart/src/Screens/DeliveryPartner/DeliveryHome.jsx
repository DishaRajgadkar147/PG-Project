import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { myColors } from "../../Utils/MyColors";

const DELIVERY_COLOR = "#16A34A";

const DeliveryHome = () => {
  const [online, setOnline] = useState(true);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Good Morning 👋</Text>
            <Text style={styles.name}>Aman</Text>
            <Text style={styles.role}>Delivery Partner</Text>
          </View>

          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => navigation.navigate("DeliveryProfile")}
          >
            <Ionicons name="person-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* STATUS CARD */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statusTitle}>Availability</Text>
            <Text style={styles.statusSub}>
              {online ? "You are accepting orders" : "You are offline"}
            </Text>
          </View>

          <Switch
            value={online}
            onValueChange={setOnline}
            trackColor={{ true: DELIVERY_COLOR }}
          />
        </View>

        {/* EARNINGS */}
        <View style={styles.earningCard}>
          <Text style={styles.earningLabel}>Today’s Earnings</Text>
          <Text style={styles.amount}>₹ 850</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="cube-outline" size={18} color="#fff" />
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="map-outline" size={18} color="#fff" />
              <Text style={styles.statValue}>12 km</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionRow}>
          <ActionCard
            icon="cube-outline"
            label="My Orders"
            onPress={() => navigation.navigate("DeliveryOrders")}
          />
          <ActionCard
            icon="wallet-outline"
            label="Earnings"
            onPress={() => navigation.navigate("DeliveryEarnings")}
          />
          <ActionCard
            icon="time-outline"
            label="History"
            onPress={() => navigation.navigate("DeliveryHistory")}
          />
        </View>

        {/* CURRENT ORDER */}
        <Text style={styles.sectionTitle}>Current Order</Text>

        <View style={styles.orderCard}>
          <View style={styles.orderTop}>
            <Ionicons name="storefront-outline" size={18} color={DELIVERY_COLOR} />
            <Text style={styles.orderShop}>GreenMart – Andheri</Text>
          </View>

          <Text style={styles.orderAddress}>
            13th Street, Andheri West
          </Text>

          <View style={styles.orderFooter}>
            <Text style={styles.orderAmount}>₹ 120</Text>

            <TouchableOpacity
              style={styles.detailsBtn}
              onPress={() =>
                navigation.navigate("DeliveryCurrentOrder", {
                  orderId: "#ORD1023",
                  shop: "GreenMart – Andheri",
                  pickupAddress: "GreenMart Store, Andheri West",
                  dropAddress: "13th Street, Andheri West",
                  customer: "Rahul Sharma",
                  phone: "9998887776",
                  amount: "₹120",
                })
              }
            >
              <Text style={styles.detailsText}>View Details</Text>
              <Ionicons name="chevron-forward" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {!online && (
          <Text style={styles.offlineText}>
            Go online to start receiving orders
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

/* SMALL COMPONENT */
const ActionCard = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <Ionicons name={icon} size={24} color={DELIVERY_COLOR} />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

export default DeliveryHome;

/* ================= PREMIUM STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },

  header: {
    backgroundColor: DELIVERY_COLOR,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  welcome: {
    color: "#DCFCE7",
    fontSize: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
  },

  role: {
    color: "#E5FBEF",
    fontSize: 12,
    marginTop: 2,
  },

  profileIcon: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 30,
  },

  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  statusTitle: {
    fontWeight: "800",
    fontSize: 14,
  },

  statusSub: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },

  earningCard: {
    backgroundColor: DELIVERY_COLOR,
    borderRadius: 22,
    padding: 20,
    marginBottom: 26,
  },

  earningLabel: {
    color: "#E5FBEF",
    fontSize: 13,
  },

  amount: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    marginVertical: 10,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    marginTop: 6,
  },

  statLabel: {
    fontSize: 12,
    color: "#E5FBEF",
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14,
    color: myColors.third,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  actionCard: {
    backgroundColor: "#fff",
    width: "30%",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
    elevation: 3,
  },

  actionText: {
    marginTop: 8,
    fontWeight: "700",
    fontSize: 12,
  },

  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  orderTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  orderShop: {
    fontWeight: "900",
    fontSize: 15,
    marginLeft: 8,
  },

  orderAddress: {
    color: "gray",
    fontSize: 12,
    marginVertical: 8,
  },

  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  orderAmount: {
    fontSize: 18,
    fontWeight: "900",
    color: DELIVERY_COLOR,
  },

  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: DELIVERY_COLOR,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },

  detailsText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
    marginRight: 4,
  },

  offlineText: {
    textAlign: "center",
    color: "gray",
    marginTop: 30,
  },
});
