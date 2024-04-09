import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMatchedJob } from '../../../features/job/JobSlice'
import { GlobalStyleSheet } from '../../../constants/StyleSheet'
import JobCard from '../../../components/JobCard'
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton'

const MatchedJob = ({ navigation }) => {
  const dispatch = useDispatch();
  const { matchedJobs } = useSelector(state => state.job);


  useEffect(() => {
    dispatch(getMatchedJob());
  }, [dispatch]);

  // useEffect(() => {
  //  console.log("matched", message);
  // } , [message]);

  return (
    <View style={GlobalStyleSheet.scrollViewContent}>
      {!matchedJobs ? (
        matchedJobs?.map((item, index) => {
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

export default MatchedJob;