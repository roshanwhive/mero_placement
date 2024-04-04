import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {customTextColor} from '../../constants/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Preferences = () => {
  const {userProfile} = useSelector(state => state.auth);
  const navigation = useNavigation();

  return (
    <View style={styles.preference}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Preferences</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.accountDetailContainer}>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Job Category</Text>
          <Text style={styles.value}>
            {userProfile?.preference[0]?.job_category?.name || '-'}
          </Text>
        </View>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Skills</Text>
          <Text style={styles.value}>
            {userProfile?.preference[0]?.get_skill?.skill || '-'}
          </Text>
        </View>
        <View style={[styles.detailCard]}>
          <Text style={styles.label}>Job Title</Text>
          <Text style={styles.value}>
            {userProfile?.preference[0]?.title_name || '-'}
          </Text>
        </View>
        <View style={[styles.detailCard]}>
          <Text style={styles.label}>Availablity</Text>
          <Text style={styles.value}>
            {userProfile?.preference[0]?.availible_type?.employment_type || '-'}
          </Text>
        </View>
        <View style={[styles.detailCard]}>
          <Text style={styles.label}>Level</Text>
          <Text style={styles.value}>
            {userProfile?.preference[0]?.level?.name || '-'}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  preference: {
    width: '110%',
    marginVertical: 20,
    borderRadius: 20,
    // backgroundColor: '#f6f7fb',
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
