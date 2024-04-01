import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {customTextColor} from '../../constants/Color';

const Education = () => {
  return (
    <View style={styles.education}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Education</Text>
        <Text style={styles.edit}>Edit</Text>
      </View>
      <View style={styles.educationDetailContainer}>
        <View style={[styles.detailCard, styles.borderBottomGray]}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>Education 1</Text>
        </View>
        <View style={[styles.detailCard]}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>Education 2</Text>
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

export default Education;
