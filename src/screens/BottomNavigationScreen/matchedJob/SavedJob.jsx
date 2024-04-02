import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSavedJob} from '../../../features/job/JobSlice';
import {GlobalStyleSheet} from '../../../constants/StyleSheet';
import JobCard from '../../../components/JobCard';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';

const SavedJob = ({navigation}) => {
  const dispatch = useDispatch();
  const {savedJobs} = useSelector(state => state.job);

  useEffect(() => {
    dispatch(getSavedJob());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('saved jobs', typeof savedJobs);
  // }, [savedJobs]);

  return (
    <View style={GlobalStyleSheet.scrollViewContent}>
      {!!savedJobs ? (
        savedJobs?.map((item, index) => {
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
  );
};

export default SavedJob;
