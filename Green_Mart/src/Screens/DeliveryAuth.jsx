import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { myColors } from "../Utils/MyColors";
import GreenMartTitle from "../Components/GreenMartTitle";

const DELIVERY_COLOR = "#16A34A";
const BASE_URL = "http://192.168.1.104:4000/api/delivery-partner";

const DeliveryAuth = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);

  // common
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // register only
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Error", "Phone and password required");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const result = await response.json();

      if (result.status === "success") {
        Alert.alert(
          "Success",
          `Welcome ${result.data.name} 🚴`
        );

        // TODO: navigate to delivery dashboard
        navigation.replace("DeliveryHome");
      } else {
        Alert.alert("Login Failed", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    }
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        Alert.alert(
          "Success",
          "Registration successful 🎉 Please login"
        );

        // reset & switch to login
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        Alert.alert("Register Failed", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* BRAND */}
        <View style={styles.brand}>
          <GreenMartTitle size={30} />
          <View style={styles.badge}>
            <Ionicons name="bicycle" size={16} color={DELIVERY_COLOR} />
            <Text style={styles.badgeText}>Delivery Partner</Text>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text style={[styles.tabText, isLogin && styles.activeTab]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text style={[styles.tabText, !isLogin && styles.activeTab]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* FORMS */}
        {isLogin ? (
          <>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter full name"
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}

        {/* BACK */}
        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.replace("Auth", { screen: "Login" })}
        >
          <Text style={styles.backText}>← Back to User Login</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryAuth;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FDF4",
  },
  scroll: {
    padding: 20,
  },
  brand: {
    alignItems: "center",
    marginBottom: 25,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: {
    marginLeft: 6,
    fontWeight: "700",
    color: DELIVERY_COLOR,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "gray",
  },
  activeTab: {
    color: DELIVERY_COLOR,
    borderBottomWidth: 2,
    borderColor: DELIVERY_COLOR,
    paddingBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginTop: 18,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 8,
    fontSize: 15,
  },
  button: {
    backgroundColor: DELIVERY_COLOR,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    fontSize: 16,
  },
  backText: {
    textAlign: "center",
    color: myColors.primary,
    fontWeight: "700",
  },
});
