import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {customTextColor} from '../../constants/Color';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAllGender} from '../../features/formData/FormSlice';

const Account = () => {
  const {userProfile} = useSelector(state => state.userProfile);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.account}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfile', {title: 'Profile'});
            dispatch(getAllGender());
          }}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.accountDetailContainer}>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>
            {userProfile?.profile?.primary_contact || '-'}{' '}
            {userProfile?.profile?.secondary_contact
              ? '/' + userProfile?.profile?.secondary_contact
              : ''}
          </Text>
        </View>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userProfile?.profile?.email || '-'}</Text>
        </View>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>DOB</Text>
          <Text style={styles.value}>{userProfile?.profile?.dob || '-'}</Text>
        </View>
        <View style={styles.detailCard}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>
            {userProfile?.profile?.gender?.name || '-'}
          </Text>
        </View>
      </View>
      {/* Modal */}
    </View>
  );
};
const styles = StyleSheet.create({
  account: {
    width: '110%',
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

export default Account;
