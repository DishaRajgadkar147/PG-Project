import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import HomeIcon from "../Components/HomeIcon";
import HomeSearch from "../Components/HomeSearch";
import HomeBanner from "../Components/HomeBanner";
import ProductsTitle from "../Components/ProductsTitle";
import ProductsCarousel from "../Components/ProductsCarousel";

import { productsList } from "../Utils/Data";

const Home = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  // Clear search when coming back to Home
  useFocusEffect(
    useCallback(() => {
      setSearch("");
    }, [])
  );

  const exclusiveOffer = productsList.slice(0, 4);
  const bestSelling = productsList.slice(4, 8);
  const newArrivals = productsList.slice(8, 12);
  const trending = productsList.slice(2, 6);

  const filteredProducts = productsList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <HomeIcon />

          {/* 🔍 SEARCH */}
          <HomeSearch value={search} onChange={setSearch} />

          {/* 🔍 SEARCH RESULTS */}
          {search.length >= 2 && (
            <>
              {filteredProducts.length === 0 ? (
                <Text style={styles.noResult}>No product found</Text>
              ) : (
                <FlatList
                  data={filteredProducts}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.searchItem}
                      onPress={() =>
                        navigation.navigate("Details", { product: item })
                      }
                    >
                      <Image
                        source={item.image}
                        style={styles.searchImage}
                      />

                      <View style={{ flex: 1 }}>
                        <Text style={styles.searchName}>
                          {item.name}
                        </Text>
                        <Text style={styles.searchQty}>
                          {item.quantity}
                        </Text>
                      </View>

                      <Text style={styles.searchPrice}>
                        ₹ {item.price}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </>
          )}

          {/* 🏠 NORMAL HOME CONTENT */}
          {search.length < 2 && (
            <>
              <HomeBanner />

              <ProductsTitle title="Exclusive Offer" data={exclusiveOffer} />
              <ProductsCarousel data={exclusiveOffer} />

              <ProductsTitle title="Best Selling" data={bestSelling} />
              <ProductsCarousel data={bestSelling} />

              <ProductsTitle title="New Arrivals" data={newArrivals} />
              <ProductsCarousel data={newArrivals} />

              <ProductsTitle title="Trending" data={trending} />
              <ProductsCarousel data={trending} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    gap: 20,
  },

  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 10,
  },
  searchImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  searchName: {
    fontSize: 14,
    fontWeight: "600",
  },
  searchQty: {
    fontSize: 12,
    color: "gray",
  },
  searchPrice: {
    fontSize: 14,
    fontWeight: "700",
  },
  noResult: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "gray",
  },
});
