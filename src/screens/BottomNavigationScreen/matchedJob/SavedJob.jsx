import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import JobCard from '../../../components/JobCard';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import { getSavedJob } from '../../../features/status/StatusSlice';

const SavedJob = ({ navigation }) => {
  const dispatch = useDispatch();
  const { savedJobs } = useSelector(state => state.status);
  const { message } = useSelector(state => state.status);


  useEffect(() => {
    dispatch(getSavedJob());
  }, [dispatch]);

  useEffect(() => {
    console.log("saved", message);
  }, [message]);

  return (
    <View style={GlobalStyleSheet.scrollViewContent}>
      {!!savedJobs ? (
        savedJobs?.map((item, index) => {
          return (
            <View key={index}>

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
