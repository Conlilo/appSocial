import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ImagePost from '../components/imagePost';
import { Icon } from '../core/icon';
import { dataActions } from '../redux/slices/dataApi';

const CreatePost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const postEdit = useSelector(
    state => state.data.store.filter(x => x.id === route?.params)[0],
  );
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();
  const userLogin = useSelector(state => state.data.accountLogin);
  const [titlePost, setTitlePost] = useState('');
  const [imgPost, setImgPost] = useState([]);
  const picture = useSelector(state => state.data.imageCreate);
  const [keyboardHeight, setKeyboardHeight] = useState(safeAreaInsets.bottom);

  if (postEdit) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      postEdit.imagePost.map(x => dispatch(dataActions.addImageCreate(x)));
      setTitlePost(postEdit.titlePost);
    }, []);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0 + safeAreaInsets.bottom);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.btnPost}
          onPress={() => {
            postEdit
              ? dispatch(
                  dataActions.editPost({ titlePost, idPost: postEdit.id }),
                )
              : dispatch(
                  dataActions.addPost({ titlePost, userLogin: userLogin.id }),
                );
            navigation.navigate('Home');
            setImgPost([]);
            setTitlePost('');
            dispatch(dataActions.clearData());
          }}>
          <Text style={styles.colorWhite}>
            {postEdit ? 'Cập nhật' : 'Đăng'}
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Thông báo',
              'Nếu bạn thoát, nội dung bài viết sẽ bị mất',
              [
                {
                  text: 'Tiếp tục viết bài',
                },
                {
                  style: 'destructive',
                  text: 'Hủy bỏ',
                  onPress: () => {
                    dispatch(dataActions.clearData());
                    navigation.navigate('Home');
                  },
                },
              ],
            );
          }}>
          <Image source={Icon.ArrowLeft} />
        </TouchableOpacity>
      ),
      title: postEdit ? 'Cập nhật bài viết' : 'Tạo bài viết',
    });
  }, [titlePost]);

  useEffect(() => {
    setImgPost(picture);
  }, [picture]);

  const uploadImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.errorMessage) {
        console.log('image picker error', response.errorMessage);
      } else {
        dispatch(dataActions.addImageCreate(response.assets[0].uri));
      }
    });
  };

  return (
    <Fragment>
      <ScrollView>
        <View style={styles.c147}>
          <Image source={{ uri: userLogin.avatar }} style={styles.avaUser} />
          <Text style={styles.marginTop}>{userLogin.name}</Text>
        </View>
        <View style={styles.backgroundWhite}>
          <TextInput
            style={styles.color9c9c9c}
            placeholder="Bạn đang nghĩ gì?"
            multiline={true}
            onChangeText={item => setTitlePost(item)}
            value={titlePost}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateImagePost');
            }}>
            <ImagePost imagesPost={imgPost} disable={true} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={[
          styles.c159,
          Platform.OS === 'ios' ? { paddingBottom: keyboardHeight + 40 } : {},
        ]}>
        <TouchableOpacity
          style={styles.optionBar}
          onPress={() => {
            uploadImage();
          }}>
          <Image source={Icon.Image} style={styles.iconUpPost} />
          <Text>Ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBar}>
          <Image style={styles.iconUpPost} source={Icon.Video} />
          <Text>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBar}>
          <Image source={Icon.Product} style={styles.iconUpPost} />
          <Text>Sản phẩm</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  colorWhite: { color: 'white' },
  backgroundWhite: { backgroundColor: 'white' },
  iconUpPost: { height: 23, width: 30, borderRadius: 5 },
  color9c9c9c: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  optionBar: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  btnUpPost: {
    backgroundColor: '#dedede',
    width: 300,
    height: 30,
    margin: 20,
    marginLeft: 10,
    borderRadius: 15,
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  avaUser: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    margin: 20,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 5,
  },
  backgroundColor: { backgroundColor: '#dedede' },
  c147: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  c159: {
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'absolute',
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
  },
  marginTop: { marginTop: 20 },
  btnPost: {
    width: 60,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
