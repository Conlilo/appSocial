import React from 'react';
import { useSelector } from 'react-redux';

import StackLogin from './login-stack';
import RootStack from './root-stack';

const AppStack = () => {
  const isLogin = useSelector(state => state.data.isLogin);
  // const token = useSelector(state => state.data.token);

  return <>{isLogin ? <RootStack /> : <StackLogin />}</>;
};

export default AppStack;
