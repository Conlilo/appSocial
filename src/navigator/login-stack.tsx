import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screen/login';

const Stack = createNativeStackNavigator();
const StackLogin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackLogin;
