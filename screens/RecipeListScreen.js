import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import RecipeList from '../components/RecipeList';
import Empty from '../components/Empty';

function RecipeListScreen({route}) {
  const [recipes, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const keyword = route.params.key;
  const server_addr =
    'http://port-0-cookpal-server-rccln2llvzrcxr2.sel5.cloudtype.app/';
  //서버에게 검색어 전달
  const search_recipe = async key => {
    //key = 검색어
    try {
      const response = await fetch(server_addr + 'search_list', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe_name: key,
        }),
      });
      const json = await response.json();
      //서버에서 json 파일을 가져온다.
      setList(json);
      setLoading(false);
    } catch (error) {
      console.error('FetchError:', error);
    }
  };
  useEffect(() => {
    search_recipe(keyword);
  }, [keyword]);

  return (
    <View style={styles.block}>
      <View style={styles.top}>
        {!isLoading ? (
          <View>
            <Text style={styles.topCon}>총 {recipes.length}개의 검색결과</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.contents}>
        {isLoading ? (
          <Text style={styles.loading}>로딩 중...</Text>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    flex: 1,
    padding: 15,
  },
  top: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  topCon: {
    fontFamily: 'Orbit-Regular',
    color: '#020c2e',
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    alignSelf: 'center',
  },
});

export default RecipeListScreen;
