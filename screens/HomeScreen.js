import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import BannerBox from '../components/BannerBox';
import CategoryBox from '../components/CategoryBox';

function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.block}>
        <BannerBox />
        <CategoryBox />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
