import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Icon } from '../core/icon';

import { dataActions } from '../redux/slices/dataApi';

const BtnLike = ({ active, idPost }: { active: boolean; idPost: number }) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.flexRow}
      onPress={() => {
        active
          ? dispatch(dataActions.dislikedPost({ idPost }))
          : dispatch(dataActions.likedPost({ idPost }));
      }}>
      <Image
        source={Icon.Heart}
        style={[
          styles.marginRight,
          // eslint-disable-next-line react-native/no-inline-styles
          { tintColor: active ? '#F00' : '#868686' },
        ]}
      />
      <Text // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.alignCenter, { color: active ? '#F00' : '#868686' }]}>
        Yêu thích
      </Text>
    </TouchableOpacity>
  );
};

export default BtnLike;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: 5,
  },
  alignCenter: { alignSelf: 'center' },
  avaPost: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  interactiveBar: {
    flexDirection: 'row',
    flex: 2,
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
});
