import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import RecScreen from './RecScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import SearchHeader from '../components/SearchHeader';
import HomeHeader from '../components/HomeHeader';
import FoodListScreen from './RecipeListScreen';

const Tab = createBottomTabNavigator();

function MainTab({navigation}) {
  return (
    <>
      <StatusBar backgroundColor="#020c2e" barStyle="light-content" />
      <Tab.Navigator
        initialRouteName="홈"
        screenOptions={{
          tabBarActiveTintColor: '#d2713f',
          tabBarInactiveTintColor: '#b5b5b5',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 70,
          },
          tabBarLabelStyle: {
            fontFamily: 'DoHyeon-Regular',
            fontSize: 15,
          },
          tabBarItemStyle: {
            justifyContent: 'center',
          },
        }}>
        <Tab.Screen
          name="오늘의메뉴"
          component={RecScreen}
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <View>
                <Icon name="assistant" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="홈"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#020c2e',
            },
            headerTitle: () => <HomeHeader />,
          }}
        />
        <Tab.Screen
          name="검색"
          component={SearchScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="search" size={size} color={color} />
            ),
            headerTitle: () => <SearchHeader />,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  block: {},
});
export default MainTab;
