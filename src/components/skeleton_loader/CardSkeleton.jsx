import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {customThemeColor} from '../../constants/Color';

const MyLoader = () => <ContentLoader />;
const MyFacebookLoader = () => <Facebook />;
const CardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <ContentLoader>
        {/* Only SVG shapes */}
        <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <Rect x="80" y="12" rx="4" ry="4" width="200" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="200" height="10" />
        <Rect x="80" y="60" rx="3" ry="3" width="200" height="10" />
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
export default CardSkeleton;
