import React, { Fragment, useEffect, useState } from 'react';
import ImageView from 'react-native-image-viewing';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fetchImageApi, fetchVideoApi } from '../constants';
import CCYouTube from './CCYouTube';
import { Icon } from '../core/icon';

interface ImagePost {
  imagesPost: Array<string>;
  disable: boolean;
  newPost?: boolean;
  updatePost?: boolean;
}

const ImagePost = ({
  imagesPost,
  disable,
  newPost = false,
  updatePost = false,
}: ImagePost) => {
  const [visible, setVisible] = useState(false);
  const [indexState, setIndexState] = useState(0);

  const imgView = (index: number) => {
    setVisible(true);
    setIndexState(index);
  };

  useEffect(() => {}, []);

  const PlayScreen = ({ item, width }: { item: string; width: number }) => {
    if (isVideo(item).includes('https://img.youtube.com/vi/')) {
      return (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: '#00000080',
            width,
            position: 'absolute',
            zIndex: 123,
            top: 0,
            bottom: 0,
            left: 0,
            right: -10,
            justifyContent: 'center',
          }}>
          <Image source={Icon.Play} style={styles.btnPlay} />
        </View>
      );
    }
    return <Fragment />;
  };

  const isVideo = (item: string) => {
    if (item.search('video_') !== -1) {
      return fetchVideoApi(item.slice(-item.length + 6));
    } else {
      if (newPost) {
        return item;
      }
      if (updatePost) {
        if (item.includes('file://')) {
          return item;
        }
        return fetchImageApi(item);
      }
      return fetchImageApi(item);
    }
  };

  if (imagesPost.length === 0) {
    return <View />;
  }

  if (imagesPost.length === 1) {
    return (
      <>
        <TouchableOpacity
          onPress={() => imgView(0)}
          style={styles.flex1}
          disabled={disable}>
          <PlayScreen
            item={isVideo(imagesPost[0])}
            width={Dimensions.get('window').width}
          />
          <Image
            source={{
              uri: isVideo(imagesPost[0]),
            }}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: Dimensions.get('window').width,
                aspectRatio: 1,
              },
            ]}
          />
        </TouchableOpacity>
        <ImageView
          images={imagesPost.map(x => ({ uri: isVideo(x) }))}
          imageIndex={indexState}
          visible={visible}
          onRequestClose={() => setVisible(false)}
          YouTubeComponent={(url: { uri: string }) => {
            return (
              <View style={styles.youtubeComponent}>
                <CCYouTube
                  videoId={url.uri
                    .replace('https://img.youtube.com/vi/', '')
                    .replace('/hqdefault.jpg', '')}
                />
              </View>
            );
          }}
        />
      </>
    );
  }

  if (imagesPost.length === 2) {
    return (
      <View style={styles.flexRow}>
        <TouchableOpacity
          onPress={() => imgView(0)}
          style={styles.flex1}
          disabled={disable}>
          <PlayScreen
            item={isVideo(imagesPost[0])}
            width={Dimensions.get('window').width / 2}
          />
          <Image
            source={{ uri: isVideo(imagesPost[0]) }}
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
          onPress={() => imgView(1)}
          style={styles.flex1}
          disabled={disable}>
          <PlayScreen
            item={isVideo(imagesPost[1])}
            width={Dimensions.get('window').width / 2}
          />
          <Image
            source={{ uri: isVideo(imagesPost[1]) }}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: Dimensions.get('window').width / 2,
                aspectRatio: 1,
              },
            ]}
          />
        </TouchableOpacity>
        <ImageView
          images={imagesPost.map(x => ({ uri: isVideo(x) }))}
          imageIndex={indexState}
          visible={visible}
          onRequestClose={() => setVisible(false)}
          YouTubeComponent={(url: { uri: string }) => {
            return (
              <View style={styles.youtubeComponent}>
                <CCYouTube
                  videoId={url.uri
                    .replace('https://img.youtube.com/vi/', '')
                    .replace('/hqdefault.jpg', '')}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
  if (imagesPost.length >= 3) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => imgView(0)}
          style={styles.flex1}
          disabled={disable}>
          <PlayScreen
            item={isVideo(imagesPost[0])}
            width={Dimensions.get('window').width}
          />
          <Image
            source={{ uri: isVideo(imagesPost[0]) }}
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
            onPress={() => imgView(1)}
            style={styles.flex1}
            disabled={disable}>
            <PlayScreen
              item={isVideo(imagesPost[1])}
              width={Dimensions.get('window').width / 2}
            />
            <Image
              source={{ uri: isVideo(imagesPost[1]) }}
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
            {imagesPost.length > 3 ? (
              <TouchableOpacity
                onPress={() => imgView(2)}
                disabled={disable}
                style={styles.moreMedia}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: 'white',
                    fontSize: 48,
                    alignSelf: 'center',
                  }}>
                  +{imagesPost.length - 3}
                </Text>
              </TouchableOpacity>
            ) : (
              <PlayScreen
                item={isVideo(imagesPost[2])}
                width={Dimensions.get('window').width / 2}
              />
            )}
            <TouchableOpacity
              onPress={() => imgView(2)}
              style={styles.flex1}
              disabled={disable}>
              <Image
                source={{ uri: isVideo(imagesPost[2]) }}
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
        <ImageView
          images={imagesPost.map(x => ({ uri: isVideo(x) }))}
          imageIndex={indexState}
          visible={visible}
          onRequestClose={() => setVisible(false)}
          YouTubeComponent={(url: { uri: string }) => {
            return (
              <View style={styles.youtubeComponent}>
                <CCYouTube
                  videoId={url.uri
                    .replace('https://img.youtube.com/vi/', '')
                    .replace('/hqdefault.jpg', '')}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }

  return <></>;
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
  youtubeComponent: { justifyContent: 'center', alignItems: 'center' },
  btnPlay: { height: 100, width: 100, alignSelf: 'center' },
  moreMedia: {
    backgroundColor: '#00000080',
    width: Dimensions.get('window').width / 2,
    position: 'absolute',
    zIndex: 123,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
});

export default ImagePost;
