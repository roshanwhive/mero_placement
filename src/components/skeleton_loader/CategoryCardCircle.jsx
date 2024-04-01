import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {customThemeColor} from '../../constants/Color';

const CategoryCardCircle = () => {
  return (
    <View style={styles.loaderContainer}>
      <ContentLoader width={110} height={140}>
        <Circle cx="65" cy="65" r="45" />
        <Rect x="10" y="120" rx="4" ry="4" width="120" height="13" />
      </ContentLoader>
    </View>
  );
};

export default CategoryCardCircle;

const styles = StyleSheet.create({});
