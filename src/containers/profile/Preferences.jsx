import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Preferences = () => {
  const {userProfile} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const defaultPreferences = userProfile?.preference?.filter(
    preference => preference?.is_default === 1,
  );

  const mappedPreferences = defaultPreferences?.map(preference => ({
    id: preference?.id,
    skill: preference?.get_skill?.skill,
    jobCategory: preference?.job_category?.name,
    jobLevel: preference?.level?.name,
    expectedSalary: preference?.expected_salary,
    location: preference?.location?.district_name,
    title: preference?.title_name,
    employmentType: preference?.availible_type?.employment_type,
  }));

  return (
    <View style={styles.preference}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Preference</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditProfile', {title: 'Preference'})
          }>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      {mappedPreferences?.map((items, index) => {
        return (
          <View key={index} style={styles.accountDetailContainer}>
            <View style={[styles.detailCard, styles.borderBottomGray]}>
              <Text style={styles.label}>Job Category</Text>
              <Text style={styles.value}>{items?.jobCategory || '-'}</Text>
            </View>
            <View style={[styles.detailCard, styles.borderBottomGray]}>
              <Text style={styles.label}>Skills</Text>
              <Text style={styles.value}>{items?.skill || '-'}</Text>
            </View>
            <View style={[styles.detailCard, styles.borderBottomGray]}>
              <Text style={styles.label}>Job Title</Text>
              <Text style={styles.value}>{items?.title}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.label}>Availability</Text>
              <Text style={styles.value}>{items?.employmentType}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.label}>Level</Text>
              <Text style={styles.value}>{items?.jobLevel}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.label}>Loaction</Text>
              <Text style={styles.value}>{items?.location}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  preference: {
    width: '110%',
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: customTextColor.primary,
  },
  edit: {
    color: '#2b8256',
    fontWeight: '500',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  detailCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    flexWrap: 'wrap',
  },
  borderBottomGray: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 15,
    color: '#6e6e6e',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
export default Preferences;
