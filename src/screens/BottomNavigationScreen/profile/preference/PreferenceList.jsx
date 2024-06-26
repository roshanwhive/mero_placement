import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {customTextColor, customThemeColor} from '../../../../constants/Color';
import {customFontSize, customFonts} from '../../../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CardSkeleton from '../../../../components/skeleton_loader/CardSkeleton';
import PreferenceCard from './PreferenceCard';
import {getAllPreference} from '../../../../features/profile/preferenceSlice/getAllPreferenceSlice';
import ProfileAppBar from '../../../../components/custom_toolbar/ProfileAppBar';
import ProfileSkeleton from '../../../../components/skeleton_loader/profileSkeleton';
import NoData from '../NoData';

const PreferenceList = () => {
  const {allPreference, isLoading} = useSelector(state => state.preferenceTest);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPreference());
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllPreference());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };
  const handleAdd = () => {
    navigation.navigate('PreferenceAdd');
  };
  return (
    <View style={styles.container}>
      <ProfileAppBar
        handleBack={handleBack}
        title={'Preference'}
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
              padding: 15,
              //maxWidth : 575,
              marginLeft: 'auto',
              marginRight: 'auto',
              //backgroundColor:'red',
              width: '100%',
            }}>
            {allPreference && allPreference.length > 0 ? (
              allPreference?.map((item, index) => {
                return (
                  <View key={index}>
                    <PreferenceCard navigation={navigation} items={item} />
                  </View>
                );
              })
            ) : (
              <NoData
                title={'No Preference Data'}
                subtitle={'Add your Preference '}
                btnText={'Add Preference'}
                handleBtn={handleAdd}
              />
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
    marginTop: 10,
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

export default PreferenceList;
