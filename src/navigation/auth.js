import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Signin from '../screen/Signin';
import Register from '../screen/Register';
import Verifikasi from '../screen/Verifikasi';

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verifikasi"
        component={Verifikasi}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
