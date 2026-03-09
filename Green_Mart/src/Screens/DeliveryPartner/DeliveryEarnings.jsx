import React, { useState } from "react";
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

const earningsData = {
  daily: { amount: 850, orders: 6, distance: "14 km" },
  weekly: { amount: 5250, orders: 38, distance: "92 km" },
  monthly: { amount: 21400, orders: 160, distance: "410 km" },
};

const DeliveryEarnings = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("daily");

  const data = earningsData[activeTab];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Earnings</Text>

          <Ionicons name="wallet-outline" size={22} color="#fff" />
        </View>

        {/* TAB SWITCH */}
        <View style={styles.tabWrapper}>
          {["daily", "weekly", "monthly"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MAIN EARNINGS CARD */}
        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>Total Earnings</Text>

          <Text style={styles.earningsAmount}>₹ {data.amount}</Text>

          <View style={styles.periodBadge}>
            <Text style={styles.periodText}>
              {activeTab === "daily"
                ? "Today"
                : activeTab === "weekly"
                ? "This Week"
                : "This Month"}
            </Text>
          </View>
        </View>

        {/* STATS GRID */}
        <View style={styles.statsGrid}>
          <StatBox
            icon="cube-outline"
            label="Orders Completed"
            value={data.orders}
          />

          <StatBox
            icon="map-outline"
            label="Distance Covered"
            value={data.distance}
          />
        </View>

        {/* NOTE CARD */}
        <View style={styles.noteCard}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={DELIVERY_COLOR}
          />
          <Text style={styles.noteText}>
            Earnings shown are approximate and may vary after settlement.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryEarnings;

/* ---------------- COMPONENTS ---------------- */

const StatBox = ({ icon, label, value }) => (
  <View style={styles.statBox}>
    <View style={styles.statIcon}>
      <Ionicons name={icon} size={22} color={DELIVERY_COLOR} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

/* ---------------- STYLES ---------------- */

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
    marginBottom: 24,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    backgroundColor: "#E5E7EB",
    borderRadius: 24,
    padding: 4,
    marginBottom: 24,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  tabActive: {
    backgroundColor: "#fff",
    elevation: 3,
  },

  tabText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6B7280",
  },

  tabTextActive: {
    color: DELIVERY_COLOR,
  },

  earningsCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 26,
    padding: 26,
    alignItems: "center",
    elevation: 5,
    marginBottom: 24,
  },

  earningsLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },

  earningsAmount: {
    fontSize: 36,
    fontWeight: "900",
    color: DELIVERY_COLOR,
    marginVertical: 12,
  },

  periodBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  periodText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "700",
  },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 24,
  },

  statBox: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
    elevation: 4,
  },

  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 4,
  },

  noteCard: {
    backgroundColor: "#ECFDF5",
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  noteText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#166534",
    fontWeight: "600",
    flex: 1,
  },
});
