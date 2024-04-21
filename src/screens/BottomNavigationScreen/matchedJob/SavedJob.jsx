import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import JobCard from '../../../components/JobCard';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import { getSavedJob } from '../../../features/status/StatusSlice';
import { useNavigation } from '@react-navigation/native';

const SavedJob = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { savedJobs } = useSelector(state => state.status);

  useEffect(() => {
    dispatch(getSavedJob());
  }, [dispatch]);

  useEffect(() => {
    console.log("saved", typeof savedJobs);
  }, [savedJobs]);

  return (
    <View contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}
      style={GlobalStyleSheet.scrollViewContent}>
      {!!savedJobs ? (
        savedJobs?.data?.map((item, index) => {
          return (
            <View key={index} style={GlobalStyleSheet.cardContainer}>
              <JobCard navigation={navigation} items={item} />
              <View></View>
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
