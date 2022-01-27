import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImageApi } from '../constants';
import { AppImage } from '../core/image';
import { dataActions } from '../redux/slices/dataApi';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Icon } from '../core/icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import deleteComment from '../services/deleteComment';
import getComment from '../services/comment';
import { commentActions } from '../redux/slices/comment';

const CmtForm = ({
  idComment,
  name,
  avatar,
  titleComment,
  timeComment,
  repComment,
  isParent,
  userId,
  idPost,
}: {
  idComment: number;
  name: string;
  avatar: string;
  titleComment: string;
  timeComment: string;
  repComment: Array<Object>;
  isParent: number;
  userId: number;
  idPost: number;
}) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();
  const [comment, setComment] = useState(0);
  const userLogin = useSelector(state => state.data.accountLogin);
  const flagEditComment = useSelector(state => state.comment.flag);
  const curComment = useSelector(state => state.comment.comment);

  return (
    <>
      {isParent ? (
        <View />
      ) : (
        <View style={styles.mv10}>
          <View style={styles.flexRow}>
            <View style={styles.positionAb}>
              <Image source={AppImage.NoneAvatar} style={styles.avaPost123} />
            </View>
            <Image source={{ uri: avatar }} style={styles.avaPost123} />
            <View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={[
                    styles.commentBox,
                    flagEditComment && idComment === curComment.id
                      ? styles.activeCmt
                      : {},
                  ]}
                  onLongPress={() => {
                    setComment(idComment);
                    if (userLogin.userId === userId) {
                      setModal(!modal);
                    }
                  }}>
                  <Text style={styles.fontBold}>{name}</Text>
                  <Text>{titleComment}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.color9c9c9c}>
                  {moment(timeComment).subtract(7, 'hours').fromNow()}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      dataActions.focusReplyUser({
                        idUserComment: name,
                        idParent: idComment,
                      }),
                    );
                  }}>
                  <Text style={styles.color9c9c9c}>Trả lời</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* replied comment */}
          {repComment.length > 0 ? (
            <FlatList
              data={repComment}
              renderItem={item => {
                return (
                  <View style={styles.ml40}>
                    <TouchableOpacity
                      style={styles.flexRow}
                      onLongPress={() => {
                        setComment(item.item.id);
                        if (userLogin.userId === item.item.user.userId) {
                          setModal(!modal);
                        }
                      }}>
                      <View style={styles.positionAb}>
                        <Image
                          source={AppImage.NoneAvatar}
                          style={styles.avaPost123}
                        />
                      </View>
                      <Image
                        source={{
                          uri: fetchImageApi(item.item.user.avatar),
                        }}
                        style={styles.avaPost123}
                      />
                      <View>
                        <View style={styles.commentBox}>
                          <Text style={styles.fontBold}>
                            {item.item.user.name}
                          </Text>
                          <Text>{item.item.content}</Text>
                        </View>
                        <View style={styles.flexRow}>
                          <Text style={styles.color9c9c9c}>
                            {moment(item.item.createdDate)
                              .subtract(7, 'hours')
                              .fromNow()}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(
                                dataActions.focusReplyUser({
                                  idUserComment: item.item.user.name,
                                  idParent: idComment,
                                }),
                              );
                            }}>
                            <Text style={styles.color9c9c9c}>Trả lời</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : (
            <View />
          )}
          {/* end replied comment */}

          <View>
            <Modal
              isVisible={modal}
              style={styles.margin0}
              onBackdropPress={() => {
                setModal(!modal);
              }}
              onBackButtonPress={() => {
                setModal(!modal);
              }}>
              <View
                style={[
                  styles.postionBtn,
                  { paddingBottom: safeAreaInsets.bottom + 5 },
                ]}>
                <TouchableOpacity
                  onPress={async () => {
                    const result = await getComment(comment);
                    dispatch(
                      commentActions.currentComment({
                        curComment: result?.data.data,
                      }),
                    );
                    dispatch(commentActions.changeFlag());
                    setModal(!modal);
                  }}
                  style={[styles.flexRow, styles.btn]}>
                  <Image source={Icon.Edit} style={styles.iconModal} />
                  <Text style={styles.btnModal}>Sửa bài viết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModal(!modal);
                    Alert.alert(
                      'Thông báo',
                      'Bạn có chắc muốn xóa bài viết này',
                      [
                        {
                          text: 'Xóa',
                          style: 'destructive',
                          onPress: async () => {
                            dispatch(
                              dataActions.delCommentByFeedId({
                                idComment: comment,
                              }),
                            );
                            await deleteComment(comment);
                          },
                        },
                        {
                          text: 'Hủy',
                        },
                      ],
                    );
                  }}
                  style={[styles.flexRow, styles.btn]}>
                  <Image source={Icon.Delete} style={styles.iconModal} />
                  <Text style={styles.btnModal}>Xóa Bài Viết</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </>
  );
};

export default CmtForm;

const styles = StyleSheet.create({
  cancelEdit: { position: 'absolute', top: 5, right: 20 },
  activeCmt: { borderWidth: 1, borderColor: 'red' },
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
    marginVertical: 8,
    backgroundColor: 'white',
  },
  imgPost: {
    width: '100%',
    height: 300,
    borderColor: '#cecece',
    borderWidth: 1,
  },
  createComment: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
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
  positionAb: { position: 'absolute' },
  postStatus: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 20,
  },
  titlePost: { padding: 10, marginLeft: 10, color: 'black' },
  btnOption: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModal: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',
    marginVertical: 8,
  },
  iconModal: {
    marginHorizontal: 10,
    justifyContent: 'center',
    marginVertical: 8,
  },
  margin0: { margin: 0 },
  postionBtn: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  btn: {
    borderBottomWidth: 1,
    borderBottomColor: '#9c9c9c',
    marginHorizontal: 20,
  },
});
