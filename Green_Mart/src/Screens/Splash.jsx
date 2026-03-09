import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const Splash = () => {
  const navigation = useNavigation();

  // Animations
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#53B175", "#7ED9A6"]}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* LOTTIE BACKGROUND */}
      <LottieView
        source={require("../assets/leaf.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      {/* BRAND */}
      <Animated.View
        style={[
          styles.brandContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.brand}>
          <Text style={styles.green}>Green </Text>
          <Text style={styles.mart}>Mart</Text>
        </Text>

        <Animated.Text
          style={[
            styles.tagline,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          Fresh groceries delivered fast
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  lottie: {
    position: "absolute",
    width: 350,
    height: 350,
    opacity: 0.25,
  },

  brandContainer: {
    alignItems: "center",
  },

  brand: {
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 1,
  },

  green: {
    color: "#FFFFFF", // Green text in WHITE
  },

  mart: {
    color: "#000000", // Mart in BLACK
  },

  tagline: {
    marginTop: 10,
    fontSize: 15,
    color: "#F1FFF8",
    letterSpacing: 0.5,
  },
});

