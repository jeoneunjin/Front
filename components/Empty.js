import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Empty() {
  return (
    <View>
      <Text>검색 결과가 없어요! 다른 검색어로 검색해주세요.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
});

export default Empty;
