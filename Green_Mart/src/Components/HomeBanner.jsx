import React from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  require('../assets/banner/c1.png'),
  require('../assets/banner/c2.png'),
  require('../assets/banner/c3.png'),
  require('../assets/banner/c4.png'),
];

const HomeBanner = () => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {banners.map((item, index) => (
        <View key={index} style={styles.bannerBox}>
          <Image source={item} style={styles.bannerImage} />
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  bannerBox: {
    width: width - 40,
    height: 160,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
