import React from 'react'
import {View, Text} from 'react-native'
import Toast from 'react-native-toast-message';

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
import BottomNavParent from './src/pages/bottom_nav_parent.js'
import PreOTP from './src/pages/pre_otp.js'
import OTP from './src/pages/otp.js'
import ForgotPassword from './src/pages/forgot_password.js';

import Test from './src/pages/test.js'

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
            <Stack.Screen name="Test" component={Test}/>
            <Stack.Screen name="PreOTP" component={PreOTP}/>
            <Stack.Screen name="OTP" component={OTP}/>
            <Stack.Screen name="BottomNavParent" component={BottomNavParent}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
      <Toast/>
    </Provider>
  );
}4