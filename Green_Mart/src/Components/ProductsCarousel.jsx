import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

const ProductsCarousel = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* CLICKABLE PRODUCT */}
          <TouchableOpacity
            style={styles.content}
            onPress={() =>
              navigation.navigate("Details", { product: item })
            }
          >
            <Image source={item.image} style={styles.image} />

            <Text numberOfLines={2} style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.qty}>{item.quantity}</Text>

            <Text style={styles.price}>₹ {item.price}</Text>
          </TouchableOpacity>

          {/* ADD BUTTON FIXED AT BOTTOM */}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => dispatch(addToCart(item))}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default ProductsCarousel;

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 260,                // ✅ FIXED HEIGHT
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between", // ✅ KEY FIX
  },
  content: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 110,
    resizeMode: "contain",
    alignSelf: "center",
  },
  name: {
    fontWeight: "600",
    marginTop: 6,
  },
  qty: {
    color: "gray",
    fontSize: 12,
  },
  price: {
    fontWeight: "700",
    marginTop: 4,
  },
  addBtn: {
    backgroundColor: "#53B175",
    paddingVertical: 8,
    borderRadius: 8,
  },
  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
