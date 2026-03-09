import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { showInfo } from "../Utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigation = useNavigation();

  // 🔹 Get profile data from Redux
  const profile = useSelector((state) => state.profile.data);

  const Item = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={18} color="#53B175" />
        </View>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={42} color="#fff" />
            </View>
          </View>

          <Text style={styles.name}>
            {profile.name || "Guest User"}
          </Text>

          <Text style={styles.phone}>
            {profile.phone ? `+91 ${profile.phone}` : "No phone added"}
          </Text>

          {profile.email ? (
            <Text style={styles.email}>{profile.email}</Text>
          ) : null}
        </View>

        {/* MENU */}
        <View style={styles.menu}>
          <Item
            icon="receipt-outline"
            title="Order History"
            onPress={() =>
              navigation.navigate("Main", { screen: "Orders" })
            }
          />

          <Item
            icon="location-outline"
            title="Shipping Address"
            onPress={() => navigation.navigate("ShippingAddress")}
          />

          <Item
            icon="create-outline"
            title="Edit Profile"
            onPress={() => navigation.navigate("EditProfile")}
          />

          <Item
           icon="shield-checkmark-outline"
           title="Privacy Policy"
           onPress={() => navigation.navigate("PrivacyPolicy")}
          />


          <Item
           icon="settings-outline"
           title="Settings"
           onPress={() => navigation.navigate("Settings")}
          />

        </View>

        {/* LOGOUT */}
          <TouchableOpacity
  style={styles.logout}
  onPress={() => {
    showInfo("Logged Out", "You have been logged out");

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Auth",
            params: { screen: "Login" },
          },
        ],
      });
    }, 500);
  }}
>
  <Ionicons name="log-out-outline" size={20} color="#fff" />
  <Text style={styles.logoutText}>Log Out</Text>
</TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  /* HEADER */
  header: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  avatarRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
  },

  phone: {
    color: "gray",
    marginTop: 4,
  },

  email: {
    color: "gray",
    marginTop: 2,
    fontSize: 13,
  },

  /* MENU */
  menu: {
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

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EAF7F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  itemText: {
    fontSize: 16,
    fontWeight: "600",
  },

  /* LOGOUT */
  logout: {
    marginTop: 30,
    backgroundColor: "#E53935",
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
});
