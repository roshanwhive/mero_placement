import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {customThemeColor} from '../../constants/Color';

const MyLoader = () => <ContentLoader />;
const MyFacebookLoader = () => <Facebook />;
const ProfileSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <ContentLoader viewBox="0 0 380 70">
        <Rect x="30" y="17" rx="4" ry="4" width="300" height="13" />
        <Rect x="30" y="40" rx="3" ry="3" width="300" height="13" />
      </ContentLoader>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: customThemeColor.white,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 2,
    paddingHorizontal: 16,
    paddingVertical: 15,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    height: 100,
  },
});
export default ProfileSkeleton;
