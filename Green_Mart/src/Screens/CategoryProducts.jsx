import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../Redux/cartSlice";

const BASE_URL = "http://192.168.1.104:4000/api";
const IMAGE_URL = "http://192.168.1.104:4000/productimages";

export default function CategoryProducts() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { categoryId, title } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/product/category/${categoryId}`
      );

      // SAFETY: always array
      setProducts(res.data?.data || []);
    } catch (err) {
      console.log("Error fetching products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const price = item.price ?? 0;
    const imageUri = item.image
      ? `${IMAGE_URL}/${item.image}`
      : "https://via.placeholder.com/150";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Details", { product: item })}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />

        <Text style={styles.name}>
          {item.name || "Unnamed Product"}
        </Text>

        <Text style={styles.qty}>
          Stock: {item.stock_quantity ?? 0}
        </Text>

        <Text style={styles.price}>₹ {price}</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => dispatch(addToCart(item))}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#53B175" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item, index) =>
          (item.product_id || item.id || index).toString()
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No products found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
  },

  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },

  name: {
    fontWeight: "600",
    marginTop: 6,
  },

  qty: {
    fontSize: 12,
    color: "gray",
  },

  price: {
    fontWeight: "700",
    marginTop: 4,
  },

  addBtn: {
    backgroundColor: "#53B175",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },

  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "gray",
  },
});
