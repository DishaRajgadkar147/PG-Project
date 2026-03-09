import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "../Redux/addressSlice";
import { useNavigation } from "@react-navigation/native";

const ShippingAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savedAddress = useSelector((state) => state.address.data);

  const [name, setName] = useState(savedAddress?.name || "");
  const [phone, setPhone] = useState(savedAddress?.phone || "");
  const [address, setAddress] = useState(savedAddress?.address || "");

  const save = () => {
    if (!name || !phone || !address) {
      Alert.alert("Missing Details", "Please fill all fields");
      return;
    }

    dispatch(
      saveAddress({
        name,
        phone,
        address,
      })
    );

    Alert.alert("Saved ✅", "Shipping address saved successfully");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Shipping Address</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={[styles.input, styles.address]}
        placeholder="House no, Street, City, Pincode"
        multiline
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Save Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  address: {
    height: 90,
    textAlignVertical: "top",
  },
  btn: {
    backgroundColor: "#53B175",
    padding: 16,
    borderRadius: 14,
    marginTop: 30,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
