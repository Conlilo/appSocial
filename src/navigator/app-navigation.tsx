import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppStack from './app-stack';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
