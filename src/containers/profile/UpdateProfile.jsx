import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../components/custom_toolbar/AppBar';

const UpdateProfile = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <AppBar handleBack={handleBack} title="Update Profile" />
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({});
