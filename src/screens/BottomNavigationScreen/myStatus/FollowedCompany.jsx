import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import NoSavedJob from '../matchedJob/NoSavedJob'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getFollowedCompany } from '../../../features/status/StatusSlice';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import JobCard from '../../../components/JobCard';

const FollowedCompany = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { followedCompany } = useSelector(state => state.status);


  useEffect(() => {
    dispatch(getFollowedCompany());
  }, [dispatch]);

  useEffect(() => {
    console.log("followedcompany", typeof followedCompany);
  }, [followedCompany]);

  return (
    <ScrollView contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}
      style={GlobalStyleSheet.scrollViewContent}>
      {!!followedCompany ? (
        followedCompany?.map((item, index) => {
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
}

export default FollowedCompany;