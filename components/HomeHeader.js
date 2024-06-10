import React, {useRef} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';

function HomeHeader() {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.block, {left: width / 3.78}]}>
      <Text style={styles.logo}>COOkPAL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    position: 'relative',
    top: '40%',
    alignItems: 'center',
    backgroundColor: '#020c2e',
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  logo: {
    fontSize: 30,
    color: '#fbf9ef',
    fontFamily: 'Shrikhand-Regular',
  },
});

export default HomeHeader;
