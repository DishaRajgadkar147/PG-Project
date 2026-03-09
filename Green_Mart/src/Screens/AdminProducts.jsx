import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";

import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const BASE_URL = "http://192.168.1.104:4000/api";

const AdminProducts = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetchProducts();
  }, [isFocused]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/product`);
      setProducts(res.data.data || []);
    } catch (err) {
      Alert.alert("Error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const handleDelete = (product_id) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(
                `${BASE_URL}/product/delete/${product_id}`
              );
              fetchProducts(); // refresh list
            } catch (err) {
              Alert.alert("Error", "Failed to delete product");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <GreenMartTitle size={26} />
        </View>

        <Text style={styles.pageTitle}>Products</Text>
        <Text style={styles.pageSub}>Manage your product inventory</Text>

        {/* ADD PRODUCT */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AdminProductForm")}
        >
          <Text style={styles.addText}>+ Add New Product</Text>
        </TouchableOpacity>

        {/* LOADER */}
        {loading && (
          <ActivityIndicator size="large" color={myColors.primary} />
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <Text style={{ textAlign: "center", color: "gray" }}>
            No products found
          </Text>
        )}

        {/* PRODUCT LIST */}
        {products.map((item) => (
          <View key={item.product_id} style={styles.card}>
            <Text style={styles.productName}>{item.name}</Text>

            <Text style={styles.price}>₹ {item.price}</Text>

            <Text
              style={[
                styles.stock,
                item.stock_quantity < 10 && styles.lowStock,
              ]}
            >
              Stock: {item.stock_quantity} units
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() =>
                  navigation.navigate("AdminProductForm", {
                    product: item,
                  })
                }
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item.product_id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminProducts;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  back: {
    fontSize: 22,
    marginRight: 10,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: myColors.third,
  },

  pageSub: {
    fontSize: 13,
    color: "gray",
    marginBottom: 16,
  },

  addBtn: {
    backgroundColor: myColors.primary,
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
  },

  addText: {
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    fontSize: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  productName: {
    fontSize: 16,
    fontWeight: "800",
    color: myColors.third,
  },

  price: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: myColors.primary,
  },

  stock: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
  },

  lowStock: {
    color: "#E63946",
  },

  actions: {
    flexDirection: "row",
    marginTop: 14,
  },

  editBtn: {
    backgroundColor: "#EEF3FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 10,
  },

  editText: {
    color: myColors.primary,
    fontWeight: "700",
  },

  deleteBtn: {
    backgroundColor: "#FFECEC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  deleteText: {
    color: "#E63946",
    fontWeight: "700",
  },
});
