import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStyleSheet } from '../../../constants/StyleSheet'
import JobCard from '../../../components/JobCard'
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton'
import { customThemeColor } from '../../../constants/Color'
import { getMatchedJob } from '../../../features/status/StatusSlice'
import { useNavigation } from '@react-navigation/native'


const MatchedJob = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userProfile } = useSelector(state => state.auth);
  const { matchedJobs } = useSelector(state => state.status);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    dispatch(getMatchedJob());
  }, [dispatch]);

  useEffect(() => {
    console.log('userProfile', typeof userProfile);
  }, [dispatch]);

  // useEffect(() => {
  //   CloseActivityIndicator();
  // }, [])

  // const CloseActivityIndicator = () => {
  //   setTimeout(() => {
  //     setAnimate(false);
  //   }, 2000);
  // };




  return (
    <ScrollView
      contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}
      style={GlobalStyleSheet.scrollViewContent}>
      {/* <ActivityIndicator animating={animate} size="large" color="#ffffff" /> */}
      {/* {!!userProfile?.preference ? <MatchedJobView /> : <AddProp />} */}
      {!!matchedJobs ? (
        matchedJobs?.data?.map((item, index) => {
          return (
            <View key={index} style={GlobalStyleSheet.cardContainer}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    overflow: 'visible',
    backgroundColor: customThemeColor.lightBG,
  },
});
export default MatchedJob;
