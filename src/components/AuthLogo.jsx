import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const AuthLogo = ({imgSrc}) => {
  return (
    <View style={styles.authLogoContainer}>
      <Image source={imgSrc} style={styles.authLogo} />
    </View>
  );
};

export default AuthLogo;

const styles = StyleSheet.create({
  authLogoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
  },
  authLogo: {
    width: 200,
    height: 200,
  },
});
