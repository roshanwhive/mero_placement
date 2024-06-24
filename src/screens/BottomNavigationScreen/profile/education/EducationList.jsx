import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import EducationCard from './EducationCard';
import AppBar from '../../../../components/custom_toolbar/AppBar';
import {customTextColor, customThemeColor} from '../../../../constants/Color';
import {customFontSize, customFonts} from '../../../../constants/theme';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProfileAppBar from '../../../../components/custom_toolbar/ProfileAppBar';
import ProfileSkeleton from '../../../../components/skeleton_loader/profileSkeleton';
import NoData from '../NoData';
import {getAllEducation} from '../../../../features/profile/testSlice/EducationSlice';

const EducationList = () => {
  // const {allEducation, isLoading} = useSelector(state => state.getAllEducation);
  const {allEducation, isLoading} = useSelector(state => state.educationTest);

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEducation());
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllEducation());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAdd = () => {
    navigation.navigate('EducationAdd');
  };

  // if (!allEducation) {
  //   return <Text>this is null</Text>; // Or render a loading indicator or placeholder
  // }

  return (
    <View style={styles.container}>
      <ProfileAppBar
        handleBack={handleBack}
        title={'Education'}
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
            {allEducation && allEducation.length > 0 ? (
              allEducation?.map((item, index) => {
                return (
                  <View key={index}>
                    <EducationCard navigation={navigation} items={item} />
                  </View>
                );
              })
            ) : (
              <NoData
                title={'No Education Data'}
                subtitle={'Add your Education details'}
                btnText={'Add Education'}
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
    marginTop: 20,
  },
  subTitle: {
    color: customTextColor.secondary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: 'transparent',
  },
});
export default EducationList;
