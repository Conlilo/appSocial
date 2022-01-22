import React from 'react';
import { Dimensions, Platform, View, ViewStyle } from 'react-native';
import WebView from 'react-native-webview';
import YouTube from 'react-native-youtube';
import styled from 'styled-components/native';

interface CCYouTubeProps {
  videoId: string;
  style?: ViewStyle;
}

const StyledYouTube = styled(YouTube)`
  align-self: stretch;
  width: ${Dimensions.get('window').width};
  aspect-ratio: ${16 / 9};
`;

const CCYouTube = ({ videoId, style }: CCYouTubeProps) => {
  if (Platform.OS === 'ios') {
    return (
      <StyledYouTube
        videoId={videoId} // The YouTube video ID
        play={false} // control playback of video with true/false
        loop={false}
        apiKey={'AIzaSyBOVR7O1rao9lTQl08pjSyL1yk90e8ZhIQ'}
        rel={!!0}
        style={style}
      />
    );
  } else {
    return (
      <View
        style={[
          { width: Dimensions.get('window').width, aspectRatio: 16 / 9 },
          style,
        ]}>
        <WebView
          allowsFullscreenVideo
          scrollEnabled={false}
          source={{
            html: `<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
          }}
        />
      </View>
    );
  }
};

export default CCYouTube;
