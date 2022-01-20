import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Space from '../components/space';
import { fetchImageApi } from '../constants';
import { Icon } from '../core/icon';
import { dataActions } from '../redux/slices/dataApi';
import getPost from '../services/post';
import getProduct from '../services/product';
import getCurrentUser from '../services/user';
import PostSocial from './postSocial';

const Home = () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.data.token);
  const realData = useSelector(state => state.data.realStore);
  const avatar = useSelector(state => state.data.avatar);
  const limit = useSelector(state => state.data.limit);

  const _getCurrentUser = async () => {
    try {
      const result = await getCurrentUser();
      dispatch(dataActions.Avatar({ result: result.data.data.avatar }));
    } catch (error) {
      // error.message
      dispatch(dataActions.Logout());
    }
  };

  const _getPost = async () => {
    try {
      // const result = await getPost(offsetPost, limitPost);
      const result = await getPost(limit);
      dispatch(dataActions.addRealStore({ data: result?.data?.data }));
    } catch (error) {
      dispatch(dataActions.Logout());
    }
  };

  const _getProduct = async () => {
    try {
      const result = await getProduct();
      dispatch(dataActions.addProduct({ product: result?.data.data }));
    } catch (error) {
      dispatch(dataActions.Logout());
    }
  };

  useEffect(() => {
    _getPost();
  }, [limit]);

  useEffect(() => {
    _getCurrentUser();
    _getPost();
    _getProduct();
  }, [userToken]);

  return (
    <View style={[styles.backgroundColor, { paddingTop: safeAreaInsets.top }]}>
      {/* Bài viết */}
      <FlatList
        data={realData}
        refreshing={false}
        onRefresh={() => {
          dispatch(dataActions.defaultLimit());
        }}
        renderItem={({ item }) => {
          return (
            <PostSocial
              idAccountPost={item.userId}
              titlePost={item.content}
              accountPost={item.user.name}
              timePost={item.createDate}
              avaPost={fetchImageApi(item.user.avatar)}
              image={[...(item?.images?.split(',') || [])]}
              numCommentPost={item.comment}
              numLikePost={item.like}
              idPost={item.id}
              product={item.product ? item.product : Object}
            />
          );
        }}
        onEndReached={() => {
          dispatch(dataActions.loadMore());
        }}
        ListHeaderComponent={
          <Fragment>
            <View style={styles.c147}>
              <Image
                source={{ uri: fetchImageApi(avatar) }}
                style={styles.avaUser}
              />
              <TouchableOpacity
                style={styles.btnUpPost}
                onPress={() => navigation.navigate('CreatePost')}>
                <Text style={styles.color9c9c9c}>Bạn đang nghĩ gì?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnLogout}
                onPress={() => {
                  dispatch(dataActions.Logout());
                }}>
                {/*eslint-disable-next-line react-native/no-inline-styles */}
                <Text style={{ color: 'white' }}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.c147}>
              <TouchableOpacity
                style={styles.optionBar}
                onPress={() =>
                  navigation.navigate('CreatePost', { upImage: true })
                }>
                <Image source={Icon.Image} style={styles.iconUpPost} />
                <Text>Ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionBar}
                onPress={() => navigation.navigate('CreatePost')}>
                <Image style={styles.iconUpPost} source={Icon.Video} />
                <Text>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionBar}
                onPress={() => navigation.navigate('CreatePost')}>
                <Image source={Icon.Product} style={styles.iconUpPost} />
                <Text>Sản phẩm</Text>
              </TouchableOpacity>
            </View>
            <Space />
          </Fragment>
        }
      />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  iconUpPost: { height: 24, width: 24, borderRadius: 5 },
  color9c9c9c: { color: '#9c9c9c' },
  optionBar: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  btnUpPost: {
    backgroundColor: '#f3f3f3',
    width: 220,
    height: 30,
    margin: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  avaUser: {
    width: 30,
    height: 30,
    margin: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  backgroundColor: { backgroundColor: '#fff' },
  c147: { flexDirection: 'row', backgroundColor: 'white' },
  btnLogout: {
    borderRadius: 10,
    backgroundColor: 'red',
    height: 30,
    justifyContent: 'center',
    width: 80,
    marginVertical: 20,
    alignItems: 'center',
  },
});
