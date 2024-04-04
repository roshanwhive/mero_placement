import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {customTextColor, customThemeColor} from '../../constants/Color';

const Education = () => {
  return (
    <View style={styles.education}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Education</Text>
        <Text style={styles.edit}>Edit</Text>
      </View>
      <View style={styles.educationDetailContainer}>
        <View>
          <View style={[styles.detailCard, styles.borderBottomGray]}>
            <Text style={styles.educationTitle}>Bachelor</Text>
            <Text style={styles.status}>Passed</Text>
          </View>
          <View style={[styles.detailCard, styles.borderBottomGray]}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>Hello</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  education: {
    width: '110%',
    borderRadius: 20,
    marginBottom: 20,
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
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
  },
  borderBottomGray: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  educationTitle: {
    fontSize: 20,
    color: customTextColor.primary,
    fontWeight: '500',
  },
  status: {
    backgroundColor: customThemeColor.darkGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    color: customTextColor.white,
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

export default Education;
