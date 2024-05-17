import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBar from '../../../../components/custom_toolbar/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAllPreference} from '../../../../features/profile/PreferenceSlice';
import React, {useEffect, useState} from 'react';
import {customTextColor, customThemeColor} from '../../../../constants/Color';
import {customFontSize, customFonts} from '../../../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CardSkeleton from '../../../../components/skeleton_loader/CardSkeleton';
import PreferenceCard from './PreferenceCard';

const PreferenceList = () => {
  const {allPreference} = useSelector(state => state.preference);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPreference());
  }, [dispatch]);

  console.log('pref', allPreference);

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
  return (
    <View style={styles.container}>
      <AppBar handleBack={handleBack} title="Update Preference" />

      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>Preference</Text>
          <View
            style={{
              marginVertical: 10,
              marginRight: 10,
              paddingRight: 10,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PreferenceAdd')}>
              <Icon name="plus" size={20} color={customTextColor.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: 80, paddingTop: 10}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            padding: 15,
            //maxWidth : 575,
            marginLeft: 'auto',
            marginRight: 'auto',
            //backgroundColor:'red',
            width: '100%',
          }}>
          {!!allPreference ? (
            allPreference?.map((item, index) => {
              return (
                <View key={index}>
                  <PreferenceCard navigation={navigation} items={item} />
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
        </View>
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
