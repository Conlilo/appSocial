import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import BtnLike from '../components/btnLike';
import CmtForm from '../components/cmtForm';
import ImagePost from '../components/imagePost';
import Line from '../components/line';
import PostForm from '../components/postForm';
import PostStatus from '../components/postStatus';
import { Icon } from '../core/icon';

const PostComment = () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const route = useRoute();
  const idPost = route?.params?.idPost;
  const active = route?.params?.active;
  const data = useSelector(state => state.data.store);
  const user = useSelector(state => state.data.dataUser);
  const dataPostDetail = data.filter(x => x.id === idPost);

  const [keyboardHeight, setKeyboardHeight] = useState(safeAreaInsets.bottom);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0 + safeAreaInsets.bottom);
    });
  }, []);
  return (
    <View style={styles.stylePost}>
      <FlatList
        data={dataPostDetail[0].commentDetail}
        renderItem={({ item }) => {
          return (
            <CmtForm
              idComment={item.idComment}
              idUserComment={item.idUserComment}
              titleComment={item.titleComment}
              timeComment={item.timeComment}
              repComment={item.repComment}
            />
          );
        }}
        ListHeaderComponent={
          <Fragment>
            <PostForm
              titlePost={dataPostDetail[0].titlePost}
              accountPost={
                user.filter(x => x.id === dataPostDetail[0].idUser)[0].name
              }
              timePost={dataPostDetail.timePost}
              avaPost={
                user.filter(x => x.id === dataPostDetail[0].idUser)[0].avatar
              }
              active={active}
              idPost={idPost}
            />
            {console.log(dataPostDetail[0].imagePost)}
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('PostDetail')}>
                <ImagePost images={dataPostDetail[0].imagePost} />
              </TouchableOpacity>
            </View>

            <PostStatus
              numCommentPost={dataPostDetail[0].numComment}
              numLikePost={dataPostDetail[0].numLike}
              active={active}
            />

            <Line />

            <View style={styles.interactiveBar}>
              <BtnLike idPost={idPost} active={active} />
              <TouchableOpacity style={styles.flexRow}>
                <Image source={Icon.Comment} style={styles.marginRight} />
                <Text style={styles.alignCenter}>Bình luận</Text>
              </TouchableOpacity>
            </View>

            <Line />
          </Fragment>
        }
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ marginBottom: 60 }}
      />
      <View style={[styles.createComment, { paddingBottom: keyboardHeight }]}>
        <TextInput style={styles.inputText} placeholder="Viết bình luận" />
        <TouchableOpacity>
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
  createComment: {
    flexDirection: 'row',
    justifyContent: 'center',
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
});