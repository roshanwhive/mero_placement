import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {customTextColor, customThemeColor} from '../constants/Color';

const AvatarByName = ({name}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : '';

  return (
    <View
      style={[
        styles.avatarContainer,
        {backgroundColor: customThemeColor.lightBG},
      ]}>
      <Text style={styles.avatarText}>{firstLetter}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: customTextColor.primary,
  },
});

export default AvatarByName;
