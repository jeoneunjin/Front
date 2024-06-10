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
function SearchHeader() {
  const {width} = useWindowDimensions();
  const {keyword, onChangeText} = useContext(SearchContext);
  const navigation = useNavigation();
  const [newkey, setKey] = useState('');
  useEffect(() => {
    setKey(keyword);
  }, [keyword]);
  return (
    <View style={[styles.block, {width: width - 32}]}>
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
        <Icon name="cancel" size={25} color="#ce8040" />
      </Pressable>
      <Pressable
        style={({pressed}) => [styles.button2, pressed && {opacity: 0.5}]}
        onPress={() => {
          keyword.length !== 0 &&
            navigation.navigate('RecipeList', {key: newkey});
        }}>
        <Icon name="search" size={25} color="#ce8040" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  button: {
    marginLeft: 12,
    marginRight: 25,
  },
  button2: {
    marginRight: 10,
  },
});

export default SearchHeader;
