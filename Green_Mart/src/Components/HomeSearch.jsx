import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const HomeSearch = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="grey" />
      <TextInput
        placeholder="Search Store"
        style={styles.input}
        value={value}
        onChangeText={onChange}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
});
