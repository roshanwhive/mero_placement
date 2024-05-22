import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getFollowedJob} from '../../../features/status/StatusSlice';
import JobCard from '../../../components/JobCard';
import {GlobalStyleSheet} from '../../../constants/StyleSheet';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import {customThemeColor} from '../../../constants/Color';

const FollowedJob = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {followedJob} = useSelector(state => state.status);

  useEffect(() => {
    dispatch(getFollowedJob());
  }, [dispatch]);

  useEffect(() => {
    console.log('followed', typeof followedJob);
  }, [followedJob]);

  return (
    <ScrollView
      contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}
      style={GlobalStyleSheet.scrollViewContent}>
      {!!followedJob?.data ? (
        followedJob?.data?.map((item, index) => {
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
export default FollowedJob;
