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

import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const Signup = () => {
  const navigation = useNavigation();

  // 🔹 FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  /* 🔹 ANIMATION */
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

  // 🔹 SIGNUP HANDLER (BACKEND CONNECTED)
  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.104:4000/api/customer/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            address: "NA",
          }),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("Success", "Signup Successful");
        navigation.replace("Login");
      } else {
        Alert.alert("Signup Failed", data || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scroll}>
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

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Enter your details to continue</Text>

        {/* USERNAME */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={name}
          onChangeText={setName}
        />

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* PHONE */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
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
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* CONFIRM PASSWORD */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm password"
            secureTextEntry={!confirmVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
            <Ionicons
              name={confirmVisible ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* SIGN UP BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.replace("Login")}
          >
            Login
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.secondary,
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
