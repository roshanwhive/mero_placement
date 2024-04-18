import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import {customTextColor, customThemeColor} from '../constants/Color';
import TrainingCard from '../components/TrainingCard';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { customFontSize } from '../constants/theme';
const Training = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyleSheet.Hometitle}>Available Courses</Text>
      <ScrollView
        horizontal={true}
        indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <TrainingCard navigation={navigation} />
        <TrainingCard />
        <TrainingCard />
        <TrainingCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: customThemeColor.primary,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: customFontSize.font14,
    fontWeight: 'bold',
    color: customTextColor.darkGreen,
  },
  scrollView: {
    marginVertical: 10,
  },
});

export default Training;
