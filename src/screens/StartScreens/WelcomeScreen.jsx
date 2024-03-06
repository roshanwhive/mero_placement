import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../../assets/img-bg.jpg')}
        style={styles.backgroundImage}
      />
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/mero-placement-logo1.png')}
          style={styles.logo}
        />
      </View>

      {/* Loading Icon */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="black" size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  logoContainer: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },

  loadingContainer: {
    position: 'absolute',
    bottom: 20,
  },
});

export default WelcomeScreen;
