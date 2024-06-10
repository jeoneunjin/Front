import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import Helper from './Helper';
import HFRecipeScreen from './HFRecipsScreen';
import RecipeListScreen from './RecipeListScreen';
import SearchHeader2 from '../components/SearchHeader2';
import HelperHeader from '../components/HelperHeader';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Helper"
        component={Helper}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{
          headerBackVisible: false,
          headerStyle: {backgroundColor: 'white'},
          headerTitle: () => <SearchHeader2 />,
        }}
      />
      <Stack.Screen
        name="HFRecipe"
        component={HFRecipeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 12,
    marginRight: 18,
  },
});
export default RootStack;
