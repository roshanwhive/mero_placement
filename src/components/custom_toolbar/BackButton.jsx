import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function BackButton() {

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBack}>
      <Icon name="arrow-left" size={20} color="black" />
    </TouchableOpacity>
  )
}