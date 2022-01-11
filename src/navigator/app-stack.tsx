import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../redux/slices/dataApi';
import CreatePost from '../screen/createPost';
import Home from '../screen/home';
import PostComment from '../screen/postComment';
import PostDetail from '../screen/postDetail';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  const dispacth = useDispatch();
  dispacth(dataActions.publicStore());
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Trang chủ', headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{ title: 'Ảnh bài viết của Chiến' }}
      />
      <Stack.Screen
        name="PostComment"
        component={PostComment}
        options={{ title: 'Bài viết của Chiến' }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ title: 'Tạo bài viêt' }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
