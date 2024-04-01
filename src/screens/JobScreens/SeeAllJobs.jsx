import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import JobCard from '../../components/JobCard';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {getAllJobs} from '../../features/job/JobSlice';
import {ActivityIndicator} from 'react-native-paper';
import {customTextColor, customThemeColor} from '../../constants/Color';

const SeeAllJobs = ({navigation}) => {
  const dispatch = useDispatch();
  const {allJobs} = useSelector(state => state.job);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllJobs());
    }, 200);
  }, [dispatch]);

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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {allJobs.data ? (
          allJobs.data.map((item, index) => {
            return (
              <View key={index}>
                <JobCard navigation={navigation} items={item} />
              </View>
            );
          })
        ) : (
          <View style={{marginTop: 100}}>
            <ActivityIndicator
              animating={true}
              style={{marginTop: 40}}
              color={customTextColor.lightGreen}
            />
          </View>
        )}
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
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
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
