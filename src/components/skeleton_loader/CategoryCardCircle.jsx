import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {customThemeColor} from '../../constants/Color';

const CategoryCardCircle = () => {
  return (
    <View style={styles.loaderContainer}>
      <ContentLoader width={130} height={130}>
        {/* Circle loader */}
        <Circle cx="65" cy="65" r="60" />
      </ContentLoader>
    </View>
  );
};

export default CategoryCardCircle;

const styles = StyleSheet.create({
  loaderContainer: {
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 6,
    paddingVertical: 5,
    shadowColor: 'rgba(150, 170, 180, 0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    backgroundColor: customThemeColor.white,
  },
});
