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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { myColors } from "../Utils/MyColors";
import GreenMartTitle from "../Components/GreenMartTitle";

const ADMIN_COLOR = "#0F766E"; // premium teal

const AdminAuth = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.1.104:4000/api/admin/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // save token
        await AsyncStorage.setItem("token", result.data.token);
        await AsyncStorage.setItem("role", "admin");

        Alert.alert("Success", "Admin login successful");

        navigation.replace("AdminHome");
      } else {
        Alert.alert("Login Failed", result.error || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* BRAND */}
        <View style={styles.brand}>
          <GreenMartTitle size={30} />
          <View style={styles.adminBadge}>
            <Ionicons
              name="settings-outline"
              size={16}
              color={ADMIN_COLOR}
            />
            <Text style={styles.adminBadgeText}>Admin Panel</Text>
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Administrator Login</Text>
        <Text style={styles.subtitle}>
          Secure access for store management
        </Text>

        {/* EMAIL */}
        <Text style={styles.label}>Admin Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter admin email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.adminBtn}
          onPress={handleAdminLogin}
          disabled={loading}
        >
          <Ionicons
            name="lock-closed-outline"
            size={18}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.adminText}>
            {loading ? "Logging in..." : "Login to Admin Panel"}
          </Text>
        </TouchableOpacity>

        {/* BACK TO USER LOGIN */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() =>
            navigation.replace("Auth", { screen: "Login" })
          }
        >
          <Text style={styles.backText}>
            ← Back to User Login
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminAuth;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.secondary,
  },

  scroll: {
    padding: 20,
  },

  brand: {
    alignItems: "center",
    marginBottom: 25,
  },

  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6FFFA",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },

  adminBadgeText: {
    color: ADMIN_COLOR,
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: myColors.third,
  },

  subtitle: {
    fontSize: 14,
    color: "grey",
    marginTop: 6,
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "grey",
    marginTop: 18,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#E3E3E3",
    fontSize: 16,
    paddingVertical: 8,
    marginTop: 6,
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E3E3E3",
    marginTop: 6,
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },

  adminBtn: {
    backgroundColor: ADMIN_COLOR,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  adminText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  backBtn: {
    marginTop: 28,
  },

  backText: {
    textAlign: "center",
    color: myColors.primary,
    fontWeight: "700",
  },
});
