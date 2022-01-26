/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../core/icon';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dataActions } from '../redux/slices/dataApi';
import AttributedText from '@ahiho/react-native-attributed-text';
import { AppImage } from '../core/image';
import getCurrentUser from '../services/user';
import deletePost from '../services/deletePost';
import getPost from '../services/post';

const PostForm = ({
  titlePost,
  accountPost,
  timePost,
  avaPost,
  idPost,
  active,
  idAccountPost,
}: {
  titlePost: string;
  accountPost: string;
  timePost: string;
  avaPost: string;
  idPost: number;
  active: boolean;
  idAccountPost: number;
}) => {
  const userLogin = useSelector(state => state.data.accountLogin);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const userToken = useSelector(state => state.data.token);
  const dispatch = useDispatch();
  const limit = useSelector(state => state.data.limit);

  const _getCurrentUser = async () => {
    try {
      const result = await getCurrentUser();
      dispatch(dataActions.Login({ userDispatch: result.data.data }));
    } catch (error) {
      // error.message
      dispatch(dataActions.Logout());
    }
  };

  useEffect(() => {
    _getCurrentUser();
  }, [userToken]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          marginVertical: 8,
          backgroundColor: 'white',
        }}
        onPress={() => {
          navigation.navigate('PostComment', {
            idPost,
            active,
            avaPost,
            accountPost,
          });
        }}>
        <View style={styles.flexRow}>
          <View style={{ position: 'absolute' }}>
            <Image source={AppImage.NoneAvatar} style={styles.avaPost} />
          </View>
          <Image source={{ uri: avaPost }} style={styles.avaPost} />
          <View style={styles.marginTop}>
            <Text style={styles.fontBold}>{accountPost}</Text>
            <Text style={styles.color9c9c9c}>{timePost}</Text>
          </View>
        </View>
        {titlePost === '' || titlePost === null ? (
          <View />
        ) : (
          <AttributedText
            annotationProps={{
              link: {
                style: {
                  color: 'blue',
                  textDecorationLine: 'underline',
                },
                onPress: text => {
                  Linking.openURL(text);
                },
              },
            }}
            style={styles.titlePost}>
            {titlePost}
          </AttributedText>
        )}
      </TouchableOpacity>
      {idAccountPost === userLogin.userId ? (
        <TouchableOpacity
          style={styles.btnOption}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Image source={Icon.Option} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btnOption} />
      )}
      <View>
        <Modal
          isVisible={modalVisible}
          style={{ margin: 0 }}
          onBackdropPress={() => {
            setModalVisible(!modalVisible);
          }}
          onBackButtonPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: safeAreaInsets.bottom + 5,
              justifyContent: 'center',
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('CreatePost', idPost);
              }}
              style={[
                styles.flexRow,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: '#9c9c9c',
                  marginHorizontal: 20,
                },
              ]}>
              <Image source={Icon.Edit} style={styles.iconModal} />
              <Text style={styles.btnModal}>Sửa bài viết</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                Alert.alert('Thông báo', 'Bạn có chắc muốn xóa bài viết này', [
                  {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: async () => {
                      dispatch(dataActions.delPost({ idPost }));
                      await deletePost(idPost);
                      const result = await getPost(limit);
                      dispatch(
                        dataActions.addRealStore({ data: result?.data?.data }),
                      );
                    },
                  },
                  {
                    text: 'Hủy',
                  },
                ]);
              }}
              style={[
                styles.flexRow,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: '#9c9c9c',
                  marginHorizontal: 20,
                },
                { borderBottomWidth: 1, borderBottomColor: '#9c9c9c' },
              ]}>
              <Image source={Icon.Delete} style={styles.iconModal} />
              <Text style={styles.btnModal}>Xóa Bài Viết</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  fontBold: { fontWeight: 'bold' },
  marginTop: { marginTop: 10 },
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
});
