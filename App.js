import React from 'react'
import {View, Text} from 'react-native'

//redux imports
import {Provider} from 'react-redux'
import Store from './src/redux/store.js'
import {persistor} from './src/redux/store.js'
import {PersistGate} from 'redux-persist/integration/react'

//page imports
import Login from './src/auth/login'
import Signup from './src/auth/signup'
import Preference from './src/pages/preferences.js'
import Splash from './src/pages/splash.js'

//navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App(){
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Splash">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Preference" component={Preference} />
            <Stack.Screen name="Splash" component={Splash}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}4