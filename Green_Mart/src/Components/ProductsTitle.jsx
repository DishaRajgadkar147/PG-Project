import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductsTitle = ({ title, data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductsList", {
            list: data,
            title: title,
          })
        }
      >
        <Text style={styles.seeAll}>See All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductsTitle;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  seeAll: {
    color: "#53B175",
    fontWeight: "600",
  },
});
