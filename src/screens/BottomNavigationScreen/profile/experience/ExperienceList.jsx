import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

import {customTextColor, customThemeColor} from '../../../../constants/Color';
import {customFontSize, customFonts} from '../../../../constants/theme';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CardSkeleton from '../../../../components/skeleton_loader/CardSkeleton';
import ExperienceCard from './ExperienceCard';
import {getAllExperience} from '../../../../features/profile/experienceSlice/getAllExperienceSlice';
import ProfileAppBar from '../../../../components/custom_toolbar/ProfileAppBar';
import ProfileSkeleton from '../../../../components/skeleton_loader/profileSkeleton';
import NoData from '../NoData';

const ExperienceList = () => {
  const {allExperience, isLoading} = useSelector(
    state => state.getAllExperience,
  );
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExperience());
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllExperience());
    console.log('first', allExperience);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };
  const handleAdd = () => {
    navigation.navigate('ExperienceAdd');
  };
  return (
    <View style={styles.container}>
      <ProfileAppBar
        handleBack={handleBack}
        title={'Experience'}
        handleAddBtn={handleAdd}
      />

      <ScrollView
        contentContainerStyle={{paddingBottom: 80, paddingTop: 5}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoading ? (
          Array.from({length: 5}).map((_, index) => (
            <ProfileSkeleton key={index} />
          ))
        ) : (
          <View
            style={{
              padding: 10,
              //maxWidth : 575,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
            }}>
            {allExperience && allExperience.length > 0 ? (
              allExperience?.map((item, index) => {
                return (
                  <View key={index}>
                    <ExperienceCard navigation={navigation} items={item} />
                  </View>
                );
              })
            ) : (
              <View>
                <NoData
                  title={'No Experience Data'}
                  subtitle={'Add your Experience '}
                  btnText={'Add Experience'}
                  handleBtn={handleAdd}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  title: {
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font22,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    color: customTextColor.secondary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font12,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default ExperienceList;
