import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const product = route?.params?.product;

  const [qty, setQty] = useState(1);
  const [showDetails, setShowDetails] = useState(true);

  // SAFETY CHECK
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Product not found
        </Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <View style={styles.imageWrapper}>
          <Image source={product.image} style={styles.image} />

          <View style={styles.topIcons}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={26} />
            </TouchableOpacity>
            <Feather name="share-2" size={22} />
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{product.name}</Text>
            <Ionicons name="heart-outline" size={24} />
          </View>

          <Text style={styles.quantity}>{product.quantity}</Text>

          <View style={styles.rowBetween}>
            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => qty > 1 && setQty(qty - 1)}>
                <Text style={styles.qtyBtn}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{qty}</Text>

              <TouchableOpacity onPress={() => setQty(qty + 1)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.price}>₹ {product.price}</Text>
          </View>

          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Ionicons
              name={showDetails ? "chevron-up" : "chevron-down"}
              size={20}
            />
          </TouchableOpacity>

          {showDetails && (
            <Text style={styles.description}>
              {product.description ||
                "High quality product for daily use."}
            </Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
  style={styles.addBtn}
  onPress={() =>
    dispatch(addToCart({ ...product, qty }))
  }
>
  <Text style={styles.addText}>Add To Basket</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageWrapper: {
    height: 300,
    backgroundColor: "#F5F5F5",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
  },
  image: { width: "100%", height: 220, resizeMode: "contain" },
  topIcons: {
    position: "absolute",
    top: 20,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: { padding: 20, gap: 12 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "700" },
  quantity: { color: "gray" },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 14,
  },
  qtyBtn: { fontSize: 20, fontWeight: "bold" },
  qtyText: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 22, fontWeight: "700" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  description: { color: "gray", lineHeight: 22 },
  addBtn: {
    backgroundColor: "#53B175",
    padding: 18,
    margin: 20,
    borderRadius: 18,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
