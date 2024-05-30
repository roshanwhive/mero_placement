import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {customTextColor, customThemeColor} from '../constants/Color';
import TrainingCard from '../components/TrainingCard';
import {GlobalStyleSheet} from '../constants/StyleSheet';
import {customFontSize} from '../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAllTrainings} from '../features/training/getAllTrainingSlice';
import CardSkeleton from '../components/skeleton_loader/CardSkeleton';

const TrainingList = () => {
  const {allTrainings, isLoading} = useSelector(state => state.getAllTraining);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTrainings());
  }, [dispatch]);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(!refreshing);
  //   // dispatch(getAllTrainings());
  //   // setTimeout(() => {
  //   //   setRefreshing(false);
  //   // }, 2000);
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={GlobalStyleSheet.Hometitle}>Available Courses</Text>
      <ScrollView
        horizontal={true}
        indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {!!allTrainings?.data ? (
          allTrainings?.data?.map((item, index) => {
            return (
              <View key={index} style={GlobalStyleSheet.cardContainer}>
                <TrainingCard navigation={navigation} items={item} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: customThemeColor.primary,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: customFontSize.font14,
    fontWeight: 'bold',
    color: customTextColor.darkGreen,
  },
  scrollView: {
    marginVertical: 10,
  },
});

export default TrainingList;
