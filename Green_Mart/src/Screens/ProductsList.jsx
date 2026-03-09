import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { productsList } from "../Utils/Data";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

const ProductsList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const category = route.params?.category;
  const title = route.params?.title || "All Products";
  const sectionList = route.params?.list;

  let data = productsList;

  if (sectionList) {
    data = sectionList;
  } else if (category) {
    data = productsList.filter(
      (item) => item.category === category
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            {/* IMAGE + INFO CLICK → DETAILS */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", { product: item })
              }
            >
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.qty}>{item.quantity}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
            </TouchableOpacity>

            {/* ADD BUTTON */}
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => dispatch(addToCart(item))}
            >
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
};

export default ProductsList;

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
    justifyContent: "space-between", // ✅ keeps Add at bottom
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
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
    marginTop: 10,
  },
  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
