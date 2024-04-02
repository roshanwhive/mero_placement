import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {customThemeColor} from '../../constants/Color';

const UserProfileCard = () => {
  return (
    <View style={styles.cardContainer}>
      <ContentLoader width={370} height={150} backgroundColor="#ffffff">
        {/* First Row */}
        <Rect x="20" y="20" rx="8" ry="8" width="160" height="15" />
        <Rect x="280" y="20" rx="8" ry="8" width="80" height="15" />

        {/* Second Row */}
        <Rect x="20" y="70" rx="8" ry="8" width="160" height="15" />
        <Rect x="280" y="70" rx="8" ry="8" width="80" height="15" />

        {/* Third Row */}
        <Rect x="20" y="120" rx="8" ry="8" width="160" height="15" />
        <Rect x="280" y="120" rx="8" ry="8" width="80" height="15" />
      </ContentLoader>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: customThemeColor.lightBG,
    borderRadius: 20,
    padding: 15,
    margin: 10,
  },
});
