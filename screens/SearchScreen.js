import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import SearchContext from '../contexts/SearchContext';

function SearchScreen({navigation}) {
  const {keyword} = useContext(SearchContext);
  return (
    <View style={styles.block}>
      <View style={styles.block2}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    flex: 1,
    padding: 30,
  },
});

export default SearchScreen;
