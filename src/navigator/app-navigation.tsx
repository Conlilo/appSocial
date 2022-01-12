import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useDispatch } from 'react-redux';
import AppStack from './app-stack';
import { dataActions } from '../redux/slices/dataApi';

const AppNavigation = () => {
  const dispacth = useDispatch();
  dispacth(dataActions.publicStore());
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
