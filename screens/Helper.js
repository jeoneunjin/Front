import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import HelperHeader from '../components/HelperHeader';
import FloatingHelperBtn from '../components/FloatingHelperBtn';
import RecipeContext from '../contexts/RecipeContext';
import requestCameraAndMicrophonePermissions from './HandFree/permission'


function Helper({route}) {
  const {recipe_link} = route.params.recipe_link;
  const ImageSrc = route.params.thumbnail;
  const {title} = route.params.title;
  const server_addr =
    'http://port-0-cookpal-server-rccln2llvzrcxr2.sel5.cloudtype.app/';
  //레시피 링크 전달
  //const [recipe, onChangeRecipe] = useContext(RecipeContext);
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const get_recipe = async recipe_link => {
    try {
      const response = await fetch(server_addr + 'recipe', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({recipe_url: recipe_link}),
      });
      //레시피를 받아온다.(레시피를 출력하는 것으로만 구현. 네비게이션 쪽 구현 되면 이 부분도 이런 식으로 구현 할 예정)
      const json = await response.json();
      setRecipe(json);
      setLoading(false);
    } catch (error) {
      console.error('Recipe_link_Error :', error);
    }
  };
  useEffect(() => {
    requestCameraAndMicrophonePermissions();
    get_recipe(recipe_link);
  },[]);
  return (
    <View style={styles.block}>
      <View style={styles.blocktop}>
        <HelperHeader />
        <Image style={styles.imageStyle} source={{uri: ImageSrc}} />
      </View>
      <View style={styles.blockbottom}>
        <Text style={styles.name}>{title}</Text>
        {!isLoading ? (
        <ScrollView>
          <Text style={styles.title}>재료</Text>
          {recipe.ingredients.map((item, index) => (
            <Text key = {index} style={styles.con}>{item}</Text>
          ))}
          <Text/>
          <Text style={styles.title}>레시피</Text>
          {recipe.recipe_text.map((item, index) => (
            <Text key = {index} style={styles.con}>{index+1}. {item}</Text>
          ))}
          <Text></Text>
          <Text></Text>
        </ScrollView> ) : <Text>로딩 중...</Text>
        }
      </View>
      {!isLoading ? <FloatingHelperBtn recipe={recipe}/> : null }
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  blocktop: {
    flex: 1,
    backgroundColor: 'white',
  },
  blockbottom: {
    flex: 1,
    backgroundColor: 'white',
    margin: 15,
  },
  title: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'BlackHanSans-Regular',
    marginBottom: 10,
    marginTop: 10,
  },
  name: {
    fontSize: 23,
    fontFamily: 'BlackHanSans-Regualr',
    fontWeight: 'bold',
    color: 'black',
    borderBottomColor: '#e0e0e0',
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  imageStyle: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  ing: {
    flex: 1,
  },
  con: {
    fontFamily: 'Orbit-Regular',
    fontSize: 16,
  },
});

export default Helper;
