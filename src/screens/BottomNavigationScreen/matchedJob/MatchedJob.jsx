import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalStyleSheet} from '../../../constants/StyleSheet';
import JobCard from '../../../components/JobCard';
import CardSkeleton from '../../../components/skeleton_loader/CardSkeleton';
import {customThemeColor} from '../../../constants/Color';
import {getMatchedJob} from '../../../features/status/StatusSlice';
import {useNavigation} from '@react-navigation/native';
import AddPref from './AddPref';

const MatchedJob = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {userProfile} = useSelector(state => state.userProfile);

  const {matchedJobs} = useSelector(state => state.status);

  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    dispatch(getMatchedJob());
  }, [dispatch]);

  const handleProfile = () => {
    navigation.navigate('PreferenceAdd');
  };

  return (
    <ScrollView
      contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}
      style={GlobalStyleSheet.scrollViewContent}>
      {matchedJobs ? (
        matchedJobs?.data?.map((item, index) => {
          return (
            <View key={index} style={GlobalStyleSheet.cardContainer}>
              <JobCard navigation={navigation} items={item} />
            </View>
          );
        })
      ) : (
        <AddPref
          title={'No Matched job Found'}
          subtitle={'Add your preference to view Matched Job'}
          btnText={'Add preference'}
          handleBtn={handleProfile}
        />
      )}

      {/* <Text>Matched Job</Text> */}
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
