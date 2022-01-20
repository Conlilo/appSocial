import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackLogin from './login-stack';
import RootStack from './root-stack';
import { dataActions } from '../redux/slices/dataApi';

const AppStack = () => {
  // const isLogin = useSelector(state => state.data.isLogin);
  const token = useSelector(state => state?.data?.token);
  const dispatch = useDispatch();

  const getToken = async () => {
    if (token) return;
    const savedToken = await AsyncStorage.getItem('token');
    dispatch(dataActions.Token({ response: savedToken }));
  };

  useEffect(() => {
    getToken();
  }, []);

  return <>{token ? <RootStack /> : <StackLogin />}</>;
};

export default AppStack;
