import {StyleSheet, View} from 'react-native';
import React from 'react';
import ContentLoader, {Circle} from 'react-content-loader/native';
import {customThemeColor} from '../../constants/Color';

const AvatarSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <ContentLoader width={135} height={135} backgroundColor="#ffffff">
        <Circle cx="70" cy="70" r="65" />
      </ContentLoader>
    </View>
  );
};

export default AvatarSkeleton;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: customThemeColor.lightBG,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: customThemeColor.lighterBg,
  },
});
