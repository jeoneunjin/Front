import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ImageSlider} from 'react-native-image-slider-banner';

function BannerBox() {
  const navigation = useNavigation();
  const gotorecscreen = () => navigation.push('RecScreen');
  return (
    <ImageSlider
      data={[
        {img: require('../android/app/src/main/assets/images/banner1.jpg')},
        {img: require('../android/app/src/main/assets/images/banner1.jpg')},
        {img: require('../android/app/src/main/assets/images/banner1.jpg')},
      ]}
      localImg
      showHeader={false}
      preview={false}
      activeIndicatorStyle={{backgroundColor: '#ce8040'}}
      inActiveIndicatorStyle={{backgroundColor: 'lightgray'}}
      caroseImageStyle={{resizeMode: 'center'}}
      onClick={(item, index) => {
        index == 1 ? {gotorecscreen} : null;
      }}></ImageSlider>
  );
}

const styles = StyleSheet.create({
  block: {},
});

export default BannerBox;
