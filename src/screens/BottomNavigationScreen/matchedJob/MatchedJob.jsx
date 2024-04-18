import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
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
  const { isAuthenticated } = useSelector(state => state.auth);
  const [animate, setAnimate] = useState(true);


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


  const AddProp = () => {
    return (
      <View>
        {
          isAuthenticated ? (
            <AddPref title={"No Matched job Found"} subtitle={"Add your preference to view Matched Job"} btnText={"Add preference"} />
          ) : (
            <AddPref title={"You havenot login yet!"} subtitle={"Login to view Matched Job"} btnText={"Login"} />
          )
        }
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}
      style={GlobalStyleSheet.scrollViewContent}>
      {/* <ActivityIndicator animating={animate} size="large" color="#ffffff" /> */}
      {/* {!!userProfile?.preference ? <MatchedJobView /> : <AddProp />} */}
      <MatchedJobView/>
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
