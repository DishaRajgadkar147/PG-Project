import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const AdminHome = () => {
  const navigation = useNavigation();

  // 🔹 Animations (SAFE – built-in)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <GreenMartTitle size={30} />
          <Text style={styles.headerSub}>Admin Dashboard</Text>
        </View>

        {/* HIGHLIGHT CARD */}
        <Animated.View style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>Today’s Revenue</Text>
          <Text style={styles.highlightValue}>₹18,900</Text>
          <Text style={styles.highlightNote}>Live update</Text>
        </Animated.View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <StatCard title="Orders" value="128" color="#E8F8F0" />
          <StatCard title="Products" value="56" color="#EAF1FF" />
        </View>

        <View style={styles.statsRow}>
          <StatCard title="Users" value="42" color="#FFF2E6" />
          <StatCard title="Pending" value="8" color="#F3ECFF" />
        </View>

        {/* MANAGEMENT */}
        <Text style={styles.sectionTitle}>Management</Text>

        <MenuCard
          title="Orders"
          desc="Track and manage customer orders"
          onPress={() => navigation.navigate("AdminOrders")}
        />

        <MenuCard
          title="Products"
          desc="Manage inventory & pricing"
          onPress={() => navigation.navigate("AdminProducts")}
        />

        <MenuCard
          title="Users"
          desc="View and control users"
          onPress={() => navigation.navigate("AdminUsers")}
        />

        {/* LOGOUT */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.logoutBtn}
          onPress={() =>
            navigation.replace("Auth", { screen: "Login" })
          }
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default AdminHome;

/* 🔹 SMALL COMPONENTS */

const StatCard = ({ title, value, color }) => (
  <View style={[styles.statCard, { backgroundColor: color }]}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{title}</Text>
  </View>
);

const MenuCard = ({ title, desc, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    style={styles.menuCard}
    onPress={onPress}
  >
    <Text style={styles.menuTitle}>{title}</Text>
    <Text style={styles.menuDesc}>{desc}</Text>
  </TouchableOpacity>
);

/* 🔹 STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
    padding: 16,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  headerSub: {
    marginTop: 6,
    fontSize: 14,
    color: "gray",
    fontWeight: "600",
  },

  highlightCard: {
    backgroundColor: myColors.primary,
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
  },

  highlightTitle: {
    color: "#E8FFF1",
    fontSize: 14,
    fontWeight: "600",
  },

  highlightValue: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    marginVertical: 6,
  },

  highlightNote: {
    color: "#DFF7EA",
    fontSize: 12,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  statCard: {
    width: "48%",
    borderRadius: 18,
    padding: 18,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#222",
  },

  statLabel: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: myColors.third,
    marginVertical: 14,
  },

  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: myColors.third,
  },

  menuDesc: {
    marginTop: 6,
    fontSize: 13,
    color: "gray",
  },

  logoutBtn: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 30,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },
});
