import React from "react";
import {View, Text} from "react-native"

import Home from "./home"
import Favourites from './fav'
import Settings from './settings'
import Preference from "./preferences";
import Recipe from "./recipe";
import Login from './../auth/login'
import RequestRecipe from './request'


import { BottomNavigation} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const TabBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'home', title: 'Home' , icon:'home-roof' ,color:'#fff'},
      { key: 'favourites', title: 'Favourites', icon:'heart-outline' , color:'#fff'},
      { key: 'settings', title: 'Settings', icon:'nut' , color:'#fff'},
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      home: Home,
      settings: Settings,
      favourites: Favourites
    });
  
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        shifting={true}
        sceneAnimationEnabled={true}
        activeColor="#4d4b50"
        inactiveColor="#aeaeae"
      />
    );
  };

  const Stack = createStackNavigator();

  export default function BottomNavParent(){
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="tabbar" screenOptions={{headerShown:false}}>
          <Stack.Screen name = "tabbar" component={TabBar} />
          <Stack.Screen name="Recipe" component={Recipe}/>
          <Stack.Screen name="Preference" component={Preference}/>
          <Stack.Screen name="Request" component={RequestRecipe}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }