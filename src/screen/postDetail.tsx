//import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BtnLike from '../components/btnLike';
import Line from '../components/line';
import PostForm from '../components/postForm';
import PostStatus from '../components/postStatus';
import { Icon } from '../core/icon';

const PostDetail = () => {
  //const navigation = useNavigation();
  return (
    <View style={styles.stylePost}>
      <PostForm
        titlePost="
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
  culpa cum maiores et pariatur illum delectus, molestiae, distinctio,
  consequatur tempore asperiores corrupti! Neque, natus. Asperiores
  dolores neque quam animi sed."
        accountPost="Chien"
        timePost="5 giờ trước"
        avaPost="https://i.pravatar.cc/30"
      />
      <PostStatus numCommentPost="5" numLikePost="40 người khác" />
      <Line />

      <View style={styles.reactBar}>
        <View style={styles.interactiveBar}>
          <BtnLike />
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://picsum.photos/300' }}
            style={styles.imgPost}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
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
  reactBar: { marginBottom: 0 },
});
