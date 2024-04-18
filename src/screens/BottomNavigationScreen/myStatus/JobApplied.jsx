import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { color } from 'react-native-reanimated'
import Featured from '../../../containers/Featured';
import TotalJobs from '../../../containers/TotalJobs';
import JobAppliedList from '../../../containers/JobAppliedList';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../../../components/JobCard';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import { getAppliedJob } from '../../../features/status/StatusSlice';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { customThemeColor } from '../../../constants/Color';

const JobApplied = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { appliedJobs } = useSelector(state => state.status);

  useEffect(() => {
    dispatch(getAppliedJob());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: customThemeColor.lightBG }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}>

        {!!appliedJobs?.data ? (
          appliedJobs?.data?.map((item, index) => {
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
        )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobApplied;