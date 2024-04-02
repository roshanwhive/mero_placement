import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {customTextColor, customThemeColor} from '../constants/Color';

const AvatarByName = ({name}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : '';

  return (
    <View style={[styles.avatarContainer, {backgroundColor: '#454541'}]}>
      <Text style={styles.avatarText}>{firstLetter}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
    // borderWidth: 4,
    // borderColor: 'white',
  },
  avatarText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: customTextColor.white,
  },
});

export default AvatarByName;
