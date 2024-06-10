import React, {useEffect, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchContext from '../contexts/SearchContext';
function SearchHeader2() {
  const {width} = useWindowDimensions();
  const {keyword, onChangeText} = useContext(SearchContext);
  const navigation = useNavigation();
  const [newkey, setKey] = useState('');
  useEffect(() => {
    setKey(keyword);
  }, [keyword]);
  return (
    <View style={[styles.block, {width: width - 32}]}>
      <Pressable
        style={({pressed}) => [styles.back, pressed && {opacity: 0.5}]}
        onPress={() => navigation.pop()}>
        <Icon name="navigate-before" size={30} color="#020c2e" />
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="요리 또는 재료를 입력하세요"
        value={keyword}
        onChangeText={onChangeText}
        autoFocus
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={() => onChangeText('')}>
        <Icon name="cancel" size={25} color="#020c2e" />
      </Pressable>
      <Pressable
        style={({pressed}) => [styles.button2, pressed && {opacity: 0.5}]}
        onPress={() => {
          keyword.length !== 0 &&
            navigation.navigate('RecipeList', {key: newkey});
        }}>
        <Icon name="search" size={25} color="#020c2e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  input: {
    paddingLeft: 10,
    width: '55%',
    height: 44,
    color: '#020c2e',
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  back: {
    marginLeft: -3,
    marginRight: 15,
  },
  button: {
    position: 'absolute',
    right: 80,
  },
  button2: {
    position: 'absolute',
    right: 35,
  },
});

export default SearchHeader2;
