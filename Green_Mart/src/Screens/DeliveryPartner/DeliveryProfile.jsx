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
import { useNavigation, useRoute } from "@react-navigation/native";

const DELIVERY_COLOR = "#16A34A";

const DeliveryProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    name = "Aman",
    phone = "9876543210",
    email = "aman@gmail.com",
    vehicle = "Bike",
  } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* AVATAR CARD */}
        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={40} color="#fff" />
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>Delivery Partner</Text>
        </View>

        {/* INFO SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <InfoRow icon="call-outline" label="Phone Number" value={phone} />
          <InfoRow icon="mail-outline" label="Email Address" value={email} />
          <InfoRow
            icon="bicycle-outline"
            label="Vehicle Type"
            value={vehicle}
          />
        </View>

        {/* ACTIONS */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate("EditDeliveryProfile", {
              name,
              phone,
              email,
              vehicle,
            })
          }
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Auth", params: { screen: "Login" } }],
            })
          }
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconBox}>
      <Ionicons name={icon} size={18} color={DELIVERY_COLOR} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export default DeliveryProfile;

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
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 60,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  avatarCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    marginTop: -40,
    marginBottom: 24,
    elevation: 4,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: DELIVERY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  role: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 18,
    marginBottom: 26,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
  },

  editBtn: {
    backgroundColor: DELIVERY_COLOR,
    marginHorizontal: 16,
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    elevation: 3,
  },

  editText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 8,
    fontSize: 15,
  },

  logoutBtn: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "800",
    marginLeft: 8,
    fontSize: 15,
  },
});
