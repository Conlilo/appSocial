import React, { Fragment, useState } from 'react';
import ImageView from 'react-native-image-viewing';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ImagePost {
  imagesPost: Array<string>;
  disable: boolean;
}

const ImagePost = ({ imagesPost, disable }: ImagePost) => {
  const [visible, setVisible] = useState(false);
  const [indexState, setIndexState] = useState(0);

  const imgView = (index: number) => {
    setVisible(true);
    setIndexState(index);
    console.log(imagesPost.map(x => ({ uri: x })));
    console.log(index);
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
          <Image
            source={{ uri: imagesPost[0] }}
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
          images={imagesPost.map(x => ({ uri: x }))}
          imageIndex={indexState}
          visible={visible}
          onRequestClose={() => setVisible(false)}
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
          <Image
            source={{ uri: imagesPost[0] }}
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
          <Image
            source={{ uri: imagesPost[1] }}
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
          images={imagesPost.map(x => ({ uri: x }))}
          imageIndex={indexState}
          visible={visible}
          onRequestClose={() => setVisible(false)}
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
          <Image
            source={{ uri: imagesPost[0] }}
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
            <Image
              source={{ uri: imagesPost[1] }}
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
                  +{imagesPost.length - 3}
                </Text>
              </View>
            ) : (
              <Fragment />
            )}
            <TouchableOpacity
              onPress={() => imgView(2)}
              style={styles.flex1}
              disabled={disable}>
              <Image
                source={{ uri: imagesPost[2] }}
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
          images={imagesPost.map(x => ({ uri: x }))}
          imageIndex={indexState}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
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
