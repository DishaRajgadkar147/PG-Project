import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const AdminUserDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Temporary static user (later from backend / Redux)
  const user = route.params?.user || {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    status: "Active",
    address: "Pune, Maharashtra, India",
    joined: "10 Aug 2025",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <GreenMartTitle size={24} />
        </View>

        {/* USER CARD */}
        <View style={styles.profileCard}>
          <Text style={styles.name}>{user.name}</Text>

          <View
            style={[
              styles.statusBadge,
              user.status === "Active"
                ? styles.active
                : styles.blocked,
            ]}
          >
            <Text style={styles.statusText}>{user.status}</Text>
          </View>
        </View>

        {/* USER INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <Text style={styles.infoText}>
            📧 Email: {user.email}
          </Text>

          <Text style={styles.infoText}>
            📞 Phone: +91 {user.phone}
          </Text>

          <Text style={styles.infoText}>
            📍 Address: {user.address}
          </Text>
        </View>

        {/* META */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Details</Text>

          <Text style={styles.infoText}>
            Joined On: {user.joined}
          </Text>
        </View>

        {/* ADMIN ACTIONS */}
        <TouchableOpacity
          style={[
            styles.actionBtn,
            user.status === "Active"
              ? styles.blockBtn
              : styles.unblockBtn,
          ]}
        >
          <Text style={styles.actionText}>
            {user.status === "Active"
              ? "Block User"
              : "Unblock User"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminUserDetails;

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

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: "900",
    color: myColors.third,
    marginBottom: 8,
  },

  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  active: {
    backgroundColor: "#1DB954",
  },

  blocked: {
    backgroundColor: "#E63946",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    color: myColors.third,
  },

  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },

  actionBtn: {
    padding: 16,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 30,
  },

  blockBtn: {
    backgroundColor: "#FFECEC",
  },

  unblockBtn: {
    backgroundColor: "#E8F8F0",
  },

  actionText: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
    color: myColors.third,
  },
});
