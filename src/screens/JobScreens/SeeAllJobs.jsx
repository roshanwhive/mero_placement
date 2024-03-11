import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import JobCard from '../../components/JobCard';
import Icon from 'react-native-vector-icons/Feather';

const SeeAllJobs = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Icon name="arrow-left" size={25} color="#11401E" />
          </TouchableOpacity>
          <Text style={styles.title}>Total Jobs</Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContentFilter}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.categoryTitle}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.categoryTitle}>Hot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.categoryTitle}>Top</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.categoryTitle}>Finance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.categoryTitle}>Banking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.categoryTitle}>Education</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    color: '#11401E',
    fontSize: 20,
    paddingLeft: 10,
  },
  scrollViewContentFilter: {
    paddingVertical: 5,
    gap: 10,
    overflow: 'visible',
  },
  filterContainer: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    marginVertical: 15,
  },
  filterButton: {
    backgroundColor: '#FCFCFC',
    // borderWidth: 1,
    // borderColor: '#9D050A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  categoryTitle: {
    color: '#11401E',
    fontSize: 16,
  },
  scrollViewContent: {
    paddingVertical: 5,
    overflow: 'visible',
  },
});

export default SeeAllJobs;
