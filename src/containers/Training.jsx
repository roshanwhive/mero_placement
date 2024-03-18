import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import {customTextColor, customThemeColor} from '../constants/Color';
import TrainingCard from '../components/TrainingCard';
const Training = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Courses</Text>
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
    marginTop: 10,
    backgroundColor: customThemeColor.primary,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: customTextColor.darkGreen,
  },
  scrollView: {
    marginVertical: 10,
  },
});

export default Training;
