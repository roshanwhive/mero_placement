import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import JobCard from '../components/JobCard';
import {useDispatch, useSelector} from 'react-redux';
import {getAllJobs} from '../features/job/JobSlice';
import CardSkeleton from '../components/skeleton_loader/CardSkeleton';
import {GlobalStyleSheet} from '../constants/StyleSheet';

const TotalJobs = ({navigation}) => {
  const dispatch = useDispatch();

  const {totalJobs} = useSelector(state => state.job);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={GlobalStyleSheet.Hometitle}>Hot Jobs</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SeeAllJobs');
            dispatch(getAllJobs());
          }}>
          <Text style={GlobalStyleSheet.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewContent}>
        {!!totalJobs?.data ? (
          totalJobs.data.map((item, index) => {
            return (
              <View key={index}>
                <JobCard navigation={navigation} items={item} />
              </View>
            );
          })
        ) : (
          <View>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </View>
        )}
      </View>
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
    paddingVertical: 15,
    overflow: 'visible',
    marginBottom: 0,
  },
});

export default TotalJobs;
