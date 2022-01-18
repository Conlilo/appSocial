//import { useNavigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BtnLike from '../components/btnLike';
import ImagePost from '../components/imagePost';
import Line from '../components/line';
import PostForm from '../components/postForm';
import PostStatus from '../components/postStatus';
import Space from '../components/space';
import { fetchImageApi } from '../constants';
import { Icon } from '../core/icon';
import { dataActions } from '../redux/slices/dataApi';
import getPost from '../services/post';
import getCurrentUser from '../services/user';

const PostSocial = ({
  titlePost,
  accountPost,
  timePost,
  avaPost,
  image,
  numCommentPost,
  numLikePost,
  active,
  idPost,
  idAccountPost,
}: {
  titlePost: string;
  accountPost: string;
  timePost: string;
  image: Array<string>;
  numCommentPost: number;
  numLikePost: number;
  avaPost: string;
  active: boolean;
  idPost: number;
  idAccountPost: number;
}) => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const userToken = useSelector(state => state.data.token);
  // const realData = useSelector(state => state.data.realStore);

  // const _getCurrentUser = async () => {
  //   try {
  //     const result = await getCurrentUser();
  //     dispatch(dataActions.Avatar({ result: result.data.data.avatar }));
  //   } catch (error) {
  //     // error.message
  //     dispatch(dataActions.Logout());
  //   }
  // };

  // const _getPost = async () => {
  //   try {
  //     const result = await getPost();
  //     dispatch(dataActions.addRealStore({ data: result?.data.data }));
  //   } catch (error) {
  //     dispatch(dataActions.Logout());
  //   }
  // };

  // useEffect(() => {
  //   _getCurrentUser();
  //   _getPost();
  // }, [userToken]);

  return (
    <View style={styles.stylePost}>
      <PostForm
        titlePost={titlePost}
        accountPost={accountPost}
        timePost={timePost}
        avaPost={avaPost}
        idPost={idPost}
        active={active}
        idAccountPost={idAccountPost}
      />
      {/* eslint-disable-next-line react-native/no-inline-styles*/}
      <View style={{ flex: 1 }}>
        <ImagePost imagesPost={image} disable={false} />
      </View>
      <PostStatus
        active={active}
        numCommentPost={numCommentPost}
        numLikePost={numLikePost}
      />
      <Line />
      <View style={styles.interactiveBar}>
        <BtnLike active={active} idPost={idPost} />

        <TouchableOpacity
          style={styles.flexRow}
          onPress={() =>
            navigation.navigate('PostComment', { idPost, active })
          }>
          <Image source={Icon.Comment} style={styles.marginRight} />
          <Text style={styles.alignCenter}>Bình luận</Text>
        </TouchableOpacity>
      </View>
      <Space />
    </View>
  );
};

export default PostSocial;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: 5,
  },
  alignCenter: { alignSelf: 'center', color: 'black' },
  avaPost: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  interactiveBar: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  stylePost: {
    marginVertical: 8,
    backgroundColor: 'white',
  },
});
