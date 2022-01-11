import { useNavigation } from '@react-navigation/native';
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
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import ImagePost from '../components/imagePost';
import { Icon } from '../core/icon';

const CreatePost = () => {
  const [picture, setPicture] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();

  const [keyboardHeight, setKeyboardHeight] = useState(safeAreaInsets.bottom);

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
        <TouchableOpacity style={styles.btnPost}>
          <Text style={styles.colorWhite}>Đăng</Text>
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
                  onPress: () => navigation.navigate('Home'),
                },
              ],
            );
          }}>
          <Image source={Icon.ArrowLeft} />
        </TouchableOpacity>
      ),
    });
  });
  const uploadImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // console.log(ImagePicker);
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.errorMessage) {
        console.log('image picker error', response.errorMessage);
      } else {
        setPicture([...picture, response.assets[0].uri]);
      }
    });
  };

  return (
    <Fragment>
      <ScrollView>
        <View style={styles.c147}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/30' }}
            style={styles.avaUser}
          />
          <Text style={styles.marginTop}>Chiến</Text>
        </View>
        <View style={styles.backgroundWhite}>
          <TextInput
            style={styles.color9c9c9c}
            placeholder="Bạn đang nghĩ gì?"
            multiline={true}
          />
          <ImagePost images={picture} />
        </View>
      </ScrollView>
      <View style={[styles.c159, { paddingBottom: keyboardHeight + 40 }]}>
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
