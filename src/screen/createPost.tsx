import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { Icon } from '../core/icon';

const CreatePost = () => {
  const navigation = useNavigation();
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
  return (
    <ScrollView>
      <View style={styles.c147}>
        <Image source={{}} style={styles.avaUser} />
        <Text style={styles.marginTop}>Chiến</Text>
      </View>
      <View style={styles.backgroundWhite}>
        <TextInput
          style={styles.color9c9c9c}
          placeholder="Bạn đang nghĩ gì?"
          multiline={true}
        />
      </View>
      <View style={styles.c147}>
        <TouchableOpacity style={styles.optionBar}>
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
    </ScrollView>
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
  c147: { flexDirection: 'row', backgroundColor: 'white' },
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
