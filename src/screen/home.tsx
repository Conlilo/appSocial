import { useNavigation } from '@react-navigation/native';
import { iteratorSymbol } from 'immer/dist/internal';
import React, { Fragment } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Space from '../components/space';
import { Icon } from '../core/icon';
import PostSocial from './postSocial';

const Home = () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const data = useSelector(state => state.data.store);
  const user = useSelector(state => state.data.dataUser);

  return (
    <View style={[styles.backgroundColor, { paddingTop: safeAreaInsets.top }]}>
      {/* Bài viết */}
      <FlatList
        data={[...data].reverse()}
        renderItem={({ item }) => {
          return (
            <PostSocial
              titlePost={item.titlePost}
              accountPost={user.filter(x => x.id === item.idUser)[0].name}
              timePost={item.timePost}
              avaPost={user.filter(x => x.id === item.idUser)[0].avatar}
              image={item.imagePost}
              numCommentPost={item.numComment}
              numLikePost={item.numLike}
              active={
                user[0].postLiked.filter(x => x === item.id)[0] === item.id
              }
              idPost={item.id}
            />
          );
        }}
        ListHeaderComponent={
          <Fragment>
            <View style={styles.c147}>
              <Image source={{}} style={styles.avaUser} />
              <TouchableOpacity
                style={styles.btnUpPost}
                onPress={() => navigation.navigate('CreatePost')}>
                <Text style={styles.color9c9c9c}>Bạn đang nghĩ gì?</Text>
              </TouchableOpacity>
            </View>

            <Space />

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
          </Fragment>
        }
      />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  iconUpPost: { height: 24, width: 24, borderRadius: 5 },
  color9c9c9c: { color: '#9c9c9c' },
  optionBar: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  btnUpPost: {
    backgroundColor: '#f3f3f3',
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
  },
  backgroundColor: { backgroundColor: '#fff' },
  c147: { flexDirection: 'row', backgroundColor: 'white' },
});
