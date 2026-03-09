import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const DELIVERY_COLOR = "#16A34A";

const EditDeliveryProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState(route.params?.name || "");
  const [phone, setPhone] = useState(route.params?.phone || "");
  const [email, setEmail] = useState(route.params?.email || "");
  const [vehicle, setVehicle] = useState(route.params?.vehicle || "");

  const handleSave = () => {
    navigation.navigate("DeliveryProfile", {
      name,
      phone,
      email,
      vehicle,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Input
            icon="person-outline"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />

          <Input
            icon="call-outline"
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Input
            icon="mail-outline"
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            icon="bicycle-outline"
            placeholder="Vehicle Type (Bike / Scooter)"
            value={vehicle}
            onChangeText={setVehicle}
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color="#fff"
          />
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const Input = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}) => (
  <View style={styles.inputBox}>
    <Ionicons
      name={icon}
      size={18}
      color={DELIVERY_COLOR}
      style={styles.inputIcon}
    />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor="#9CA3AF"
    />
  </View>
);

export default EditDeliveryProfile;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FDF4",
  },

  header: {
    backgroundColor: DELIVERY_COLOR,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    marginBottom: 30,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 16,
    color: "#14532D",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  saveBtn: {
    backgroundColor: DELIVERY_COLOR,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 8,
  },
});
