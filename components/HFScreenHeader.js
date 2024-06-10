import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

function HFScreenHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => [styles.back, pressed && {opacity: 0.5}]}
        onPress={() => navigation.pop()}>
        <Icon name="navigate-before" size={35} color="#020c2e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    margin: 10,
    marginTop: 10,
  },
});

export default HFScreenHeader;
