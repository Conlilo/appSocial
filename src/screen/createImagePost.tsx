import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePost from '../components/imagePost';
import { Icon } from '../core/icon';
import { dataActions } from '../redux/slices/dataApi';

const CreateImagePost = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const images = useSelector(state => state.data.imageCreate);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={Icon.ArrowLeft} />
        </TouchableOpacity>
      ),
    });
  });
  return (
    <FlatList
      data={images}
      renderItem={item => {
        console.log(item.item);
        return (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(dataActions.delImageCreate(item.item));
              }}
              style={styled.xicon}>
              <Image source={Icon.Xicon} style={styled.xicon} />
            </TouchableOpacity>
            {item.item.includes('file:///') ? (
              <Image
                source={{ uri: item.item }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: '100%', height: 300 }}
              />
            ) : (
              <ImagePost imagesPost={[item.item]} disable={false} />
            )}
            {/* <Image
              source={{
                uri: item.item.includes('file:///')
                  ? item.item
                  : item.item.includes('video_')
                  ? fetchVideoApi(item.item.split('video_')[1])
                  : fetchImageApi(item.item),
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: '100%', height: 300 }}
            /> */}
          </View>
        );
      }}
    />
  );
};

export default CreateImagePost;

const styled = StyleSheet.create({
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
});
