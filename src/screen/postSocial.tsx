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
import { Icon } from '../core/icon';
import { dataActions } from '../redux/slices/dataApi';
import getCurrentPost from '../services/curentPost';
const PostSocial = ({
  titlePost,
  accountPost,
  timePost,
  avaPost,
  image,
  numCommentPost,
  numLikePost,
  idPost,
  idAccountPost,
  product,
}: {
  titlePost: string;
  accountPost: string;
  timePost: string;
  image: Array<string>;
  numCommentPost: number;
  numLikePost: number;
  avaPost: string;
  idPost: number;
  idAccountPost: number;
  product: Object;
}) => {
  const navigation = useNavigation();
  const active = useSelector(
    state => state.data.realStore.filter(x => x.id === idPost)[0].isLiked,
  );
  const userToken = useSelector(state => state.data.token);
  const dispatch = useDispatch();

  const _getCurrenPost = async () => {
    try {
      // const result = await getPost(offsetPost, limitPost);
      const result = await getCurrentPost(idPost);
      dispatch(dataActions.addCurrentPost({ currentPost: result?.data.data }));
    } catch (error) {
      dispatch(dataActions.Logout());
    }
  };

  useEffect(() => {
    _getCurrenPost();
  }, [userToken]);
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

      {image.filter(x => x).length ? (
        /* eslint-disable-next-line react-native/no-inline-styles*/
        <View style={{ flex: 1 }}>
          <ImagePost imagesPost={image} disable={false} />
        </View>
      ) : (
        <></>
      )}

      {/* Bắt đầu phần sản phẩm */}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ margin: 5 }}>
        {product !== Object ? (
          <>
            <ImagePost
              imagesPost={
                product.listImages
                  ? [product.image, ...product.listImages.split(',')].filter(
                      x => x,
                    )
                  : [product.image]
              }
            />

            <View style={styles.viewProduct}>
              <View style={styles.flexColumn}>
                <Text style={styles.captialize}>{product.name}</Text>
                <Text>
                  Giá bán:{' '}
                  <Text style={styles.color}>
                    {product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.postSale}>
                <Image source={Icon.Pencil} />
                <Text style={styles.colorPostSale}>Đăng bán</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bonusBorder}>
              <Text style={styles.bounus}>
                Hoa hồng: {product.level0} - {product.level5}%
              </Text>
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
      {/* Kết thúc phần sản phẩm */}
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
            navigation.navigate('PostComment', {
              idPost,
              active,
              avaPost,
              accountPost,
            })
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
    height: 20,
    width: 20,
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
    backgroundColor: 'white',
  },
  bounus: {
    color: 'white',
    margin: 5,
    fontSize: 12,
  },
  bonusBorder: {
    width: 130,
    borderRadius: 9,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  viewProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  color: { color: '#2b9c1a' },
  colorPostSale: { color: '#24FF00' },
  postSale: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderColor: '#24FF00',
  },
  captialize: { textTransform: 'capitalize' },
  colorGreen: { color: 'green' },
  flexColumn: { flexDirection: 'column' },
});
