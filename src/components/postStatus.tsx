/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
import { Icon } from '../core/icon';

const PostStatus = ({
  numCommentPost,
  numLikePost,
  active,
}: {
  numCommentPost: number;
  numLikePost: number;
  active: boolean;
}) => {
  // const activeBtn = useSelector(state => state.activelikebutton.active);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
      }}>
      <View style={styles.postStatus}>
        <Image source={Icon.Hearts} style={styles.marginRight} />
        <Text style={styles.color9c9c9c}>
          {numLikePost > 0
            ? active
              ? `Bạn và ${numLikePost - 1} người khác`
              : `${numLikePost} người khác`
            : active
            ? 'Bạn'
            : ''}
        </Text>
      </View>
      <View style={styles.postStatus}>
        <Image source={Icon.Comments} style={styles.marginRight} />
        <Text style={styles.color9c9c9c}>{numCommentPost} bình luận</Text>
      </View>
    </View>
  );
};

export default PostStatus;

const styles = StyleSheet.create({
  fontBold: { fontWeight: 'bold' },
  color9c9c9c: { color: '#9c9c9c' },
  flexRow: {
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: 5,
  },
  avaPost: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  postStatus: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 20,
  },
  titlePost: { padding: 10, marginLeft: 10, color: 'black' },
});
