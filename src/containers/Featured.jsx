import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import JobCard from '../components/JobCard';
import {customTextColor, customThemeColor} from '../constants/Color';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getJobByJobTypes} from '../features/job/JobSlice';
import CardSkeleton from '../components/skeleton_loader/CardSkeleton';
import {GlobalStyleSheet} from '../constants/StyleSheet';

const Featured = ({navigation}) => {
  const dispatch = useDispatch();
  const {jobByTpes} = useSelector(state => state.job);

  useEffect(() => {
    dispatch(getJobByJobTypes('top_job'));
  }, [dispatch]);

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={GlobalStyleSheet.Hometitle}>Top Jobs</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SeeAllJobs')}>
          <Text style={GlobalStyleSheet.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollViewContent}>
        {!!jobByTpes?.data ? (
          jobByTpes?.data?.slice(0, 5).map((item, index) => {
            return <JobCard key={index} items={item} navigation={navigation} />;
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
