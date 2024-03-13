import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import JobCard from '../components/JobCard';
import {customTextColor, customThemeColor} from '../constants/Color';

const Featured = ({navigation}) => {
  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Top Jobs</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SeeAllJobs')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <JobCard />
        <JobCard />
        <JobCard />
      </ScrollView> */}
      <View style={styles.scrollViewContent}>
        <JobCard navigation={navigation} />
        <JobCard navigation={navigation} />
        <JobCard navigation={navigation} />
      </View>
      <TouchableOpacity onPress={() => console.log('View All pressed')}>
        {/* <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>View All</Text>
        </View> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#11401E',
    fontSize: 20,
  },
  seeAll: {
    color: '#2b8256',
    fontWeight: '500',
    textDecorationLine: 'underline',
    paddingRight: 3,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    overflow: 'visible',
  },
  buttonContainer: {
    backgroundColor: customThemeColor.lightBG,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: customTextColor.primary,
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Featured;
