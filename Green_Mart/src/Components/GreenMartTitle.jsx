import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GreenMartTitle = ({ size = 28 }) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.green, { fontSize: size }]}>Green</Text>
      <Text style={[styles.mart, { fontSize: size }]}> Mart</Text>
    </View>
  );
};

export default GreenMartTitle;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  green: {
    color: "#53B175",
    fontWeight: "800",
  },
  mart: {
    color: "#000",
    fontWeight: "800",
  },
});
