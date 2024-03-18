import React from 'react';
import {StatusBar, ScrollView, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Categories from '../../components/Categories';
import Featured from '../../containers/Featured';
import SearchBar from '../../containers/SearchBar';
import TotalJobs from '../../containers/TotalJobs';
import Training from '../../containers/Training';
import ActivelySeekingForJobCard from '../../containers/ActivelySeekingForJobCard';

const Home = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <View style={styles.textWrapper}>
            <Text style={styles.greetingText}>Hello, Roshan Neupane</Text>
            <Text style={styles.subHeading}>Get Your Dream Job!</Text>
          </View>
        </View>

        {/* Main */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          {/* Categories */}
          <Categories />
          <ActivelySeekingForJobCard />
          {/* Featured */}
          <View style={styles.featuredContainer}>
            <Featured navigation={navigation} />
          </View>
          <Training />
          <View style={styles.totalJobs}>
            <TotalJobs navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  greetingText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subHeading: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '600',
  },
  header: {
    height: 200,
    backgroundColor: '#9D050A',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  scrollViewContent: {
    paddingBottom: 120,
    paddingTop: 10,
    marginTop: 120,
    zIndex: 0,
    backgroundColor: '#FCFCFC',
    borderTopLeftRadius: 25,
    position: 'relative',
    borderTopRightRadius: 25,
  },
  featuredContainer: {
    marginTop: 5,
  },
  totalJobs: {
    marginTop: 5,
  },
});

export default Home;
