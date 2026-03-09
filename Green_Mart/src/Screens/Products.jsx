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

const categories = [
  { id: 1, name: "Grocery & Staples", image: require("../assets/category/1.png") },
  { id: 2, name: "Health & Wellness", image: require("../assets/category/2.png") },
  { id: 3, name: "Fruits & Vegetables", image: require("../assets/category/3.png") },
  { id: 4, name: "Snacks", image: require("../assets/category/4.png") },
  { id: 5, name: "Personal Care", image: require("../assets/category/5.png") },
  { id: 6, name: "Baby Care", image: require("../assets/category/6.png") },
  { id: 7, name: "Food Grains", image: require("../assets/category/7.png") },
  { id: 8, name: "Home Care", image: require("../assets/category/8.png") },
];

const Categories = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>

      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CategoryProducts", {
                categoryId: item.id,   // ✅ backend compatible
                title: item.name,
              })
            }
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16,
  },

  card: {
    flex: 1,
    margin: 10,
    paddingVertical: 20,
    borderRadius: 16,
    backgroundColor: "#F7F8FA",
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },

  name: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
});
