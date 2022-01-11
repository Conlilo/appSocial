import { useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ImagePost {
  images: Array<string>;
}

const ImagePost = ({ images }: ImagePost) => {
  const navigation = useNavigation();

  if (images.length === 1) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetail')}
        style={styles.flex1}>
        <Image
          source={{ uri: images[0] }}
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: Dimensions.get('window').width,
              aspectRatio: 1,
            },
          ]}
        />
      </TouchableOpacity>
    );
  }

  if (images.length === 2) {
    return (
      <View style={styles.flexRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostDetail')}
          style={styles.flex1}>
          <Image
            source={{ uri: images[0] }}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: Dimensions.get('window').width / 2,
                aspectRatio: 1,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostDetail')}
          style={styles.flex1}>
          <Image
            source={{ uri: images[1] }}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: Dimensions.get('window').width / 2,
                aspectRatio: 1,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
  if (images.length >= 3) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostDetail')}
          style={styles.flex1}>
          <Image
            source={{ uri: images[0] }}
            style={[
              {
                width: Dimensions.get('window').width,
                aspectRatio: 3 / 2,
              },
            ]}
          />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PostDetail')}
            style={styles.flex1}>
            <Image
              source={{ uri: images[1] }}
              style={[
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  width: Dimensions.get('window').width / 2,
                  aspectRatio: 1,
                },
              ]}
            />
          </TouchableOpacity>

          <View>
            {images.length > 3 ? (
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  backgroundColor: '#00000080',
                  width: Dimensions.get('window').width / 2,
                  position: 'absolute',
                  zIndex: 123,
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                }}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: 'white',
                    fontSize: 48,
                    alignSelf: 'center',
                  }}>
                  +{images.length - 3}
                </Text>
              </View>
            ) : (
              <Fragment />
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('PostDetail')}
              style={styles.flex1}>
              <Image
                source={{ uri: images[2] }}
                style={[
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    width: Dimensions.get('window').width / 2,
                    aspectRatio: 1,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
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
    flex: 2,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  stylePost: {
    marginVertical: 8,
    backgroundColor: 'white',
  },
});

export default ImagePost;
