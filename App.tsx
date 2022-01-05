/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from './src/core/icon';
import { AppImage } from './src/core/image';
const App = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#dedede' }}>
      <ScrollView style={{ marginBottom: 0 }}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          <Image
            source={{}}
            style={{
              backgroundColor: 'red',
              width: 30,
              height: 30,
              margin: 20,
              borderRadius: 15,
              marginRight: 10,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#dedede',
              width: 300,
              height: 30,
              margin: 20,
              marginLeft: 10,
              borderRadius: 15,
              paddingVertical: 0,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#9c9c9c' }}>Bạn đang nghĩ gì?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          <TouchableOpacity
            style={{
              height: 50,
              flex: 1,
              alignItems: 'center',
            }}>
            <Image source={Icon.Image} style={{ height: 22, width: 22 }} />
            <Text>Ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 50, flex: 1, alignItems: 'center' }}>
            <Image style={{ height: 22, width: 30 }} source={Icon.Video} />
            <Text>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              flex: 1,
              alignItems: 'center',
            }}>
            <Image source={Icon.Product} style={{ height: 22, width: 22 }} />
            <Text>Sản phẩm</Text>
          </TouchableOpacity>
        </View>
        {/* Bài viết */}
        <View
          style={{
            marginVertical: 8,
            backgroundColor: 'white',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{}}
              style={{
                backgroundColor: 'red',
                width: 30,
                height: 30,
                margin: 10,
                borderRadius: 15,
                marginRight: 10,
              }}
            />
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Chiến</Text>
              <Text style={{ color: '#9c9c9c' }}>5 giờ trước</Text>
            </View>
          </View>
          <Text style={{ padding: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae culpa cum maiores et pariatur illum delectus, molestiae,
            distinctio, consequatur tempore asperiores corrupti! Neque, natus.
            Asperiores dolores neque quam animi sed.
          </Text>
          <Image source={AppImage.Test} style={{ width: '100%' }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
              <Image source={Icon.Hearts} style={{ marginRight: 5 }} />
              <Text style={{ color: '#9c9c9c' }}>40 người khác</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 20 }}>
              <Image source={Icon.Comments} style={{ marginRight: 5 }} />
              <Text style={{ color: '#9c9c9c' }}>35 bình luận</Text>
            </View>
          </View>
          <View style={{ borderWidth: 1, borderColor: '#dedede' }} />
          <View
            style={{
              flexDirection: 'row',
              flex: 2,
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={Icon.Heart} style={{ marginHorizontal: 5 }} />
              <Text style={{ alignSelf: 'center' }}>Yêu thích</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Image source={Icon.Comment} style={{ marginHorizontal: 5 }} />
              <Text style={{ alignSelf: 'center' }}>Bình luận</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/*React post and comment */}
    </SafeAreaView>
  );
};
export default App;
