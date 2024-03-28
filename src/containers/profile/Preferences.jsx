import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {customTextColor} from '../../constants/Color';

const Preferences = () => {
  return (
    <View style={styles.preference}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Preferences</Text>
        <Text style={styles.edit}>Edit</Text>
      </View>
      <View style={styles.accountDetailContainer}>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Job Category</Text>
          <Text style={styles.value}>Category 1</Text>
        </View>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Job Level</Text>
          <Text style={styles.value}>Level 1</Text>
        </View>
        <View style={[styles.detailCard]}>
          <Text style={styles.label}>Skills</Text>
          <Text style={styles.value}>5 skills</Text>
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
