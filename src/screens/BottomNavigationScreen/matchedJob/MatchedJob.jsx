import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStyleSheet } from '../../../constants/StyleSheet'
import JobCard from '../../../components/JobCard'
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton'
import { customThemeColor } from '../../../constants/Color'
import { getMatchedJob } from '../../../features/status/StatusSlice'
import { useNavigation } from '@react-navigation/native'
import AddPref from './AddPref'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'
import NoSavedJob from './NoSavedJob'
import MatchedJobView from './MatchedJobView'

const MatchedJob = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userProfile } = useSelector(state => state.auth);


  useEffect(() => {
    console.log("userProfile", typeof userProfile);
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}
      style={GlobalStyleSheet.scrollViewContent}>
      {!!userProfile?.preference ? <MatchedJobView /> : <AddPref />}
      {/* <MatchedJobView /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  scrollViewContent: {
    paddingVertical: 5,
    overflow: 'visible',
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
});
export default MatchedJob;