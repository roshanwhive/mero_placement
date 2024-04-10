import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
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
  const { matchedJobs } = useSelector(state => state.status);


  useEffect(() => {
    dispatch(getMatchedJob());
  }, [dispatch]);


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={GlobalStyleSheet.scrollViewContent}>
      {!!matchedJobs ? (
        matchedJobs?.map((item, index) => {
          return (
            <View key={index} style={styles.cardContainer}>
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
  cardContainer: {
    display: 'flex',
    flexWrap: "wrap",
    height: 150
  },
  scrollViewContent: {
    paddingVertical: 5,
    overflow: 'visible',
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
});
export default MatchedJob;