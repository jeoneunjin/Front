import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

function HelperHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={() => navigation.pop()}>
        <Icon name="navigate-before" size={35} color="#fbf9ef" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 12,
  },
});

export default HelperHeader;
