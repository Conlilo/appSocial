import React from 'react';
import { StyleSheet, View } from 'react-native';

const Column = () => {
  return <View style={styles.line} />;
};
export default Column;

const styles = StyleSheet.create({
  line: { borderWidth: 1, borderColor: '#dedede', marginVertical: 10 },
});
