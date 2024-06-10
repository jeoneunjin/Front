import React from 'react';
import {Pressable, StyleSheet, View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function FloatingHelperBtn({recipe}) {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('HFRecipe', {recipe: recipe});
  };
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({pressed}) => [styles.button, {opacity: pressed ? 0.6 : 1}]}
        onPress={onPress}
        android_ripple={{color: 'white'}}
      >
        <Image
          source={require("../android/app/src/main/assets/images/helper_btn.png")}
          style={styles.image}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 58,
    height: 58,
    borderRadius: 28,
    // ios 전용 그림자
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // 안드로이드 전용 그림자
    elevation: 20,
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 28,
    backgroundColor: '#020c2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    alignSelf: 'center',
    width: 58,
    height: 58,
  }
});

export default FloatingHelperBtn;
