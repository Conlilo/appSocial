import React from 'react';
import { useSelector } from 'react-redux';

import StackLogin from './login-stack';
import RootStack from './root-stack';

const AppStack = () => {
  const isLogin = useSelector(state => state.data.isLogin);

  return <>{isLogin ? <RootStack /> : <StackLogin />}</>;
};

export default AppStack;
