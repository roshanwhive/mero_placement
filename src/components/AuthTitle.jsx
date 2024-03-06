import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const AuthTitle = ({title}) => {
  return (
    <View style={styles.titleTextContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default AuthTitle;

const styles = StyleSheet.create({
  titleTextContainer: {
    width: '100%',
    padding: 6,
    textAlign: 'left',
  },
  titleText: {
    color: '#11401E',
    fontSize: 30,
    fontWeight: '600',
  },
});
