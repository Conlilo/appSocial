import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
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
  FlatList,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ImagePost from '../components/imagePost';
import { fetchImageApi, uploadImageUrl } from '../constants';
import { Icon } from '../core/icon';
import { dataActions } from '../redux/slices/dataApi';
import getProduct from '../services/product';

const CreatePost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const postEdit = useSelector(
    state => state.data.realStore.filter(x => x.id === route?.params)[0],
  );
  const upImage = route?.params?.upImage;
  const upProduct = route?.params?.upProduct;
  const upVideo = route?.params?.upVideo;
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();
  const userLogin = useSelector(state => state.data.accountLogin);
  const [titlePost, setTitlePost] = useState('');
  const [imgPost, setImgPost] = useState([]);
  const picture = useSelector(state => state.data.imageCreate);
  const [keyboardHeight, setKeyboardHeight] = useState(safeAreaInsets.bottom);
  const imageCreate = useSelector(state => state.data.uploadImage);
  const userToken = useSelector(state => state.data.token);
  const product = useSelector(state => state.data.product);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalVideo, setModalVideo] = useState(false);
  const [targetProduct, setTargetProduct] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const _getProduct = async () => {
    try {
      const result = await getProduct();
      dispatch(dataActions.addProduct({ product: result?.data.data }));
    } catch (error) {
      dispatch(dataActions.Logout());
    }
  };

  const handleSubmit = async () => {
    try {
      const uploadImage = await axios({
        method: 'post',
        url: uploadImageUrl,
        data: imageCreate,
      });

      postEdit
        ? await axios({
            method: 'post',
            url: 'https://devapi.cuccu.vn/cuccu.api/Feeds',
            data: {
              id: postEdit.id,
              userId: userLogin.userId,
              content: titlePost,
              isActive: true,
              images: uploadImage.data.data
                ? picture.length === 0
                  ? ''
                  : uploadImage.data.data.map(x => x.id).join(',')
                : picture.length === 0
                ? ''
                : picture.join(','),
              idProduct: targetProduct ? targetProduct.id : null,
            },
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
        : await axios({
            method: 'post',
            url: 'https://devapi.cuccu.vn/cuccu.api/Feeds',
            data: {
              userId: userLogin.userId,
              content: titlePost,
              isActive: true,
              images: uploadImage.data.data.map(x => x.id).join(','),
              idProduct: targetProduct ? targetProduct.id : null,
            },
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

      setImgPost([]);
      setTitlePost('');
      dispatch(dataActions.clearData());
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  };

  const uploadImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.errorMessage) {
        console.log('image picker error', response.errorMessage);
      } else {
        dispatch(dataActions.addImageCreate(response.assets[0].uri));

        const { base64 } = response.assets[0];
        dispatch(
          dataActions.uploadImage({
            name: `${response.assets[0].fileName}`,
            content: base64,
          }),
        );
      }
    });
  };

  useEffect(() => {
    if (postEdit) {
      postEdit.images === ''
        ? dispatch(dataActions.EditImageCreate(Array(0)))
        : dispatch(dataActions.EditImageCreate(postEdit.images.split(',')));
      setTitlePost(postEdit.content);
      postEdit.product
        ? setTargetProduct(product.filter(x => x.id === postEdit.product.id)[0])
        : setTargetProduct(null);
    }
  }, [postEdit]);

  useEffect(() => {
    _getProduct();
  }, [userToken]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0 + safeAreaInsets.bottom);
    });
  }, []);

  useEffect(() => {
    setImgPost(picture);
  }, [picture]);

  useEffect(() => {
    if (upProduct) {
      setModalVisible(!isModalVisible);
    }
    if (upImage) {
      uploadImage();
    }
    if (upVideo) {
      setModalVideo(!modalVideo);
    }
  }, []);

  return (
    <Fragment>
      <View
        style={Platform.OS === 'ios' ? styles.navBarIos : styles.navBarAndroid}>
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
        {postEdit ? (
          <Text style={styles.fs24}>Sửa bài viết</Text>
        ) : (
          <Text style={styles.fs24}>Tạo bài viết</Text>
        )}
        <TouchableOpacity
          style={styles.btnPost}
          onPress={() => {
            handleSubmit();
            postEdit
              ? Alert.alert('Thông báo', 'Bài viết đã cập nhật', [
                  { text: 'OK' },
                ])
              : Alert.alert('Thông báo', 'Đợi bài viết được kiểm duyệt', [
                  { text: 'OK' },
                ]);
          }}>
          <Text style={styles.colorWhite}>
            {postEdit ? 'Cập nhật' : 'Đăng'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.c147}>
          <Image
            source={{ uri: fetchImageApi(userLogin.avatar) }}
            style={styles.avaUser}
          />
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
            <ImagePost
              imagesPost={imgPost}
              disable={true}
              newPost={!postEdit}
              updatePost={postEdit}
            />
          </TouchableOpacity>
          {/* Sản Phẩm */}
          {targetProduct ? (
            <View style={styles.mb70}>
              <TouchableOpacity
                onPress={() => {
                  setTargetProduct(null);
                }}
                style={styles.xicon}>
                <Image source={Icon.Xicon} style={styles.xicon} />
              </TouchableOpacity>
              <ImagePost
                imagesPost={
                  targetProduct.listImages
                    ? // ? [product.image].concat(product.listImages.split(','))
                      [
                        targetProduct.image,
                        ...targetProduct.listImages.split(','),
                      ].filter(x => x)
                    : [targetProduct.image]
                }
                disable={false}
              />

              <View style={styles.viewProduct}>
                <View style={styles.flexColumn}>
                  <Text style={styles.captialize}>{targetProduct.name}</Text>
                  <Text>
                    Giá bán:{' '}
                    <Text style={styles.color}>
                      {targetProduct?.price
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.mb70} />
          )}

          {/* end Product */}
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
        <TouchableOpacity
          style={styles.optionBar}
          onPress={() => {
            setModalVideo(!modalVideo);
          }}>
          <Image style={styles.iconUpPost} source={Icon.Video} />
          <Text>Video</Text>
        </TouchableOpacity>
        {/* Modal up video */}
        <View>
          <Modal isVisible={modalVideo} style={styles.styleModal}>
            <View style={styles.styleView}>
              <Text style={styles.titleModalYoutubeLink}>
                Nhập link từ Youtube
              </Text>
              <TextInput
                style={styles.youtubeLinkBox}
                placeholder=" Đường đãn Youtube"
                onChangeText={text => {
                  setYoutubeLink(text);
                }}
                value={youtubeLink}
              />
              <View style={styles.btnYoutubeBar}>
                <TouchableOpacity
                  onPress={() => setModalVideo(!modalVideo)}
                  style={[
                    styles.btnYoutubeConfirm,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { borderColor: 'red', borderWidth: 1 },
                  ]}>
                  <Text>Hủy bỏ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVideo(!modalVideo);
                    dispatch(
                      dataActions.EditVideoCreate({
                        video: 'video_' + youtubeLink.slice(32),
                      }),
                    );
                  }}
                  style={[
                    styles.btnYoutubeConfirm,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { backgroundColor: 'red' },
                  ]}>
                  <Text style={styles.colorWhite}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        {/* end modal up video  */}
        <TouchableOpacity style={styles.optionBar} onPress={toggleModal}>
          <Image source={Icon.Product} style={styles.iconUpPost} />
          <Text>Sản phẩm</Text>
        </TouchableOpacity>
      </View>
      {/* Modal sản phẩm */}
      <View>
        <Modal isVisible={isModalVisible} style={styles.styleModal}>
          <View style={styles.styleView}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchBox}
                placeholder="Tìm kiếm"
                onChangeText={() => {}}
                value={''}
              />
              <TouchableOpacity onPress={toggleModal}>
                <Image source={Icon.Xicon} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={product}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.listProduct}
                    onPress={() => {
                      setTargetProduct(item);
                      toggleModal();
                    }}>
                    <Image
                      source={{ uri: fetchImageApi(item.image) }}
                      style={styles.infoImageProduct}
                    />
                    <View style={styles.infoProduct}>
                      <Text>{item.name}</Text>
                      <Text>
                        Giá{' '}
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>
      </View>
      {/* End modal sản phẩm */}
    </Fragment>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  mb70: {
    marginBottom: 70,
  },
  titleModalYoutubeLink: { alignSelf: 'center', fontSize: 20 },
  listProduct: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  infoProduct: {
    justifyContent: 'space-between',
    marginRight: 25,
  },
  infoImageProduct: { width: 30, height: 30, marginRight: 10 },
  styleModal: { alignItems: 'center', marginBottom: 80 },
  styleView: {
    backgroundColor: 'white',
    marginTop: 50,
    borderRadius: 15,
    padding: 10,
    justifyContent: 'space-between',
  },
  colorWhite: { color: 'white' },
  backgroundWhite: { backgroundColor: 'white' },
  iconUpPost: { height: 23, width: 30, borderRadius: 5 },
  color9c9c9c: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  btnYoutubeConfirm: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnYoutubeBar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchBar: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  youtubeLinkBox: {
    backgroundColor: '#f3f3f3',
    marginVertical: 10,
    height: 24,
    borderRadius: 10,
  },
  searchBox: {
    backgroundColor: '#f3f3f3',
    height: 24,
    width: '90%',
    borderRadius: 5,
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
  navBarIos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  navBarAndroid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  fs24: {
    fontSize: 24,
  },
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
  xicon: {
    position: 'absolute',
    bottom: 0,
    top: 10,
    right: 10,
    backgroundColor: '#000',
    zIndex: 123,
    tintColor: '#fff',
    borderRadius: 5,
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
