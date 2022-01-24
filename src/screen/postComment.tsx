import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BtnLike from '../components/btnLike';
import CmtForm from '../components/cmtForm';
import ImagePost from '../components/imagePost';
import Line from '../components/line';
import PostForm from '../components/postForm';
import PostStatus from '../components/postStatus';
import { fetchImageApi } from '../constants';
import { Icon } from '../core/icon';
import { dataActions } from '../redux/slices/dataApi';
import getCommentByFeedId from '../services/commentByFeedId';
import getCurrentPost from '../services/curentPost';
import getPost from '../services/post';

const PostComment = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const route = useRoute();
  const idPost = route?.params?.idPost;
  const accountPost = route?.params?.accountPost;
  const avaPost = route?.params?.avaPost;
  const idFocusRep = useSelector(state => state.data.idUserRep);
  const idParent = useSelector(state => state.data.idParent);
  const userToken = useSelector(state => state.data.token);
  const limit = useSelector(state => state.data.limit);
  const currentPost = useSelector(state => state.data.currentPost);
  const realStore = useSelector(state => state.data.realStore);
  const active = useSelector(
    state => state.data.realStore.filter(x => x.id === idPost)[0].isLiked,
  );
  const commentByIdFeed = useSelector(state => state.data.commentByIdFeed);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const [keyboardHeight, setKeyboardHeight] = useState(safeAreaInsets.bottom);

  const currentPostDetail = realStore.filter(x => x.id === idPost)[0];

  const _getPost = async () => {
    try {
      // const result = await getPost(offsetPost, limitPost);
      const result = await getPost(limit);
      dispatch(dataActions.addRealStore({ data: result?.data?.data }));
    } catch (error) {
      dispatch(dataActions.Logout());
    }
  };

  const _getCurrenPost = async () => {
    try {
      // const result = await getPost(offsetPost, limitPost);
      const result = await getCurrentPost(idPost);
      dispatch(dataActions.addCurrentPost({ currentPost: result?.data.data }));
    } catch (error) {
      dispatch(dataActions.Logout());
    }
  };

  const _getCommentByFeedId = async () => {
    try {
      const response = await getCommentByFeedId(idPost);
      const result = response?.data?.data?.map((_comment: { id: number }) => {
        const replies: any[] = response?.data?.data?.filter(
          (reply: { idParent: number }) => {
            return reply.idParent === _comment.id;
          },
        );
        return { ..._comment, replies };
      });
      dispatch(
        dataActions.addCommentByFeedId({
          commentByIdFeed: result,
        }),
      );
    } catch (error) {
      console.log(error);
      dispatch(dataActions.Logout());
    }
  };

  useEffect(() => {
    _getCurrenPost();
    _getPost();
    _getCommentByFeedId();
  }, [userToken]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0 + safeAreaInsets.bottom);
    });
  }, []);
  return (
    <View style={styles.stylePost}>
      <FlatList
        data={commentByIdFeed}
        renderItem={({ item }) => {
          return (
            <CmtForm
              idComment={item.id}
              name={item.user.name}
              avatar={fetchImageApi(item.user.avatar)}
              titleComment={item.content}
              timeComment={item.createdDate}
              repComment={item.replies}
              isParent={item.idParent}
            />
          );
        }}
        ListHeaderComponent={
          <Fragment>
            <PostForm
              titlePost={currentPost.content}
              accountPost={accountPost}
              timePost={moment(currentPost.createdDate)
                .subtract(7, 'hours')
                .fromNow()}
              avaPost={avaPost}
              active={active}
              idPost={idPost}
              idAccountPost={currentPost.userId}
            />
            <View>
              <TouchableOpacity>
                {currentPost.images !== null ||
                currentPost.images !== undefined ? (
                  /* eslint-disable-next-line react-native/no-inline-styles*/
                  <View style={{ flex: 1 }}>
                    <ImagePost
                      imagesPost={
                        currentPost.images !== ''
                          ? currentPost.images.split(',')
                          : Array(0)
                      }
                      disable={false}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {/* Bắt đầu phần sản phẩm */}
                {/* eslint-disable-next-line react-native/no-inline-styles */}
                <View style={{ margin: 5 }}>
                  {currentPostDetail.product ? (
                    <>
                      <ImagePost
                        imagesPost={
                          currentPostDetail.product.listImages
                            ? [currentPostDetail.product.image].concat(
                                currentPostDetail.product.listImages.split(','),
                              )
                            : [currentPostDetail.product.image]
                        }
                      />

                      <View style={styles.viewProduct}>
                        <View style={styles.flexColumn}>
                          <Text style={styles.captialize}>
                            {currentPostDetail.product.name}
                          </Text>
                          <Text>
                            Giá bán:{' '}
                            <Text style={styles.color}>
                              {currentPostDetail.product.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Text>
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.postSale}>
                          <Image source={Icon.Pencil} />
                          <Text style={styles.color}>Đăng bán</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.bonusBorder}>
                        <Text style={styles.bounus}>
                          Hoa hồng: {currentPostDetail.product.level0} -{' '}
                          {currentPostDetail.product.level5}%
                        </Text>
                      </View>
                    </>
                  ) : (
                    <></>
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <PostStatus
              active={active}
              numCommentPost={currentPost.comment}
              numLikePost={currentPost.like}
            />

            <Line />

            <View style={styles.interactiveBar}>
              <BtnLike active={active} idPost={idPost} />
              <TouchableOpacity style={styles.flexRow}>
                <Image source={Icon.Comment} style={styles.marginRight} />
                <Text style={styles.alignCenter}>Bình luận</Text>
              </TouchableOpacity>
            </View>

            <Line />
          </Fragment>
        }
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ marginBottom: 80 }}
      />
      <View
        style={[
          styles.createComment,
          Platform.OS === 'ios'
            ? { paddingBottom: keyboardHeight }
            : // eslint-disable-next-line react-native/no-inline-styles
              { bottom: 25 },
        ]}>
        {idFocusRep === '' ? (
          <View />
        ) : (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={[styles.flexRow, { paddingBottom: 40 }]}>
            {/* eslint-disable-next-line react-native/no-inline-styles*/}
            <Text style={{ color: '#868686' }}>
              Bạn đang trả lời {idFocusRep}
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(dataActions.defocusReplyUser())}>
              <Image
                source={Icon.Xicon}
                /* eslint-disable-next-line react-native/no-inline-styles*/
                style={{ width: 14, height: 17, tintColor: '#868686' }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={[
          styles.btnComment,
          Platform.OS === 'ios'
            ? { paddingBottom: keyboardHeight }
            : // eslint-disable-next-line react-native/no-inline-styles
              { bottom: 25 },
        ]}>
        <TextInput
          style={styles.inputText}
          placeholder="Viết bình luận"
          onChangeText={text => setComment(text)}
          value={comment}
        />
        <TouchableOpacity
          onPress={async () => {
            // Comment
            if (idFocusRep === '') {
              if (comment !== '') {
                try {
                  await axios({
                    method: 'post',
                    // eslint-disable-next-line quotes
                    url: `https://devapi.cuccu.vn/cuccu.api/Comments`,
                    data: {
                      idFeed: idPost,
                      Content: comment,
                    },
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                    },
                  });
                  const result = await getPost(limit);
                  dispatch(
                    dataActions.addRealStore({ data: result?.data?.data }),
                  );
                  setComment('');
                  _getCommentByFeedId();
                } catch (e) {
                  console.log(e);
                }
              }
            } else {
              // Reply
              await axios({
                method: 'post',
                // eslint-disable-next-line quotes
                url: `https://devapi.cuccu.vn/cuccu.api/Comments`,
                data: {
                  idFeed: idPost,
                  Content: comment,
                  idParent: idParent,
                },
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              })
                .then(async function () {
                  //handle success
                  const result = await getPost(limit);
                  dispatch(
                    dataActions.addRealStore({ data: result?.data?.data }),
                  );
                  dispatch(dataActions.defocusReplyUser());
                })
                .catch(function (error) {
                  //handle error
                  console.log('error', error);
                });
              setComment('');
              _getCommentByFeedId();
            }
          }}>
          <Image source={Icon.Send} style={styles.iconSend} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostComment;

const styles = StyleSheet.create({
  keyboardStyle: {
    marginTop: 10,
  },
  btnComment: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  createComment: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  fontBold: { fontWeight: 'bold' },
  color9c9c9c: { color: '#9c9c9c', marginRight: 10 },
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
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  stylePost: {
    backgroundColor: 'white',
    height: '100%',
  },
  imgPost: {
    width: '100%',
    height: 300,
    borderColor: '#cecece',
    borderWidth: 1,
  },

  inputText: {
    backgroundColor: '#dedede',
    width: '85%',
    height: 30,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 15,
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  iconSend: { width: 30, height: 30 },
  avaPost123: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  commentBox: {
    padding: 5,
    borderRadius: 5,
    margin: 5,
    marginRight: '20%',
    backgroundColor: '#dedede',
  },
  ml40: { marginLeft: 40 },
  mv10: {
    marginVertical: 10,
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
  color: { color: '#24FF00' },
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
