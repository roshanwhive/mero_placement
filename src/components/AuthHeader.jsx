import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

const AuthHeader = () => {
  return (
    <View style={styles.titleContainer}>
      <Image
        source={require('../assets/mero-placement-logo1.png')}
        style={styles.logoImage}
      />
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'left',
    marginTop: 10,
    width: 120,
    height: 40,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});
