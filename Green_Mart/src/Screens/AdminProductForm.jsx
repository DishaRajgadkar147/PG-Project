import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const BASE_URL = "http://192.168.1.104:4000/api";
const IMAGE_BASE_URL = "http://192.168.1.104:4000/productimages";

const AdminProductForm = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const product = route.params?.product;
  const isEdit = !!product;

  /* ================= STATE ================= */
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(
    product?.price ? product.price.toString() : ""
  );
  const [stock, setStock] = useState(
    product?.stock_quantity ? product.stock_quantity.toString() : ""
  );
  const [categoryId, setCategoryId] = useState(
    product?.category_id || null
  );
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD EXISTING IMAGE (EDIT MODE) ================= */
  useEffect(() => {
    if (isEdit && product?.image) {
      setImage(`${IMAGE_BASE_URL}/${product.image}`);
    }
  }, []);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category`);
      setCategories(res.data.data || []);
    } catch (err) {
      Alert.alert("Error", "Failed to load categories");
    }
  };

  /* ================= IMAGE PICKER ================= */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // file://...
    }
  };

  /* ================= ADD / EDIT ================= */
  const handleSave = async () => {
    if (!name || !price || !stock || !categoryId) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (!isEdit && !image) {
      Alert.alert("Error", "Image is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", name);
      formData.append("price", price);
      formData.append("stock_quantity", stock);
      formData.append("category_id", categoryId);

      // ✅ ONLY send image if user picked NEW image
      if (image && image.startsWith("file")) {
        formData.append("image", {
          uri: image,
          name: "product.jpg",
          type: "image/jpeg",
        });
      }

      if (isEdit) {
        await axios.put(
          `${BASE_URL}/product/update/${product.product_id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(`${BASE_URL}/product/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      Alert.alert(
        "Success",
        isEdit ? "Product updated successfully" : "Product added successfully"
      );

      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <GreenMartTitle size={24} />
        </View>

        <Text style={styles.title}>
          {isEdit ? "Edit Product" : "Add Product"}
        </Text>

        <View style={styles.card}>
          {/* IMAGE */}
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imageText}>
                {isEdit ? "Change Image" : "+ Upload Image"}
              </Text>
            )}
          </TouchableOpacity>

          {/* NAME */}
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter product name"
          />

          {/* CATEGORY */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryWrap}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.category_id}
                style={[
                  styles.categoryChip,
                  categoryId === cat.category_id &&
                    styles.categoryActive,
                ]}
                onPress={() => setCategoryId(cat.category_id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    categoryId === cat.category_id && { color: "#fff" },
                  ]}
                >
                  {cat.category_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* PRICE */}
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
          />

          {/* STOCK */}
          <Text style={styles.label}>Stock Quantity</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={stock}
            onChangeText={setStock}
            placeholder="Enter stock"
          />
        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveText}>
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Product"
              : "Add Product"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminProductForm;

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
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: myColors.third,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 14,
    color: myColors.third,
  },
  input: {
    backgroundColor: "#F1F3F5",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
  },
  imageBox: {
    height: 150,
    backgroundColor: "#F1F3F5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  imageText: {
    fontWeight: "700",
    color: myColors.third,
  },
  categoryWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#E9ECEF",
    marginRight: 10,
    marginBottom: 10,
  },
  categoryActive: {
    backgroundColor: myColors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "700",
  },
  saveBtn: {
    backgroundColor: myColors.primary,
    padding: 16,
    borderRadius: 18,
    marginTop: 24,
    marginBottom: 30,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },
});
