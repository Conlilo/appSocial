/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const PostForm = ({
  titlePost,
  accountPost,
  timePost,
  avaPost,
  idPost,
  active,
}: {
  titlePost: string;
  accountPost: string;
  timePost: string;
  avaPost: string;
  idPost: number;
  active: boolean;
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        marginVertical: 8,
        backgroundColor: 'white',
      }}
      onPress={() => {
        navigation.navigate('PostComment', { idPost, active });
      }}>
      <View style={styles.flexRow}>
        <Image source={{ uri: avaPost }} style={styles.avaPost} />
        <View style={styles.marginTop}>
          <Text style={styles.fontBold}>{accountPost}</Text>
          <Text style={styles.color9c9c9c}>{timePost}</Text>
        </View>
      </View>
      <Text style={styles.titlePost}>{titlePost}</Text>
    </TouchableOpacity>
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
});
