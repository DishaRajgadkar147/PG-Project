import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const DATA = [
  {
    title: "What information do we collect?",
    content:
      "We collect personal details such as name, phone number, email address, delivery address, and order information to provide our services.",
  },
  {
    title: "How do we use your information?",
    content:
      "Your information is used to process orders, deliver products, improve app performance, and provide customer support.",
  },
  {
    title: "To whom do we disclose your information?",
    content:
      "We do not sell or share your personal data with third parties except when required for delivery or legal purposes.",
  },
  {
    title: "How do we keep your information secure?",
    content:
      "We use industry-standard security practices to protect your data from unauthorized access.",
  },
  {
    title: "Cookies, location & tracking",
    content:
      "We may use basic analytics and location data to improve app experience and delivery accuracy.",
  },
];

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.subtitle}>
          We value your privacy and are committed to protecting your data.
        </Text>

        {/* ACCORDION */}
        {DATA.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => toggle(index)}
              activeOpacity={0.8}
            >
              <Text style={styles.question}>{item.title}</Text>
              <Ionicons
                name={
                  activeIndex === index ? "remove" : "add"
                }
                size={22}
                color="#fff"
              />
            </TouchableOpacity>

            {activeIndex === index && (
              <View style={styles.answerBox}>
                <Text style={styles.answer}>{item.content}</Text>
              </View>
            )}
          </View>
        ))}

        {/* FOOTER */}
        <Text style={styles.footer}>
          Effective from: January 2025
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },

  card: {
    marginBottom: 12,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#53B175",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  question: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    width: "85%",
  },

  answerBox: {
    backgroundColor: "#F1FAF4",
    padding: 14,
  },

  answer: {
    color: "#444",
    fontSize: 14,
    lineHeight: 20,
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
    fontSize: 12,
  },
});
