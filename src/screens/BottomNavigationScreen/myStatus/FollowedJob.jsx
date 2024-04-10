import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getFollowedJob } from '../../../features/status/StatusSlice';
import JobCard from '../../../components/JobCard';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import { customThemeColor } from '../../../constants/Color';


const FollowedJob = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { followedJob } = useSelector(state => state.status);


  useEffect(() => {
    dispatch(getFollowedJob());
  }, [dispatch]);
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={GlobalStyleSheet.scrollViewContent}>
      {!!followedJob ? (
        followedJob?.map((item, index) => {
          return (
            <View key={index} style={styles.cardContainer}>
              {/* <JobCard navigation={navigation} items={item} /> */}
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

export default FollowedJob;