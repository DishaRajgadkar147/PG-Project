import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { showSuccess } from "../Utils/toast";
import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  /* ANIMATION */
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  /* CUSTOMER LOGIN HANDLER */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.104:4000/api/customer/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        showSuccess("Welcome 🎉", "Login successful");
        navigation.replace("Main");
      } else {
        Alert.alert("Login Failed", result.error || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* ===== TOP RIGHT ICONS ===== */}
      <View style={styles.topIcons}>

        {/* ADMIN */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.replace("AdminAuth")}
        >
          <Ionicons name="shield-checkmark" size={22} color="#0F766E" />
        </TouchableOpacity>

        {/* DELIVERY PARTNER */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.replace("DeliveryAuth")}
        >
          <Ionicons name="bicycle" size={22} color="#16A34A" />
        </TouchableOpacity>

      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* BRAND */}
        <Animated.View
          style={{
            alignItems: "center",
            marginBottom: 30,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <GreenMartTitle size={32} />
          <Text style={styles.brandSub}>Wholesale Grocery</Text>
        </Animated.View>

        {/* TITLE */}
        <Text style={styles.title}>Customer Login</Text>
        <Text style={styles.subtitle}>
          Welcome back, login to continue
        </Text>

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Enter password"
            secureTextEntry={!passwordVisible}
            style={styles.passwordInput}
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

        {/* FORGOT */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.replace("Signup")}
          >
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.secondary,
  },

  topIcons: {
    position: "absolute",
    top: 15,
    right: 15,
    flexDirection: "row",
    zIndex: 10,
  },

  iconBtn: {
    backgroundColor: "#E6FFFA",
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },

  scroll: {
    padding: 20,
  },

  brandSub: {
    fontSize: 13,
    color: "gray",
    marginTop: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
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

  forgotText: {
    textAlign: "right",
    marginTop: 10,
    color: myColors.primary,
    fontWeight: "600",
  },

  button: {
    backgroundColor: myColors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 40,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  footerText: {
    textAlign: "center",
    marginTop: 25,
    color: "grey",
  },

  link: {
    color: myColors.primary,
    fontWeight: "700",
  },
});
