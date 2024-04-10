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

const JobApplied = ({ navigation }) => {
  const dispatch = useDispatch();
  const { appliedJobs } = useSelector(state => state.status);

  useEffect(() => {
    dispatch(getAppliedJob());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>

        {!!appliedJobs ? (
          appliedJobs?.map((item, index) => {
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
        )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  scrollViewContent: {
    paddingBottom: 0,
    zIndex: 0,
    backgroundColor: '#FCFCFC',
    borderTopLeftRadius: 25,
    position: 'relative',
    borderTopRightRadius: 25,
  },
  featuredContainer: {
    marginTop: 5,
  },
  totalJobs: {
    marginTop: 5,
  },
});

export default JobApplied;