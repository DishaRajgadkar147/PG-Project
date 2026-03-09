import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [promoEnabled, setPromoEnabled] = useState(true);

  const Item = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={icon} size={20} color="#53B175" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.itemSub}>{subtitle}</Text>
          )}
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color="#BDBDBD"
      />
    </TouchableOpacity>
  );

  const SwitchItem = ({ title, value, onChange }) => (
    <View style={styles.switchItem}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#ddd", true: "#53B175" }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Text style={styles.header}>Account Settings</Text>
        <Text style={styles.subHeader}>
          Update your settings like notifications, profile edit etc.
        </Text>

        {/* ACCOUNT */}
        <Text style={styles.section}>ACCOUNT</Text>

        <View style={styles.card}>
          <Item
            icon="person-outline"
            title="Profile Information"
            subtitle="Change your account information"
            onPress={() => navigation.navigate("EditProfile")}
          />

          <Item
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Change your password"
            onPress={() => {}}
          />

          <Item
            icon="card-outline"
            title="Payment Methods"
            subtitle="Add your credit & debit cards"
            onPress={() => {}}
          />

          <Item
            icon="location-outline"
            title="Locations"
            subtitle="Add or remove delivery address"
            onPress={() => navigation.navigate("ShippingAddress")}
          />
        </View>

        {/* NOTIFICATIONS */}
        <Text style={styles.section}>NOTIFICATIONS</Text>

        <View style={styles.card}>
          <SwitchItem
            title="Push Notifications"
            value={pushEnabled}
            onChange={setPushEnabled}
          />

          <SwitchItem
            title="SMS Notifications"
            value={smsEnabled}
            onChange={setSmsEnabled}
          />

          <SwitchItem
            title="Promotional Notifications"
            value={promoEnabled}
            onChange={setPromoEnabled}
          />
        </View>

        {/* MORE */}
        <Text style={styles.section}>MORE</Text>

        <View style={styles.card}>
          <Item
            icon="star-outline"
            title="Rate Us"
            subtitle="Rate us on Play Store"
            onPress={() => {}}
          />

          <Item
            icon="help-circle-outline"
            title="FAQ"
            subtitle="Frequently asked questions"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
  },

  subHeader: {
    color: "gray",
    marginTop: 4,
    marginBottom: 20,
  },

  section: {
    fontSize: 13,
    fontWeight: "700",
    color: "gray",
    marginBottom: 8,
    marginTop: 20,
  },

  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    paddingVertical: 6,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  itemSub: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },

  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
