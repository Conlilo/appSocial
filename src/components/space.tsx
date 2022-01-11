import React from 'react';
import { StyleSheet, View } from 'react-native';

const Space = () => {
  return <View style={styles.line} />;
};
export default Space;

const styles = StyleSheet.create({
  line: { height: 8, backgroundColor: '#f3f3f3' },
});
