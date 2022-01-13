//import { useNavigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BtnLike from '../components/btnLike';
import ImagePost from '../components/imagePost';
import Line from '../components/line';
import PostForm from '../components/postForm';
import PostStatus from '../components/postStatus';
import Space from '../components/space';
import { Icon } from '../core/icon';

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
      <View style={{ flex: 1, marginLeft: 5 }}>
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
